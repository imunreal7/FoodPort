import faiss
import numpy as np

# Set embedding dimension, e.g., 128
d = 128
# Create dummy data: 10 random vectors
dummy_data = np.random.rand(10, d).astype('float32')
# Create a FAISS index
index = faiss.IndexFlatL2(d)
index.add(dummy_data)
# Save the index to disk
faiss.write_index(index, "faiss_index.bin")
print("Dummy FAISS index created and saved.")
