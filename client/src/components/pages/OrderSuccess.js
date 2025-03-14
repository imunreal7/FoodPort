import React from "react";
import { useNavigate } from "react-router-dom";

const OrderSuccess = () => {
    const navigate = useNavigate();
    return (
        <div className="container mx-auto max-w-screen-xl py-16 px-6 lg:px-8 text-center">
            <h2 className="text-3xl font-bold mb-4">Thank You!</h2>
            <p className="mb-8">Your order has been placed successfully.</p>
            <button
                onClick={() => navigate("/orders-history")}
                className="py-3 px-8 bg-teal-600 text-white font-semibold rounded-md hover:bg-teal-700 transition-colors"
            >
                View Orders
            </button>
        </div>
    );
};

export default OrderSuccess;
