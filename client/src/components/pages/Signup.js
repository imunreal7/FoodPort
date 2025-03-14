import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Signup = () => {
    const navigate = useNavigate();

    // Track all form fields, including phone if you want it
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
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
            const response = await fetch("http://localhost:5000/api/auth/register", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData),
            });

            const data = await response.json();

            // If registration failed (e.g., user already exists), handle error
            if (!response.ok) {
                throw new Error(data.msg || "Something went wrong");
            }

            // If successful, save the JWT token (and user info) as needed
            localStorage.setItem("token", data.token);

            // Optionally navigate to home or a profile page
            navigate("/");
        } catch (error) {
            console.error("Registration error:", error);
            // You can display an error message or toast here
        }
    };

    return (
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row my-20 pt-8 lg:px-8 pb-8 lg:gap-16 items-center">
            <div className="shadow-xl sm:w-full lg:w-3/5 mx-auto p-8">
                <h1 className="text-center text-5xl font-extrabold">Sign Up</h1>
                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                    {/* NAME */}
                    <div className="flex flex-col">
                        <label htmlFor="name" className="mb-2">
                            Name
                        </label>
                        <input
                            className="p-3 border rounded"
                            type="text"
                            name="name"
                            placeholder="Enter name"
                            required
                            value={formData.name}
                            onChange={handleChange}
                        />
                    </div>
                    {/* EMAIL */}
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
                    {/* PHONE (Optional) */}
                    <div className="flex flex-col">
                        <label htmlFor="phone" className="mb-2">
                            Phone
                        </label>
                        <input
                            className="p-3 border rounded"
                            type="text"
                            name="phone"
                            placeholder="Enter phone"
                            required
                            value={formData.phone}
                            onChange={handleChange}
                        />
                    </div>
                    {/* PASSWORD */}
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
                    Already have an account?{" "}
                    <Link className="text-lime-600" to="/sign-in">
                        Click here
                    </Link>
                </p>
            </div>
        </div>
    );
};

export default Signup;

