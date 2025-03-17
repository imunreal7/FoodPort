import React, { useState } from "react";
import toast from "react-hot-toast";
import BenefitCard from "../BenefitCard";
import WhereToVoteOutlinedIcon from "@mui/icons-material/WhereToVoteOutlined";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import LocalPhoneOutlinedIcon from "@mui/icons-material/LocalPhoneOutlined";
import QueryBuilderOutlinedIcon from "@mui/icons-material/QueryBuilderOutlined";
import "./css/custom.css"; // Reuse the same custom CSS as needed

const Contact = () => {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        comment: "",
    });

    const handleChange = (e) => {
        setFormData((prev) => ({
            ...prev,
            [e.target.name]: e.target.value,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        toast.success("Thank you for getting in touch. We will get back to you soon!", {
            duration: 3000,
            position: "top-center",
            style: {
                backgroundColor: "#7BFFC2",
                color: "green",
                fontWeight: 600,
            },
        });
        setFormData({ name: "", email: "", comment: "" });
    };

    return (
        <div className="min-h-screen to-green-100 bg-gradient-to-br from-gray-100 to-gray-200 py-8 px-4">
            <div className="mx-auto w-full max-w-screen-xl">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {/* Left: Contact Form */}
                    <div className="flex justify-center items-center">
                        <div className="card w-full max-w-md p-12 bg-white rounded shadow-2xl">
                            <h1 className="text-center text-3xl font-extrabold text-gray-800 mb-6">
                                Get in touch with us
                            </h1>
                            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                                <div className="flex flex-col">
                                    <label htmlFor="name" className="mb-2 text-gray-700">
                                        Name
                                    </label>
                                    <input
                                        className="p-3 border rounded border-gray-300 focus:outline-none focus:ring-2 focus:ring-lime-600"
                                        type="text"
                                        name="name"
                                        placeholder="Enter your name"
                                        required
                                        value={formData.name}
                                        onChange={handleChange}
                                    />
                                </div>
                                <div className="flex flex-col">
                                    <label htmlFor="email" className="mb-2 text-gray-700">
                                        Email
                                    </label>
                                    <input
                                        className="p-3 border rounded border-gray-300 focus:outline-none focus:ring-2 focus:ring-lime-600"
                                        type="email"
                                        name="email"
                                        placeholder="Enter your email"
                                        required
                                        value={formData.email}
                                        onChange={handleChange}
                                    />
                                </div>
                                <div className="flex flex-col">
                                    <label htmlFor="comment" className="mb-2 text-gray-700">
                                        Comment
                                    </label>
                                    <textarea
                                        className="p-3 border rounded border-gray-300 focus:outline-none focus:ring-2 focus:ring-lime-600"
                                        name="comment"
                                        rows="3"
                                        placeholder="Your message..."
                                        required
                                        value={formData.comment}
                                        onChange={handleChange}
                                    ></textarea>
                                </div>
                                <button
                                    type="submit"
                                    className="py-3 px-8 bg-lime-600 text-white font-semibold rounded hover:bg-lime-700 transition-colors duration-200"
                                >
                                    Submit
                                </button>
                            </form>
                        </div>
                    </div>

                    {/* Right: 2x2 Benefit Boxes */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-20">
                        {[
                            {
                                icon: (
                                    <WhereToVoteOutlinedIcon
                                        sx={{ fontSize: 40 }}
                                        color="success"
                                    />
                                ),
                                desc: "Delhi, India",
                            },
                            {
                                icon: <EmailOutlinedIcon sx={{ fontSize: 40 }} color="success" />,
                                desc: "support@foodport.com",
                            },
                            {
                                icon: (
                                    <LocalPhoneOutlinedIcon sx={{ fontSize: 40 }} color="success" />
                                ),
                                desc: "+91 1234567890",
                            },
                            {
                                icon: (
                                    <QueryBuilderOutlinedIcon
                                        sx={{ fontSize: 40 }}
                                        color="success"
                                    />
                                ),
                                desc: "Mon-Fri: 9AM - 12PM",
                            },
                        ].map((item, index) => (
                            <div key={index} className="w-[250px] h-[250px] mx-auto">
                                <BenefitCard icon={item.icon} desc={item.desc} />
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Contact;

