import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCart, clearCart } from "../../redux/slices/cartSlice";
import toast from "react-hot-toast";
import CartItem from "../CartItem";
import CartSummary from "../CartSummary";

const Cart = () => {
    const dispatch = useDispatch();
    const { items: cartItems } = useSelector((state) => state.cart);

    useEffect(() => {
        dispatch(fetchCart());
    }, [dispatch]);

    const handleClearCart = () => {
        dispatch(clearCart())
            .unwrap()
            .then(() => {
                toast.success("All items removed from your cart!", {
                    duration: 2000,
                    position: "top-center",
                    style: {
                        backgroundColor: "#FFE76B",
                        color: "red",
                        fontWeight: 600,
                    },
                });
            })
            .catch((err) => toast.error(err));
    };

    return (
        <div
            className="w-full min-h-screen"
            style={{ background: "linear-gradient(to right, #ffffff, #efe5af)" }}
        >
            <div className="container mx-auto max-w-screen-5xl py-16 px-6 lg:px-8 border-b">
                <h2 className="text-3xl font-semibold capitalize pb-3">Your Shopping Cart</h2>
                <p className="text-stone-400 capitalize">
                    You have {cartItems.length} item{cartItems.length !== 1 && "s"} in your cart
                </p>
                {cartItems.length === 0 ? (
                    <div className="flex justify-center items-center h-[30vh]">
                        <h1 className="text-3xl font-semibold capitalize text-slate-500">
                            Your cart is empty
                        </h1>
                    </div>
                ) : (
                    <button
                        className="py-2 mt-3 px-5 border border-emerald-600 text-emerald-600 hover:bg-emerald-600 hover:text-white rounded-md"
                        onClick={handleClearCart}
                    >
                        Clear Cart
                    </button>
                )}
                <div className="grid grid-cols-1 lg:grid-cols-3 lg:gap-12 py-6">
                    <div className="flex flex-col py-8 gap-6 col-span-2">
                        {cartItems.map((item) => (
                            <CartItem item={item} key={item._id || item.id} />
                        ))}
                    </div>
                    <CartSummary cartItems={cartItems} />
                </div>
            </div>
        </div>
    );
};

export default Cart;

