import React from "react";
import CloseIcon from "@mui/icons-material/Close";
import { useDispatch } from "react-redux";
import { removeFromCart } from "../redux/slices/cartSlice";
import toast from "react-hot-toast";

const CartItem = ({ item }) => {
    const dispatch = useDispatch();

    const handleRemoveItem = (cartItem) => {
        dispatch(removeFromCart({ productId: cartItem.product._id }))
            .unwrap()
            .then(() => {
                toast.success(`${cartItem.product.name} removed from cart`, {
                    duration: 2000,
                    position: "top-center",
                    style: {
                        backgroundColor: "#fffbeb",
                        color: "#d84315",
                        fontWeight: 500,
                        borderRadius: "8px",
                        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.15)",
                    },
                });
            })
            .catch((err) => toast.error(err));
    };

    return (
        <div className="flex flex-col lg:flex-row justify-between items-start p-4 rounded-xl shadow-lg bg-gradient-to-br from-white to-gray-50 hover:shadow-2xl border border-gray-100 transition-shadow duration-200 ease-in-out">
            {/* LEFT SECTION: Image, Name, Description */}
            <div className="flex gap-4 w-full lg:w-3/5 items-start">
                <img
                    className="rounded-md"
                    src={item?.product?.image}
                    alt={item?.product?.name}
                    width="100px"
                />
                <div className="flex flex-col justify-between">
                    <h2 className="text-lg font-semibold text-gray-800 hover:text-lime-700 transition-colors duration-150">
                        {item?.product?.name}
                    </h2>
                    <p className="text-sm text-gray-600 mt-1">{item?.product?.description}</p>
                </div>
            </div>
            {/* RIGHT SECTION: Price, Quantity, Total, Remove */}
            <div className="mt-4 lg:mt-0 w-full lg:w-2/5 flex flex-col sm:flex-row items-center justify-around gap-4 text-center">
                <span className="text-lg font-semibold text-gray-700">₹{item?.product?.price}</span>
                <span className="text-lg font-semibold text-gray-700">{item?.quantity}</span>
                <span className="text-lg font-semibold text-gray-700">
                    ₹{item?.price * item?.quantity}
                </span>
                <button
                    onClick={() => handleRemoveItem(item)}
                    className="flex items-center text-lg font-semibold text-red-500 hover:text-red-700 transition-colors duration-150"
                >
                    Remove <CloseIcon fontSize="small" className="ml-1" />
                </button>
            </div>
        </div>
    );
};

export default CartItem;

