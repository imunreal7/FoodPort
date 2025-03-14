import React, { useState, useEffect } from "react";
import toast from "react-hot-toast";

const Profile = () => {
    const [user, setUser] = useState(null);
    const [editMode, setEditMode] = useState(false);
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
    });

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
                    setFormData({
                        name: data.name || "",
                        email: data.email || "",
                        phone: data.phone || "",
                    });
                })
                .catch((err) => console.error("Error fetching user data:", err));
        }
    }, []);

    const handleInputChange = (e) => {
        setFormData((prev) => ({
            ...prev,
            [e.target.name]: e.target.value,
        }));
    };

    const handleUpdate = () => {
        // Basic validation
        if (!formData.name || !formData.email || !formData.phone) {
            toast.error("Please fill in all required fields.");
            return;
        }
        const token = localStorage.getItem("token");
        // Update user data (using user's _id in URL)
        fetch(`http://localhost:5000/api/auth/update/${user._id}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
                Authorization: token ? `Bearer ${token}` : "",
            },
            body: JSON.stringify(formData),
        })
            .then((res) => {
                if (!res.ok) {
                    throw new Error("Failed to update profile");
                }
                return res.json();
            })
            .then((data) => {
                setUser(data);
                setEditMode(false);
                toast.success("Profile updated successfully!");
            })
            .catch((err) => {
                toast.error(err.message);
            });
    };

    if (!user) {
        return (
            <div className="max-w-7xl mx-auto p-8">
                <h1 className="text-3xl font-bold mb-4">Profile</h1>
                <p>Loading user profile...</p>
            </div>
        );
    }

    return (
        <div className="max-w-7xl mx-auto p-8">
            <h1 className="text-3xl font-bold mb-6">Profile</h1>
            <div className="bg-white p-6 rounded-md shadow-md">
                {!editMode ? (
                    <>
                        <div className="mb-4">
                            <p className="text-lg">
                                <span className="font-semibold">Name:</span> {user.name}
                            </p>
                            <p className="text-lg">
                                <span className="font-semibold">Email:</span> {user.email}
                            </p>
                            {user.phone && (
                                <p className="text-lg">
                                    <span className="font-semibold">Phone:</span> {user.phone}
                                </p>
                            )}
                        </div>
                        <button
                            onClick={() => setEditMode(true)}
                            className="px-4 py-2 bg-teal-600 text-white rounded-md hover:bg-teal-700 transition-colors"
                        >
                            Edit Profile
                        </button>
                    </>
                ) : (
                    <>
                        <div className="mb-4">
                            <label className="block text-gray-700 font-medium mb-1">Name</label>
                            <input
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleInputChange}
                                className="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-teal-500"
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700 font-medium mb-1">Email</label>
                            <input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleInputChange}
                                className="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-teal-500"
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700 font-medium mb-1">Phone</label>
                            <input
                                type="tel"
                                name="phone"
                                value={formData.phone}
                                onChange={handleInputChange}
                                className="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-teal-500"
                            />
                        </div>
                        <div className="flex space-x-4">
                            <button
                                onClick={handleUpdate}
                                className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors"
                            >
                                Save
                            </button>
                            <button
                                onClick={() => setEditMode(false)}
                                className="px-4 py-2 bg-gray-300 text-gray-800 rounded-md hover:bg-gray-400 transition-colors"
                            >
                                Cancel
                            </button>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
};

export default Profile;
