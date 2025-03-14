import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";

const OrderHistory = () => {
    const [orders, setOrders] = useState([]);
    const token = localStorage.getItem("token");

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const res = await fetch("http://localhost:5000/api/orders", {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: token ? `Bearer ${token}` : "",
                    },
                });
                if (!res.ok) {
                    throw new Error("Failed to fetch orders");
                }
                const data = await res.json();
                setOrders(data);
            } catch (error) {
                toast.error(error.message);
            }
        };

        fetchOrders();
    }, [token]);

    const getStatusStyle = (status) => {
        const lowerStatus = status.toLowerCase();
        if (lowerStatus === "pending") return "bg-yellow-100 text-yellow-800";
        if (lowerStatus === "rejected" || lowerStatus === "cancelled")
            return "bg-red-100 text-red-800";
        if (lowerStatus === "delivered" || lowerStatus === "success")
            return "bg-green-100 text-green-800";
        return "bg-gray-100 text-gray-800";
    };

    return (
        <div className="container mx-auto max-w-screen-xl py-16 px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold mb-10 text-center">Your Order History</h2>
            {orders.length === 0 ? (
                <p className="text-center text-xl text-gray-600">No orders found.</p>
            ) : (
                <div className="grid gap-6">
                    {orders.map((order) => (
                        <Link
                            key={order._id}
                            to={`/order/${order._id}`}
                            className="block border p-6 rounded-lg shadow hover:shadow-2xl transition-shadow duration-200"
                        >
                            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center">
                                <h3 className="text-xl font-semibold mb-2 sm:mb-0">
                                    Order ID: {order._id}
                                </h3>
                                <span
                                    className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusStyle(
                                        order.status
                                    )}`}
                                >
                                    {order.status.toUpperCase()}
                                </span>
                            </div>
                            <div className="mt-2 text-gray-600">
                                <p>
                                    <span className="font-medium">Order Date:</span>{" "}
                                    {new Date(order.createdAt).toLocaleString()}
                                </p>
                                <p>
                                    <span className="font-medium">Total:</span> ₹
                                    {order.total + order.shippingFee}
                                </p>
                            </div>
                        </Link>
                    ))}
                </div>
            )}
        </div>
    );
};

export default OrderHistory;
