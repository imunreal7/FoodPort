import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./css/custom.css";

const apiUrl = process.env.REACT_APP_API_URL || "http://localhost:5000";

const Signin = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        email: "",
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

    // Client-side validation for sign-in
    const validate = () => {
        let errors = {};
        if (!formData.email) {
            errors.email = "Email is required";
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            errors.email = "Enter a valid email address";
        }
        if (!formData.password) {
            errors.password = "Password is required";
        }
        setErrors(errors);
        return Object.keys(errors).length === 0;
    };

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        setServerError("");
        if (!validate()) return;
        try {
            const response = await fetch(`${apiUrl}/api/auth/login`, {
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
            console.error("Login error:", error);
            setServerError(error.message);
        }
    };

    return (
        <div
            className="min-h-screen flex items-center justify-center bg-cover bg-center bg-no-repeat py-4 px-4"
            style={{
                backgroundImage: `url("/FoodPort-Background.jpg")`,
            }}
        >
            <div className="card w-full max-w-md p-8 bg-black/80 backdrop-blur-sm rounded shadow lg:shadow-lg border border-gray-200 ">
                <h1 className="text-center text-4xl font-extrabold text-gray-800 mb-6">
                    Welcome Back!
                </h1>
                {serverError && <p className="text-red-600 text-center my-2">{serverError}</p>}
                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
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
                        Log In
                    </button>
                </form>
                <p className="pt-8 text-center">
                    New to foodport?{" "}
                    <Link className="text-lime-600 font-medium" to="/sign-up">
                        Sign Up
                    </Link>
                </p>
            </div>
        </div>
    );
};

export default Signin;

