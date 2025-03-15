import tensorflow as tf
from tensorflow.keras import layers, models

# Create a simple model that takes an input of shape (100,) and outputs a 128-d vector.
input_layer = layers.Input(shape=(100,))
output_layer = layers.Dense(128)(input_layer)
dummy_model = models.Model(inputs=input_layer, outputs=output_layer)
dummy_model.save("models/product_embedding_model.h5")
print("Dummy model saved.")
