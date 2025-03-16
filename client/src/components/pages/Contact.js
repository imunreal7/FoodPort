import { useState } from "react";
import toast from "react-hot-toast";
import BenefitCard from "../BenefitCard";
import WhereToVoteOutlinedIcon from "@mui/icons-material/WhereToVoteOutlined";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import LocalPhoneOutlinedIcon from "@mui/icons-material/LocalPhoneOutlined";
import QueryBuilderOutlinedIcon from "@mui/icons-material/QueryBuilderOutlined";
import "./css/custom.css"; // Same CSS used by your Sign Up page

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
        // Show dummy success toast using react-hot-toast
        toast.success("Thank you for getting in touch. We will get back to you soon!", {
            duration: 3000,
            position: "top-center",
            style: {
                backgroundColor: "#7BFFC2",
                color: "green",
                fontWeight: 600,
            },
        });
        // Reset form after submission
        setFormData({ name: "", email: "", comment: "" });
    };

    return (
        <div className="min-h-screen to-green-100 bg-gradient-to-br from-gray-100 to-gray-200 py-8 px-4">
            <div className="mx-auto w-full max-w-screen-xl">
                {/* Split layout: Left form, Right 2x2 boxes */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {/* Left: Contact Form */}
                    <div className="flex justify-center items-center">
                        <div className="card w-full max-w-md p-12 bg-white rounded shadow-2xl md:mt-0">
                            <h1 className="text-center text-3xl font-extrabold text-gray-800 mb-6">
                                Get in touch with us
                            </h1>
                            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                                {/* NAME FIELD */}
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
                                {/* EMAIL FIELD */}
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
                                {/* COMMENT FIELD */}
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
                                {/* SUBMIT BUTTON */}
                                <button
                                    type="submit"
                                    className="py-3 px-8 bg-lime-600 text-white font-semibold rounded hover:bg-lime-700 transition-colors duration-200"
                                >
                                    Submit
                                </button>
                            </form>
                        </div>
                    </div>

                    {/* Right: 2×2 Benefit Boxes (Smaller) */}
                    <div className="grid grid-cols-1 md:grid-cols-2  mt-20">
                        {/* Each box is wrapped in a <div> with inline CSS to make it smaller */}
                        <div
                            style={{
                                width: "250px",
                                height: "250px",
                                margin: "auto",
                            }}
                        >
                            <BenefitCard
                                icon={
                                    <WhereToVoteOutlinedIcon
                                        sx={{ fontSize: 40 }}
                                        color="success"
                                    />
                                }
                                desc="Delhi, India"
                            />
                        </div>
                        <div
                            style={{
                                width: "250px",
                                height: "250px",
                                margin: "auto",
                            }}
                        >
                            <BenefitCard
                                icon={<EmailOutlinedIcon sx={{ fontSize: 40 }} color="success" />}
                                desc="support@foodport.com"
                            />
                        </div>
                        <div
                            style={{
                                width: "250px",
                                height: "250px",
                                margin: "auto",
                            }}
                        >
                            <BenefitCard
                                icon={
                                    <LocalPhoneOutlinedIcon sx={{ fontSize: 40 }} color="success" />
                                }
                                desc="+91 1234567890"
                            />
                        </div>
                        <div
                            style={{
                                width: "250px",
                                height: "250px",
                                margin: "auto",
                            }}
                        >
                            <BenefitCard
                                icon={
                                    <QueryBuilderOutlinedIcon
                                        sx={{ fontSize: 40 }}
                                        color="success"
                                    />
                                }
                                desc="Mon-Fri: 9AM - 12PM"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Contact;

