import React, { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import toast from "react-hot-toast";

const OrderDetail = () => {
    const { orderId } = useParams();
    const navigate = useNavigate();
    const [order, setOrder] = useState(null);
    const token = localStorage.getItem("token");

    useEffect(() => {
        const fetchOrder = async () => {
            try {
                const res = await fetch(`http://localhost:5000/api/orders/${orderId}`, {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: token ? `Bearer ${token}` : "",
                    },
                });
                if (!res.ok) {
                    throw new Error("Failed to fetch order details");
                }
                const data = await res.json();
                setOrder(data);
            } catch (error) {
                toast.error(error.message);
            }
        };

        fetchOrder();
    }, [orderId, token]);

    const getStatusStyle = (status) => {
        const lowerStatus = status.toLowerCase();
        if (lowerStatus === "pending") return "bg-yellow-100 text-yellow-800";
        if (lowerStatus === "rejected" || lowerStatus === "cancelled")
            return "bg-red-100 text-red-800";
        if (lowerStatus === "delivered" || lowerStatus === "success")
            return "bg-green-100 text-green-800";
        return "bg-gray-100 text-gray-800";
    };

    if (!order) {
        return (
            <div className="container mx-auto max-w-screen-xl py-16 px-4 text-center">
                <p className="text-xl">Loading order details...</p>
            </div>
        );
    }

    return (
        <div className="container mx-auto max-w-screen-xl py-16 px-4 sm:px-6 lg:px-8">
            <button onClick={() => navigate(-1)} className="mb-4 text-teal-600 hover:underline">
                &larr; Back
            </button>
            <div className="border p-6 rounded-lg shadow-lg">
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center">
                    <h2 className="text-2xl font-bold mb-2 sm:mb-0">Order Details</h2>
                    <span
                        className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusStyle(
                            order.status
                        )}`}
                    >
                        {order.status.toUpperCase()}
                    </span>
                </div>
                <div className="mt-4 text-gray-700">
                    <p>
                        <span className="font-medium">Order ID:</span> {order._id}
                    </p>
                    <p>
                        <span className="font-medium">Order Date:</span>{" "}
                        {new Date(order.createdAt).toLocaleString()}
                    </p>
                    <p>
                        <span className="font-medium">Total Amount:</span> ₹
                        {order.total + order.shippingFee}
                    </p>
                </div>

                <hr className="my-6" />

                {/* Customer Details */}
                <div className="mb-6">
                    <h3 className="text-xl font-semibold mb-2">Customer Details</h3>
                    <p>
                        <span className="font-medium">Name:</span> {order.customerName}
                    </p>
                    <p>
                        <span className="font-medium">Phone:</span> {order.customerPhone}
                    </p>
                    <p>
                        <span className="font-medium">Address:</span> {order.customerAddress}
                    </p>
                    {order.instructions && (
                        <p>
                            <span className="font-medium">Instructions:</span> {order.instructions}
                        </p>
                    )}
                </div>

                {/* Delivery & Payment Details */}
                <div className="mb-6">
                    <h3 className="text-xl font-semibold mb-2">Delivery & Payment</h3>
                    <p>
                        <span className="font-medium">Delivery Option:</span>{" "}
                        {order.deliveryOption === "scheduled" ? "Scheduled" : "Immediate"}
                    </p>
                    {order.deliveryOption === "scheduled" && order.scheduledTime && (
                        <p>
                            <span className="font-medium">Scheduled Time:</span>{" "}
                            {new Date(order.scheduledTime).toLocaleString()}
                        </p>
                    )}
                    <p>
                        <span className="font-medium">Payment Method:</span>{" "}
                        {order.paymentMethod.toUpperCase()}
                    </p>
                </div>

                {/* Order Items */}
                <div>
                    <h3 className="text-xl font-bold mb-2">Items Ordered</h3>
                    <div className="space-y-4">
                        {order.items.map((item) => (
                            <div
                                key={item._id}
                                className="flex flex-col sm:flex-row justify-between border-b pb-2"
                            >
                                <p className="font-medium">{item.product.name}</p>
                                <p className="text-gray-700">
                                    {item.quantity} x ₹{item.price} = ₹{item.quantity * item.price}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            <div className="mt-8 text-center">
                <Link
                    to="/orders-history"
                    className="py-3 px-8 bg-teal-600 text-white font-semibold rounded-md hover:bg-teal-700 transition-colors"
                >
                    View All Orders
                </Link>
            </div>
        </div>
    );
};

export default OrderDetail;
