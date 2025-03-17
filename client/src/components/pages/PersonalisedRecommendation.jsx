import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { addToCart, addProduct, getProduct } from "../../redux/slices/cartSlice";
import toast from "react-hot-toast";

const apiUrl = process.env.REACT_APP_API_URL || "http://localhost:5000";

const PersonalisedRecommendation = () => {
    const [recommendations, setRecommendations] = useState([]);
    const [user, setUser] = useState(null);
    const [loadingRecommendations, setLoadingRecommendations] = useState(false);
    const dispatch = useDispatch();
    const token = localStorage.getItem("token");

    // Fetch user details
    useEffect(() => {
        if (token) {
            fetch(`${apiUrl}/api/auth/me`, {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
            })
                .then((res) => res.json())
                .then((data) => setUser(data))
                .catch((err) => console.error("Error fetching user data:", err));
        }
    }, [token]);

    // Fetch personalized recommendations once user info is available
    useEffect(() => {
        const fetchRecommendations = async () => {
            setLoadingRecommendations(true);
            try {
                const res = await fetch(`${apiUrl}/api/recommendations`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
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
            } finally {
                setLoadingRecommendations(false);
            }
        };
        if (user) {
            fetchRecommendations();
        }
    }, [user, token]);

    // Add product to cart (creates product if not found)
    const handleAddToCart = async (product) => {
        try {
            // Try to find the product by name
            const foundProducts = await dispatch(getProduct(product.name)).unwrap();

            let productId;
            if (foundProducts && foundProducts.length > 0) {
                productId = foundProducts[0]._id;
            } else {
                const createdProduct = await dispatch(addProduct(product)).unwrap();
                productId = createdProduct[0]._id;
            }

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
                style: { backgroundColor: "#7BFFC2", color: "green", fontWeight: 600 },
            });
        } catch (error) {
            toast.error(error.message);
        }
    };

    // Reload page to get fresh recommendations
    const handleReload = () => {
        window.location.reload();
    };

    return (
        <div className="bg-gradient-to-br from-gray-100 to-gray-200 py-8 px-4">
            <div className="max-w-7xl mx-auto space-y-6">
                {/* Header + Reload Button */}
                <div className="flex items-center justify-between">
                    <h1 className="text-3xl font-extrabold text-lime-700">
                        Your AI Personalised Recommendations
                    </h1>
                    <button
                        onClick={handleReload}
                        className="py-2 px-4 bg-lime-600 text-white rounded-md shadow hover:bg-lime-700 transition-colors"
                    >
                        Try Something Else
                    </button>
                </div>

                {/* Recommendation List */}
                {loadingRecommendations ? (
                    <p className="text-center text-gray-500">Loading recommendations...</p>
                ) : recommendations.length === 0 ? (
                    <p className="text-center text-gray-500">
                        No recommendations available at the moment.
                    </p>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                        {recommendations.map((product) => (
                            <div
                                key={product._id}
                                className="border border-lime-200 p-4 rounded-lg shadow hover:shadow-xl transition-shadow duration-300 bg-white"
                            >
                                <img
                                    src={product.image}
                                    alt={product.name}
                                    className="w-full h-48 object-cover rounded-md mb-4"
                                />
                                <h2 className="text-xl font-semibold text-gray-800">
                                    {product.name}
                                </h2>
                                <p className="text-gray-600 mt-1">{product.description}</p>
                                <p className="mt-2 font-bold text-gray-800">₹{product.price}</p>
                                <p className="text-sm text-gray-500">
                                    {product.cuisine} | {product.dietaryType} | {product.category}
                                </p>
                                <button
                                    onClick={() => handleAddToCart(product)}
                                    className="mt-4 w-full py-2 px-4 border border-lime-600 text-lime-600 hover:bg-lime-600 hover:text-white rounded-md transition-colors duration-300 font-semibold"
                                >
                                    Add to cart
                                </button>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default PersonalisedRecommendation;
