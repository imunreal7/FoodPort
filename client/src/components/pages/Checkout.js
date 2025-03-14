// Checkout.js
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
                // Redirect to order history page after successful order placement
                navigate("/order-success", { state: { orderData } });
            })
            .catch((err) => {
                toast.error("Order creation failed: " + err);
            });
    };

    return (
        <div className="container mx-auto max-w-screen-xl py-16 px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold mb-8">Checkout</h2>

            {/* Customer Details */}
            <div className="mb-10 border p-6 rounded-md shadow-sm">
                <h3 className="text-2xl font-semibold mb-4">Delivery Details</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div>
                        <label className="block text-gray-700 font-medium mb-1">Full Name *</label>
                        <input
                            type="text"
                            name="name"
                            value={customer.name}
                            onChange={handleInputChange}
                            placeholder="Your full name"
                            className="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-teal-500"
                        />
                    </div>
                    <div>
                        <label className="block text-gray-700 font-medium mb-1">
                            Phone Number *
                        </label>
                        <input
                            type="tel"
                            name="phone"
                            value={customer.phone}
                            onChange={handleInputChange}
                            placeholder="Your phone number"
                            className="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-teal-500"
                        />
                    </div>
                    <div className="sm:col-span-2">
                        <label className="block text-gray-700 font-medium mb-1">
                            Delivery Address *
                        </label>
                        <textarea
                            name="address"
                            value={customer.address}
                            onChange={handleInputChange}
                            placeholder="Your delivery address"
                            className="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-teal-500"
                            rows="3"
                        ></textarea>
                    </div>
                    <div className="sm:col-span-2">
                        <label className="block text-gray-700 font-medium mb-1">
                            Delivery Instructions
                        </label>
                        <textarea
                            name="instructions"
                            value={customer.instructions}
                            onChange={handleInputChange}
                            placeholder="Any additional instructions"
                            className="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-teal-500"
                            rows="2"
                        ></textarea>
                    </div>
                </div>
            </div>

            {/* Delivery & Payment Options */}
            <div className="mb-10 grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="border p-6 rounded-md shadow-sm">
                    <h3 className="text-2xl font-semibold mb-4">Delivery Options</h3>
                    <div className="flex flex-col space-y-3">
                        <label className="inline-flex items-center">
                            <input
                                type="radio"
                                name="deliveryOption"
                                value="immediate"
                                checked={deliveryOption === "immediate"}
                                onChange={(e) => setDeliveryOption(e.target.value)}
                                className="form-radio h-5 w-5 text-teal-600"
                            />
                            <span className="ml-2">Immediate Delivery</span>
                        </label>
                        <label className="inline-flex items-center">
                            <input
                                type="radio"
                                name="deliveryOption"
                                value="scheduled"
                                checked={deliveryOption === "scheduled"}
                                onChange={(e) => setDeliveryOption(e.target.value)}
                                className="form-radio h-5 w-5 text-teal-600"
                            />
                            <span className="ml-2">Scheduled Delivery</span>
                        </label>
                        {deliveryOption === "scheduled" && (
                            <div className="mt-3">
                                <label className="block text-gray-700 font-medium mb-1">
                                    Select Date & Time
                                </label>
                                <input
                                    type="datetime-local"
                                    value={scheduledTime}
                                    onChange={(e) => setScheduledTime(e.target.value)}
                                    className="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-teal-500"
                                    min={new Date().toISOString().slice(0, 16)} // restrict to future times
                                />
                            </div>
                        )}
                    </div>
                </div>

                <div className="border p-6 rounded-md shadow-sm">
                    <h3 className="text-2xl font-semibold mb-4">Payment Method</h3>
                    <select
                        value={paymentMethod}
                        onChange={(e) => setPaymentMethod(e.target.value)}
                        className="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-teal-500"
                    >
                        <option value="card">Credit/Debit Card</option>
                        <option value="upi">UPI</option>
                        <option value="cod">Cash on Delivery</option>
                    </select>
                </div>
            </div>

            {/* Order Summary */}
            <div className="border p-6 rounded-md shadow-md mb-10">
                <h3 className="text-2xl font-bold mb-4">Order Summary</h3>
                <p className="mb-2">
                    Total Items: {items.reduce((acc, item) => acc + item.quantity, 0)}
                </p>
                <p className="mb-2">Items Amount: ₹{total}</p>
                <p className="mb-2">Shipping Fee: ₹{shippingFee || 0}</p>
                <p className="font-bold text-lg">Grand Total: ₹{grandTotal}</p>
            </div>

            {/* Place Order Button */}
            <button
                onClick={handlePlaceOrder}
                disabled={loading}
                className="w-full py-3 bg-teal-600 text-white font-semibold rounded-md hover:bg-teal-700 transition-colors"
            >
                {loading ? "Processing Order..." : "Place Order"}
            </button>
        </div>
    );
};

export default Checkout;
