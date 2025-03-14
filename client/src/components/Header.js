import { useSelector } from "react-redux";
import logo from "../logo.png";
import "./css/Header.css";
import { NavLink, Link } from "react-router-dom";
import ShoppingCartCheckoutIcon from "@mui/icons-material/ShoppingCartCheckout";
const Header = () => {
    function navbarToggle() {
        const element = document.getElementById("toggleNavbar");
        element.classList.toggle("hidden");
    }

    // subscribing to the cart using a selector
    const cartItems = useSelector((store) => store.cart.items);
    return (
        <>
            <div className="bg-white sticky top-0 z-50">
                <header className="relative bg-white ">
                    <nav
                        aria-label="Top"
                        className="px-5 sm:px-7 lg:px-9 border-b border-gray-300 dark:bg-gray-800 dark:border-neutral-900"
                    >
                        <div className="max-w-7xl mx-auto">
                            <div className="flex h-16 items-center">
                                <div className="flex lg:ml-0">
                                    <Link to="/" className="flex items-center space-x-2">
                                        <img className="h-8 w-auto" src={logo} alt="" />
                                        <div className="logo-text hidden lg:block">
                                            Food <span className="logo-text-second">Port</span>
                                        </div>
                                    </Link>
                                </div>

                                <div id="toggleNavbar" className="hidden ml-8 lg:block ">
                                    <div className="flex space-x-8 absolute lg:relative bg-white h-[33vh] lg:h-[0vh] w-full left-[0%] top-[101%] flex-col lg:flex-row justify-between justify-center items-center p-[15px] lg:p-[0px]">
                                        <NavLink
                                            to="/"
                                            className="flex items-center text-xl lg:text-sm font-medium text-gray-700 dark:text-white hover:text-lime-600 border-white border-b-2 "
                                        >
                                            Home
                                        </NavLink>
                                        <NavLink
                                            to="/restaurants"
                                            className="flex items-center text-xl lg:text-sm font-medium text-gray-700  dark:text-white hover:text-lime-600 border-white border-b-2 "
                                        >
                                            Restaurants
                                        </NavLink>
                                        <NavLink
                                            to="/about"
                                            className="flex items-center text-xl lg:text-sm font-medium text-gray-700  dark:text-white hover:text-lime-600 border-white border-b-2 "
                                        >
                                            About Us
                                        </NavLink>
                                        <NavLink
                                            to="/contact"
                                            className="flex items-center text-xl lg:text-sm font-medium text-gray-700  dark:text-white hover:text-lime-600 border-white border-b-2 "
                                        >
                                            Contact Us
                                        </NavLink>
                                    </div>
                                </div>

                                <div className="ml-auto flex items-center">
                                    <div className="pr-2 lg:pr-0 lg:flex lg:flex-1 lg:items-center lg:justify-end lg:space-x-6">
                                        <NavLink
                                            to="/sign-in"
                                            className="lg:pr-0 text-sm font-medium text-gray-700  dark:text-white hover:text-lime-600 "
                                        >
                                            Log in
                                        </NavLink>
                                        <span
                                            className="h-6 w-px bg-gray-200"
                                            aria-hidden="true"
                                        ></span>
                                        <NavLink
                                            to="/sign-up"
                                            className="hidden lg:block text-sm font-medium text-gray-700  dark:text-white hover:text-lime-600"
                                        >
                                            Sign up
                                        </NavLink>
                                    </div>
                                    <div className="pr-6 lg:pr-0 ml-4 flow-root lg:ml-6 lg:block">
                                        <NavLink
                                            to="/cart"
                                            className="group -m-2 flex items-center p-2"
                                        >
                                            <ShoppingCartCheckoutIcon className="text-gray-700 dark:text-white hover:text-lime-600 group" />
                                            <span className="ml-1 text-sm font-medium text-gray-700 dark:text-white group-hover:text-lime-600">
                                                {cartItems.length}
                                            </span>
                                        </NavLink>
                                    </div>
                                    <div
                                        onClick={navbarToggle}
                                        data-collapse-toggle="navbar-default"
                                        className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg lg:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
                                        aria-controls="navbar-default"
                                        aria-expanded="false"
                                    >
                                        <span className="sr-only">Open main menu</span>
                                        <svg
                                            className="w-5 h-5"
                                            aria-hidden="true"
                                            xmlns="http://www.w3.org/2000/svg"
                                            fill="none"
                                            viewBox="0 0 17 14"
                                        >
                                            <path
                                                stroke="currentColor"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth="2"
                                                d="M1 1h15M1 7h15M1 13h15"
                                            />
                                        </svg>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </nav>
                </header>
            </div>
        </>
    );
};

export default Header;

