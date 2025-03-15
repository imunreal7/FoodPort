import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { addToCart, addProduct, getProduct } from "../../redux/slices/cartSlice";
import toast from "react-hot-toast";

const PersonalisedRecommendation = () => {
    const [recommendations, setRecommendations] = useState([]);
    const [user, setUser] = useState(null);
    const dispatch = useDispatch();
    const token = localStorage.getItem("token");

    useEffect(() => {
        // Fetch user details
        if (token) {
            fetch("http://localhost:5000/api/auth/me", {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: token ? `Bearer ${token}` : "",
                },
            })
                .then((res) => res.json())
                .then((data) => {
                    setUser(data);
                })
                .catch((err) => console.error("Error fetching user data:", err));
        }
    }, [token]);

    useEffect(() => {
        const fetchRecommendations = async () => {
            try {
                const res = await fetch("http://localhost:5000/api/recommendations", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: token ? `Bearer ${token}` : "",
                    },
                    body: JSON.stringify({
                        user_id: user._id,
                        dietary_preferences: user.dietaryPreferences,
                        preferred_cuisine: user.preferredCuisine,
                    }),
                });
                if (!res.ok) throw new Error("Failed to fetch recommendations");
                const data = await res.json();
                setRecommendations(data.recommendations);
            } catch (err) {
                toast.error(err.message);
            }
        };
        if (user) {
            fetchRecommendations();
        }
    }, [user, token]);

    const handleAddToCart = async (product) => {
        try {
            // Attempt to find the product by name
            const foundProducts = await dispatch(getProduct(product.name)).unwrap();

            let productId;
            if (foundProducts && foundProducts.length > 0) {
                // Product exists: use the first matching product's _id
                productId = foundProducts[0]._id;
            } else {
                // Product not found: create it in the database
                const createdProduct = await dispatch(addProduct(product)).unwrap();
                productId = createdProduct[0]._id;
            }

            // Now add the product to the cart using the determined productId
            await dispatch(
                addToCart({
                    product: productId,
                    quantity: 1,
                    price: product.price,
                }),
            ).unwrap();

            toast.success(`${product.name} added to cart`, {
                duration: 2000,
                position: "top-center",
                style: {
                    backgroundColor: "#7BFFC2",
                    color: "green",
                    fontWeight: 600,
                },
            });
        } catch (error) {
            toast.error(error.message);
        }
    };

    return (
        <div className="max-w-7xl mx-auto p-8">
            <h1 className="text-3xl font-bold mb-4">Your AI Personalised Recommendations</h1>
            {recommendations.length === 0 ? (
                <p className="text-center text-gray-500">
                    No recommendations available at the moment.
                </p>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                    {recommendations.map((product) => (
                        <div
                            key={product._id}
                            className="border p-4 rounded-md shadow hover:shadow-lg transition-shadow duration-200"
                        >
                            <img
                                src={product.image}
                                alt={product.name}
                                className="w-full h-48 object-cover rounded-md mb-4"
                            />
                            <h2 className="text-xl font-semibold">{product.name}</h2>
                            <p className="text-gray-600">{product.description}</p>
                            <p className="mt-2 font-bold">₹{product.price}</p>
                            <p className="text-sm text-gray-500">
                                {product.cuisine} | {product.dietaryType} | {product.category}
                            </p>
                            <button
                                onClick={() => handleAddToCart(product)}
                                className="mt-4 w-full py-2 px-4 border border-lime-600 text-lime-600 hover:bg-lime-600 hover:text-white rounded-md transition duration-300"
                            >
                                Add to cart
                            </button>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default PersonalisedRecommendation;
