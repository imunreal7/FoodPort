import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./css/custom.css";

const apiUrl = process.env.REACT_APP_API_URL || "http://localhost:5000";

const Signup = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        password: "",
    });
    const [errors, setErrors] = useState({});
    const [serverError, setServerError] = useState("");

    // Update state on input change
    const handleChange = (e) => {
        setFormData((prev) => ({
            ...prev,
            [e.target.name]: e.target.value,
        }));
    };

    // Client-side validation for sign-up
    const validate = () => {
        let validationErrors = {};
        if (!formData.name) {
            validationErrors.name = "Name is required";
        }
        if (!formData.email) {
            validationErrors.email = "Email is required";
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            validationErrors.email = "Enter a valid email address";
        }
        if (!formData.phone) {
            validationErrors.phone = "Phone number is required";
        } else if (!/^\d{10}$/.test(formData.phone)) {
            validationErrors.phone = "Phone number must be 10 digits";
        }
        if (!formData.password) {
            validationErrors.password = "Password is required";
        } else if (formData.password.length < 6) {
            validationErrors.password = "Password must be at least 6 characters";
        }
        setErrors(validationErrors);
        return Object.keys(validationErrors).length === 0;
    };

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        setServerError("");
        if (!validate()) return;
        try {
            const response = await fetch(`${apiUrl}/api/auth/register`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            });
            const data = await response.json();
            if (!response.ok) {
                throw new Error(data.msg || "Something went wrong");
            }
            localStorage.setItem("token", data.token);
            navigate("/");
        } catch (error) {
            console.error("Registration error:", error);
            setServerError(error.message);
        }
    };

    return (
        <div
            className="min-h-screen flex items-center justify-center bg-cover bg-center bg-no-repeat py-12 px-4 shadow lg:shadow-lg border border-gray-200 sm:px-6 lg:px-8"
            style={{ backgroundImage: `url("/FoodPort-Background2.jpg")` }}
        >
            <div className="card w-full max-w-md p-8 bg-white/90 rounded-md">
                <h1 className="text-center text-4xl font-extrabold text-gray-800 mb-6">Sign Up</h1>
                {serverError && <p className="text-red-600 text-center my-2">{serverError}</p>}
                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                    <div className="flex flex-col">
                        <label htmlFor="name" className="mb-2 text-gray-700">
                            Name
                        </label>
                        <input
                            className={`p-3 border rounded ${
                                errors.name ? "border-red-500" : "border-gray-300"
                            }`}
                            type="text"
                            name="name"
                            placeholder="Enter name"
                            required
                            value={formData.name}
                            onChange={handleChange}
                        />
                        {errors.name && <p className="text-red-600 text-sm mt-1">{errors.name}</p>}
                    </div>
                    <div className="flex flex-col">
                        <label htmlFor="email" className="mb-2 text-gray-700">
                            Email
                        </label>
                        <input
                            className={`p-3 border rounded ${
                                errors.email ? "border-red-500" : "border-gray-300"
                            }`}
                            type="email"
                            name="email"
                            placeholder="Enter email"
                            required
                            value={formData.email}
                            onChange={handleChange}
                        />
                        {errors.email && (
                            <p className="text-red-600 text-sm mt-1">{errors.email}</p>
                        )}
                    </div>
                    <div className="flex flex-col">
                        <label htmlFor="phone" className="mb-2 text-gray-700">
                            Phone
                        </label>
                        <input
                            className={`p-3 border rounded ${
                                errors.phone ? "border-red-500" : "border-gray-300"
                            }`}
                            type="text"
                            name="phone"
                            placeholder="Enter phone"
                            required
                            value={formData.phone}
                            onChange={handleChange}
                        />
                        {errors.phone && (
                            <p className="text-red-600 text-sm mt-1">{errors.phone}</p>
                        )}
                    </div>
                    <div className="flex flex-col">
                        <label htmlFor="password" className="mb-2 text-gray-700">
                            Password
                        </label>
                        <input
                            className={`p-3 border rounded ${
                                errors.password ? "border-red-500" : "border-gray-300"
                            }`}
                            type="password"
                            name="password"
                            placeholder="Enter password"
                            required
                            value={formData.password}
                            onChange={handleChange}
                        />
                        {errors.password && (
                            <p className="text-red-600 text-sm mt-1">{errors.password}</p>
                        )}
                    </div>
                    <button
                        type="submit"
                        className="py-3 px-8 bg-lime-600 text-white font-semibold rounded hover:bg-lime-700 transition-colors duration-200"
                    >
                        Sign Up
                    </button>
                </form>
                <p className="pt-8 text-center">
                    Already have an account?{" "}
                    <Link className="text-lime-600 font-medium" to="/sign-in">
                        Log In
                    </Link>
                </p>
            </div>
        </div>
    );
};

export default Signup;

