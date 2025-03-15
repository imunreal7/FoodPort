// PersonalisedRecommendation.js
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";

const PersonalisedRecommendation = () => {
    const [recommendations, setRecommendations] = useState([]);
    const [user, setUser] = useState(null);

    // Assume you have user details stored in localStorage or a global state
    const token = localStorage.getItem("token");
    console.log("User1:", user, "Token1:", token);

    useEffect(() => {
        const token = localStorage.getItem("token");
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
    }, []);

    useEffect(() => {
        console.log("User:", user, "Token:", token);

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
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default PersonalisedRecommendation;
