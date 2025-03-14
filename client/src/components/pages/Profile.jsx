import React, { useState, useEffect } from "react";

const Profile = () => {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (token) {
            fetch("http://localhost:5000/api/auth/me", {
                headers: {
                    Authorization: `${token}`,
                },
            })
                .then((res) => res.json())
                .then((data) => {
                    setUser(data); // data should be { _id, name, email, phone, ... }
                })
                .catch((err) => console.error("Error fetching user data:", err));
        }
    }, []);

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
            <h1 className="text-3xl font-bold mb-4">Profile</h1>
            <div className="bg-gray-100 p-4 rounded shadow">
                <p>
                    <strong>Name:</strong> {user.name}
                </p>
                <p>
                    <strong>Email:</strong> {user.email}
                </p>
                {user.phone && (
                    <p>
                        <strong>Phone:</strong> {user.phone}
                    </p>
                )}
            </div>
        </div>
    );
};

export default Profile;
