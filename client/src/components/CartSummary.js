import { useSelector } from "react-redux";

const CartSummary = ({ cartItems }) => {
    const totalAmount = useSelector((store) => store.cart.total);
    const deliveryFee = useSelector((store) => store.cart.shipping_fee);

    // Calculate total items as sum of each item's quantity
    const totalItems = cartItems.reduce((acc, item) => acc + item.quantity, 0);

    return (
        <>
            {cartItems.length > 0 && (
                <div className="py-8">
                    <h2 className="text-2xl font-bold text-gray-700 mb-5 border-b pb-3">
                        Order Summary
                    </h2>
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
                        <button className="py-3 px-8 bg-teal-600 text-white font-semibold rounded-md hover:bg-teal-700 transition-colors">
                            Proceed to Checkout
                        </button>
                    </div>
                </div>
            )}
        </>
    );
};

export default CartSummary;

