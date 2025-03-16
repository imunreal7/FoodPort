from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from typing import List, Optional
import faiss
import numpy as np
import uvicorn
import os
import json
import tensorflow as tf

app = FastAPI(title="AI Recommendation Service")

# Define request and response models
class RecommendationRequest(BaseModel):
    user_id: str
    dietary_preferences: Optional[str] = None  # "veg", "non-veg", "vegan"
    preferred_cuisine: Optional[str] = None

class Product(BaseModel):
    _id: str
    name: str
    description: Optional[str]
    image: Optional[str]
    price: float
    cuisine: str
    dietaryType: str
    category: Optional[str]

class RecommendationResponse(BaseModel):
    recommendations: List[Product]

# --- Load your pre-trained model and FAISS index ---
MODEL_PATH = "models/product_embedding_model.h5"
INDEX_PATH = "faiss_index.bin"
PRODUCT_METADATA_PATH = "data/product_metadata.json"

try:
    model = tf.keras.models.load_model(MODEL_PATH)
except Exception as e:
    model = None
    print("Model load error:", e)

if os.path.exists(INDEX_PATH):
    index = faiss.read_index(INDEX_PATH)
else:
    index = None

if os.path.exists(PRODUCT_METADATA_PATH):
    with open(PRODUCT_METADATA_PATH, "r") as f:
        product_metadata = json.load(f)
else:
    product_metadata = []

def get_recommendations_for_user(req: RecommendationRequest, k: int = 3):
    # For demo: generate a random query embedding.
    query_embedding = np.random.rand(1, index.d).astype("float32")
    # Retrieve more candidates than needed for filtering.
    distances, indices = index.search(query_embedding, k * 2)

    recommendations = []
    seen = set()  # To track product IDs already added

    # First pass: Strict filtering based on dietary preferences and preferred cuisine.
    for idx in indices[0]:
        if idx < len(product_metadata):
            prod = product_metadata[idx]
            prod_id = prod.get("_id")
            # Ensure _id is a string
            if prod_id is not None and not isinstance(prod_id, str):
                prod["_id"] = str(prod_id)
                prod_id = prod["_id"]
            if prod_id in seen:
                continue  # Skip duplicates
            # Apply filters (case-insensitive)
            if req.dietary_preferences and prod.get("dietaryType", "").lower() != req.dietary_preferences.lower():
                continue
            if req.preferred_cuisine and prod.get("cuisine", "").lower() != req.preferred_cuisine.lower():
                continue
            seen.add(prod_id)
            recommendations.append(prod)
            if len(recommendations) >= k:
                break

    # Second pass: If fewer than 3 recommendations, add additional unique products ignoring filters.
    if len(recommendations) < 3:
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
                if len(recommendations) >= 3:
                    break

    # Return at most k recommendations.
    return recommendations[:k]



@app.post("/recommendations", response_model=RecommendationResponse)
async def recommendations_endpoint(req: RecommendationRequest):
    if index is None or not product_metadata:
        raise HTTPException(status_code=500, detail="Recommendation engine not ready")
    recs = get_recommendations_for_user(req, k=3)
    return {"recommendations": recs}

if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000)
