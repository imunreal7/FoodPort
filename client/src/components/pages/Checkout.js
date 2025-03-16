import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createOrder } from "../../redux/slices/cartSlice";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const Checkout = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { items, total, shippingFee, loading } = useSelector((state) => state.cart);
    const grandTotal = total + (shippingFee || 0);

    // Local state for checkout details
    const [customer, setCustomer] = useState({
        name: "",
        phone: "",
        address: "",
        instructions: "",
    });
    const [deliveryOption, setDeliveryOption] = useState("immediate");
    const [scheduledTime, setScheduledTime] = useState("");
    const [paymentMethod, setPaymentMethod] = useState("card");

    const handleInputChange = (e) => {
        setCustomer({ ...customer, [e.target.name]: e.target.value });
    };

    const handlePlaceOrder = () => {
        // Basic validation for required fields
        if (!customer.name || !customer.phone || !customer.address) {
            toast.error("Please fill in all required customer details.");
            return;
        }
        // If scheduled delivery is selected, ensure a future date–time is provided
        if (deliveryOption === "scheduled" && !scheduledTime) {
            toast.error("Please select a scheduled delivery time.");
            return;
        }
        // Bundle checkout details with the order creation
        const orderData = {
            customerName: customer.name,
            customerPhone: customer.phone,
            customerAddress: customer.address,
            instructions: customer.instructions,
            deliveryOption,
            scheduledTime: deliveryOption === "scheduled" ? scheduledTime : null,
            paymentMethod,
        };

        dispatch(createOrder(orderData))
            .unwrap()
            .then((orderData) => {
                toast.success("Order placed successfully!");
                // Redirect to order success page after successful order placement
                navigate("/order-success", { state: { orderData } });
            })
            .catch((err) => {
                toast.error("Order creation failed: " + err);
            });
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-100 to-green-100 py-12 px-4">
            <div className="max-w-4xl mx-auto bg-white/80 backdrop-blur-lg rounded-xl shadow-2xl p-10">
                <h2 className="text-4xl font-bold text-gray-800 text-center mb-10">Checkout</h2>

                {/* Customer Details */}
                <section className="border border-gray-200 p-6 rounded-lg mb-8">
                    <h3 className="text-2xl font-semibold text-gray-700 mb-4">Delivery Details</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-gray-600 font-medium mb-1">
                                Full Name <span className="text-red-500">*</span>
                            </label>
                            <input
                                type="text"
                                name="name"
                                value={customer.name}
                                onChange={handleInputChange}
                                placeholder="Enter your full name"
                                className="w-full border border-gray-300 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-blue-400"
                            />
                        </div>
                        <div>
                            <label className="block text-gray-600 font-medium mb-1">
                                Phone Number <span className="text-red-500">*</span>
                            </label>
                            <input
                                type="tel"
                                name="phone"
                                value={customer.phone}
                                onChange={handleInputChange}
                                placeholder="Enter your phone number"
                                className="w-full border border-gray-300 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-blue-400"
                            />
                        </div>
                        <div className="md:col-span-2">
                            <label className="block text-gray-600 font-medium mb-1">
                                Delivery Address <span className="text-red-500">*</span>
                            </label>
                            <textarea
                                name="address"
                                value={customer.address}
                                onChange={handleInputChange}
                                placeholder="Enter your delivery address"
                                rows="3"
                                className="w-full border border-gray-300 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-blue-400"
                            ></textarea>
                        </div>
                        <div className="md:col-span-2">
                            <label className="block text-gray-600 font-medium mb-1">
                                Delivery Instructions
                            </label>
                            <textarea
                                name="instructions"
                                value={customer.instructions}
                                onChange={handleInputChange}
                                placeholder="Any additional instructions"
                                rows="2"
                                className="w-full border border-gray-300 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-blue-400"
                            ></textarea>
                        </div>
                    </div>
                </section>

                {/* Delivery & Payment Options */}
                <section className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                    <div className="border border-gray-200 p-6 rounded-lg">
                        <h3 className="text-2xl font-semibold text-gray-700 mb-4">
                            Delivery Options
                        </h3>
                        <div className="space-y-4">
                            <label className="flex items-center">
                                <input
                                    type="radio"
                                    name="deliveryOption"
                                    value="immediate"
                                    checked={deliveryOption === "immediate"}
                                    onChange={(e) => setDeliveryOption(e.target.value)}
                                    className="form-radio h-5 w-5 text-blue-500"
                                />
                                <span className="ml-2 text-gray-700">Immediate Delivery</span>
                            </label>
                            <label className="flex items-center">
                                <input
                                    type="radio"
                                    name="deliveryOption"
                                    value="scheduled"
                                    checked={deliveryOption === "scheduled"}
                                    onChange={(e) => setDeliveryOption(e.target.value)}
                                    className="form-radio h-5 w-5 text-blue-500"
                                />
                                <span className="ml-2 text-gray-700">Scheduled Delivery</span>
                            </label>
                            {deliveryOption === "scheduled" && (
                                <div className="mt-3">
                                    <label className="block text-gray-600 font-medium mb-1">
                                        Select Date & Time
                                    </label>
                                    <input
                                        type="datetime-local"
                                        value={scheduledTime}
                                        onChange={(e) => setScheduledTime(e.target.value)}
                                        className="w-full border border-gray-300 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-blue-400"
                                        min={new Date().toISOString().slice(0, 16)}
                                    />
                                </div>
                            )}
                        </div>
                    </div>

                    <div className="border border-gray-200 p-6 rounded-lg">
                        <h3 className="text-2xl font-semibold text-gray-700 mb-4">
                            Payment Method
                        </h3>
                        <select
                            value={paymentMethod}
                            onChange={(e) => setPaymentMethod(e.target.value)}
                            className="w-full border border-gray-300 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-blue-400"
                        >
                            <option value="card">Credit/Debit Card</option>
                            <option value="upi">UPI</option>
                            <option value="cod">Cash on Delivery</option>
                        </select>
                    </div>
                </section>

                {/* Order Summary */}
                <section className="border border-gray-200 p-6 rounded-lg shadow-md mb-8">
                    <h3 className="text-2xl font-bold text-gray-800 mb-4">Order Summary</h3>
                    <p className="mb-2">
                        Total Items: {items.reduce((acc, item) => acc + item.quantity, 0)}
                    </p>
                    <p className="mb-2">Items Amount: ₹{total}</p>
                    <p className="mb-2">Shipping Fee: ₹{shippingFee || 0}</p>
                    <p className="font-bold text-xl text-gray-800">Grand Total: ₹{grandTotal}</p>
                </section>

                {/* Place Order Button */}
                <button
                    onClick={handlePlaceOrder}
                    disabled={loading}
                    className="w-full py-4 bg-green-600 text-white font-bold rounded-md hover:bg-green-700 transition-colors"
                >
                    {loading ? "Processing Order..." : "Place Order"}
                </button>
            </div>
        </div>
    );
};

export default Checkout;
