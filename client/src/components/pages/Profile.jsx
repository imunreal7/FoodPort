import React, { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { FaUserCircle } from "react-icons/fa";

const avatarOptions = [
    "https://clipart-library.com/new_gallery/175-1758372_ideas-hamburger-food-transparent-png-image-amp-drawing.png",
    "https://img.freepik.com/premium-psd/fun-food-kids-cute-smiling-cartoon-face-sand-transparent-background_1046662-54348.jpg",
    "https://img.freepik.com/premium-psd/cartoon-face-made-food-with-smiley-face-it_1305733-11227.jpg",
    "https://img.freepik.com/premium-photo/cartoon-wrap-character-with-smiling-face-wearing-sneakers-holding-baseball-bat_1187944-2755.jpg",
    "https://png.pngtree.com/png-clipart/20240504/original/pngtree-vector-illustration-of-cute-pizza-emoji-png-image_15005236.png",
];

const Profile = () => {
    const [user, setUser] = useState(null);
    const [editMode, setEditMode] = useState(false);
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        avatar: "", // Added avatar field
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
                        avatar: data.avatar || "", // populate avatar if it exists
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

    const handleAvatarSelect = (url) => {
        setFormData((prev) => ({ ...prev, avatar: url }));
    };

    const handleUpdate = () => {
        // Basic validation
        if (!formData.name || !formData.email || !formData.phone) {
            toast.error("Please fill in all required fields.");
            return;
        }
        // Optionally, ensure an avatar is selected (if required)
        if (!formData.avatar) {
            toast.error("Please select an avatar.");
            return;
        }
        const token = localStorage.getItem("token");
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
            <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-lime-50 via-lime-100 to-lime-50">
                <div className="text-center">
                    <h1 className="text-4xl font-extrabold text-lime-700 mb-2">Profile</h1>
                    <p className="text-gray-600">Loading user profile...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen to-green-100 bg-gradient-to-br from-lime-50 via-lime-100 to-lime-50    flex items-center justify-center">
            <div className="max-w-3xl w-full bg-white/80 backdrop-blur-md rounded-lg shadow-xl p-8">
                {/* Avatar + Heading */}
                <div className="flex flex-col items-center mb-8">
                    {/* Show the selected avatar if available, otherwise a default icon */}
                    <div className="rounded-full border-4 border-lime-500 p-1 mb-4">
                        {formData.avatar ? (
                            <img
                                src={formData.avatar}
                                alt="Selected Avatar"
                                className="w-20 h-20 rounded-full object-cover"
                            />
                        ) : (
                            <FaUserCircle className="text-lime-500" size={80} />
                        )}
                    </div>
                    <h1 className="text-4xl font-extrabold text-lime-700 mb-2">My Profile</h1>
                    <p className="text-gray-600 text-sm">Manage your personal information</p>
                </div>

                {/* Profile Details / Edit Form */}
                {!editMode ? (
                    <div className="text-center sm:text-left">
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
                        <div className="flex justify-center sm:justify-start">
                            <button
                                onClick={() => setEditMode(true)}
                                className="px-5 py-2 bg-lime-600 text-white font-semibold rounded-md hover:bg-lime-700 transition-colors duration-300"
                            >
                                Edit Profile
                            </button>
                        </div>
                    </div>
                ) : (
                    <div>
                        <div className="mb-4">
                            <label className="block text-gray-700 font-medium mb-1">Name</label>
                            <input
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleInputChange}
                                className="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-lime-400"
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700 font-medium mb-1">Email</label>
                            <input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleInputChange}
                                className="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-lime-400"
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700 font-medium mb-1">Phone</label>
                            <input
                                type="tel"
                                name="phone"
                                value={formData.phone}
                                onChange={handleInputChange}
                                className="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-lime-400"
                            />
                        </div>

                        {/* Food-Themed Avatar Selection */}
                        <div className="mb-4">
                            <p className="block text-gray-700 font-medium mb-1">Select an Avatar</p>
                            <div className="flex flex-wrap gap-4">
                                {avatarOptions.map((url, index) => (
                                    <div
                                        key={index}
                                        onClick={() => handleAvatarSelect(url)}
                                        className={`cursor-pointer p-1 rounded-full border-2 ${
                                            formData.avatar === url
                                                ? "border-lime-600"
                                                : "border-transparent"
                                        } transition-all`}
                                    >
                                        <img
                                            src={url}
                                            alt={`Avatar ${index + 1}`}
                                            className="w-16 h-16 rounded-full object-cover"
                                        />
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="flex space-x-4">
                            <button
                                onClick={handleUpdate}
                                className="px-5 py-2 bg-lime-600 text-white font-semibold rounded-md hover:bg-lime-700 transition-colors duration-300"
                            >
                                Save
                            </button>
                            <button
                                onClick={() => setEditMode(false)}
                                className="px-5 py-2 bg-gray-300 text-gray-800 rounded-md hover:bg-gray-400 transition-colors duration-300"
                            >
                                Cancel
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Profile;
