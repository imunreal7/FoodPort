import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Signin = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });

    // Update state on input change
    const handleChange = (e) => {
        setFormData((prev) => ({
            ...prev,
            [e.target.name]: e.target.value,
        }));
    };

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch("http://localhost:5000/api/auth/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData),
            });

            const data = await response.json();

            // If login failed (e.g., invalid credentials), handle error
            if (!response.ok) {
                throw new Error(data.msg || "Something went wrong");
            }

            // If successful, store the token
            localStorage.setItem("token", data.token);

            // Redirect to home, dashboard, or wherever you want
            navigate("/");
        } catch (error) {
            console.error("Login error:", error);
            // Show error message or toast
        }
    };

    return (
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row my-20 pt-8 px-8 pb-8 lg:gap-16 items-center">
            <div className="shadow-xl w-4/5 lg:w-3/5 mx-auto p-8">
                <h1 className="text-center text-5xl font-extrabold">Sign In</h1>
                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                    <div className="flex flex-col">
                        <label htmlFor="email" className="mb-2">
                            Email
                        </label>
                        <input
                            className="p-3 border rounded"
                            type="email"
                            name="email"
                            placeholder="Enter email"
                            required
                            value={formData.email}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="flex flex-col">
                        <label htmlFor="password" className="mb-2">
                            Password
                        </label>
                        <input
                            className="p-3 border rounded"
                            type="password"
                            name="password"
                            placeholder="Enter password"
                            required
                            value={formData.password}
                            onChange={handleChange}
                        />
                    </div>
                    <div>
                        <button
                            type="submit"
                            className="py-3 px-8 bg-lime-600 text-white font-semibold"
                        >
                            Submit
                        </button>
                    </div>
                </form>
                <p className="pt-8">
                    New to foodport?{" "}
                    <Link className="text-lime-600" to="/sign-up">
                        Click here
                    </Link>
                </p>
            </div>
        </div>
    );
};

export default Signin;

