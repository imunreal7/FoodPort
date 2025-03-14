// CartSummary.js
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const CartSummary = ({ cartItems }) => {
    const totalAmount = useSelector((store) => store.cart.total);
    const deliveryFee = useSelector((store) => store.cart.shippingFee) || 0; // Default to 0 if not defined
    const totalItems = cartItems.reduce((acc, item) => acc + item.quantity, 0);
    const navigate = useNavigate();

    if (cartItems.length === 0) return null; // Don't show summary if cart is empty

    return (
        <div className="py-8">
            <h2 className="text-2xl font-bold text-gray-700 mb-5 border-b pb-3">Order Summary</h2>
            <div className="space-y-6">
                <div className="flex justify-between items-center text-lg font-medium">
                    <p className="text-gray-600">Total Items</p>
                    <p className="font-semibold">{totalItems}</p>
                </div>
                <div className="flex justify-between items-center text-lg font-medium">
                    <p className="text-gray-600">Items Amount</p>
                    <p className="font-semibold">₹{totalAmount}</p>
                </div>
                <div className="flex justify-between items-center text-lg font-medium">
                    <p className="text-gray-600">Shipping Fee</p>
                    <p className="font-semibold">₹{deliveryFee}</p>
                </div>
                <div className="flex justify-between items-center text-lg font-medium">
                    <p className="text-gray-600 font-semibold">Grand Total</p>
                    <p className="font-semibold">₹{totalAmount + deliveryFee}</p>
                </div>
                <button
                    onClick={() => navigate("/checkout")}
                    className="py-3 px-8 bg-teal-600 text-white font-semibold rounded-md hover:bg-teal-700 transition-colors"
                >
                    Proceed to Checkout
                </button>
            </div>
        </div>
    );
};

export default CartSummary;

