import React from "react";
import { useNavigate } from "react-router-dom";

const OrderSuccess = () => {
    const navigate = useNavigate();
    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-gray-100 to-green-100 text-center p-6">
            <h2 className="text-4xl font-bold text-gray-800 mb-4">Thank You!</h2>
            <p className="text-lg text-gray-600 mb-8">Your order has been placed successfully.</p>
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
