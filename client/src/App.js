import NorthIcon from "@mui/icons-material/North";
import Footer from "./components/Footer";
import Header from "./components/Header";
import { Outlet } from "react-router-dom";
import Subscribe from "./components/Subscribe";
import { Provider } from "react-redux";
import appStore from "./redux/appStore";
import toast, { Toaster } from "react-hot-toast";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { fetchCart } from "./redux/slices/cartSlice";

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
        <Provider store={appStore}>
            <div className="App">
                <Header />
                <Outlet />
                <Subscribe />
                <Footer />
                <button
                    id="to-top-button"
                    onClick={scrollToTop}
                    title="Go To Top"
                    className=" fixed z-50 bottom-10 right-10 p-4 border-0 w-14 h-14 rounded-full shadow-md bg-stone-950 hover:bg-purple-700 text-white text-lg font-semibold transition-colors duration-300"
                >
                    <NorthIcon />
                </button>
            </div>
            <Toaster />
        </Provider>
    );
}

export default App;

