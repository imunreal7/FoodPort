// App.js
import React, { useEffect } from "react";
import { Outlet } from "react-router-dom";
import { useDispatch } from "react-redux";
import { fetchCart } from "./redux/slices/cartSlice";
import Header from "./components/Header";
import Footer from "./components/Footer";
import NorthIcon from "@mui/icons-material/North";
import { Toaster } from "react-hot-toast";

function App() {
    const dispatch = useDispatch();

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (token) {
            dispatch(fetchCart());
        }
    }, [dispatch]);

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth",
        });
    };

    return (
        <div className="App">
            <Header />
            <Outlet />
            <Footer />
            <button
                id="to-top-button"
                onClick={scrollToTop}
                title="Go To Top"
                className="fixed z-50 bottom-10 right-10 p-4 border-0 w-14 h-14 rounded-full shadow-md bg-stone-950 hover:bg-purple-700 text-white text-lg font-semibold transition-colors duration-300"
            >
                <NorthIcon />
            </button>
            <Toaster />
        </div>
    );
}

export default App;

