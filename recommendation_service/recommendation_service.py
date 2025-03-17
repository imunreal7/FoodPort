import logging
from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from typing import List, Optional
import faiss
import numpy as np
import uvicorn
import os
import json
import tensorflow as tf

# Set up logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger("recommendation_service")

app = FastAPI(title="AI Recommendation Service")

# --- Request & Response Models ---
class RecommendationRequest(BaseModel):
    user_id: str
    dietary_preferences: Optional[str] = None  # e.g., "veg", "non-veg", "vegan"
    preferred_cuisine: Optional[str] = None

class Product(BaseModel):
    _id: str
    name: str
    description: Optional[str] = None
    image: Optional[str] = None
    price: float
    cuisine: str
    dietaryType: str
    category: Optional[str] = None

class RecommendationResponse(BaseModel):
    recommendations: List[Product]

# --- Load Pre-trained Model, FAISS Index & Metadata ---
MODEL_PATH = os.environ.get("MODEL_PATH", "models/product_embedding_model.h5")
INDEX_PATH = os.environ.get("INDEX_PATH", "faiss_index.bin")
PRODUCT_METADATA_PATH = os.environ.get("PRODUCT_METADATA_PATH", "data/product_metadata.json")

try:
    model = tf.keras.models.load_model(MODEL_PATH)
    logger.info("Model loaded successfully from %s", MODEL_PATH)
except Exception as e:
    model = None
    logger.error("Model load error: %s", e)

if os.path.exists(INDEX_PATH):
    try:
        index = faiss.read_index(INDEX_PATH)
        logger.info("FAISS index loaded successfully from %s", INDEX_PATH)
    except Exception as e:
        logger.error("Error loading FAISS index: %s", e)
        index = None
else:
    logger.error("FAISS index file not found at %s", INDEX_PATH)
    index = None

if os.path.exists(PRODUCT_METADATA_PATH):
    try:
        with open(PRODUCT_METADATA_PATH, "r") as f:
            product_metadata = json.load(f)
        logger.info("Product metadata loaded from %s", PRODUCT_METADATA_PATH)
    except Exception as e:
        logger.error("Error loading product metadata: %s", e)
        product_metadata = []
else:
    logger.error("Product metadata file not found at %s", PRODUCT_METADATA_PATH)
    product_metadata = []

# --- Recommendation Logic ---
def get_recommendations_for_user(req: RecommendationRequest, k: int = 3):
    # For demo: generate a random query embedding.
    # In production, replace this with a proper embedding from the model.
    if index is None:
        raise ValueError("FAISS index is not available.")
    try:
        query_embedding = np.random.rand(1, index.d).astype("float32")
        distances, indices = index.search(query_embedding, k * 2)
    except Exception as e:
        logger.error("Error during index search: %s", e)
        raise

    recommendations = []
    seen = set()

    # First pass: Apply strict filters based on dietary preferences and preferred cuisine.
    for idx in indices[0]:
        if idx < len(product_metadata):
            prod = product_metadata[idx]
            prod_id = prod.get("_id")
            if prod_id is not None and not isinstance(prod_id, str):
                prod["_id"] = str(prod_id)
                prod_id = prod["_id"]
            if prod_id in seen:
                continue
            if req.dietary_preferences and prod.get("dietaryType", "").lower() != req.dietary_preferences.lower():
                continue
            if req.preferred_cuisine and prod.get("cuisine", "").lower() != req.preferred_cuisine.lower():
                continue
            seen.add(prod_id)
            recommendations.append(prod)
            if len(recommendations) >= k:
                break

    # Second pass: If fewer than k recommendations, add more unique products without filters.
    if len(recommendations) < k:
        for idx in indices[0]:
            if idx < len(product_metadata):
                prod = product_metadata[idx]
                prod_id = prod.get("_id")
                if prod_id is not None and not isinstance(prod_id, str):
                    prod["_id"] = str(prod_id)
                    prod_id = prod["_id"]
                if prod_id in seen:
                    continue
                seen.add(prod_id)
                recommendations.append(prod)
                if len(recommendations) >= k:
                    break

    return recommendations[:k]

# --- Endpoint ---
@app.post("/recommendations", response_model=RecommendationResponse)
async def recommendations_endpoint(req: RecommendationRequest):
    if index is None or not product_metadata:
        logger.error("Recommendation engine not ready: index or product metadata missing.")
        raise HTTPException(status_code=500, detail="Recommendation engine not ready")
    try:
        recs = get_recommendations_for_user(req, k=3)
    except Exception as e:
        logger.error("Error generating recommendations: %s", e)
        raise HTTPException(status_code=500, detail="Error generating recommendations")
    return {"recommendations": recs}

if __name__ == "__main__":
    # For production, consider using multiple workers and running behind a reverse proxy.
    uvicorn.run(app, host="0.0.0.0", port=8000)
