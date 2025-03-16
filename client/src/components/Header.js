import { useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { NavLink, Link, useLocation, useNavigate } from "react-router-dom";
import ShoppingCartCheckoutIcon from "@mui/icons-material/ShoppingCartCheckout";
import logo from "../logo.png";

const Header = () => {
    const cartItems = useSelector((store) => store.cart.items);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const location = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem("token");
        setIsAuthenticated(!!token);
    }, [location]);

    const handleLogout = () => {
        localStorage.removeItem("token");
        setIsAuthenticated(false);
        navigate("/");
    };

    return (
        <header className="bg-gray-50 dark:bg-gray-900 sticky top-0 z-50 border-b border-gray-300 dark:border-gray-700">
            <div className="max-w-screen-xl mx-auto px-6 py-4 flex items-center justify-between">
                {/* Logo */}
                <div className="flex-shrink-0">
                    <Link to="/" className="flex items-center space-x-2">
                        {/* Replace the src with your logo path */}
                        <img src={logo} alt="FoodPort Logo" className="h-8 w-auto" />
                        <span className="text-xl font-bold text-gray-800 dark:text-white">
                            Food<span className="text-lime-600">Port</span>
                        </span>
                    </Link>
                </div>

                {/* Desktop Navigation */}
                <nav className="hidden md:flex space-x-6">
                    <NavLink
                        to="/"
                        className={({ isActive }) =>
                            isActive
                                ? "text-lime-600 font-medium"
                                : "text-gray-700 dark:text-gray-300 hover:text-lime-600 font-medium"
                        }
                    >
                        Home
                    </NavLink>
                    <NavLink
                        to="/restaurants"
                        className={({ isActive }) =>
                            isActive
                                ? "text-lime-600 font-medium"
                                : "text-gray-700 dark:text-gray-300 hover:text-lime-600 font-medium"
                        }
                    >
                        Restaurants
                    </NavLink>
                    {isAuthenticated && (
                        <NavLink
                            to="/orders-history"
                            className={({ isActive }) =>
                                isActive
                                    ? "text-lime-600 font-medium"
                                    : "text-gray-700 dark:text-gray-300 hover:text-lime-600 font-medium"
                            }
                        >
                            My Orders
                        </NavLink>
                    )}
                    {isAuthenticated && (
                        <NavLink
                            to="/personalised-recommendation"
                            className={({ isActive }) =>
                                isActive
                                    ? "text-lime-600 font-medium"
                                    : "text-gray-700 dark:text-gray-300 hover:text-lime-600 font-medium"
                            }
                        >
                            AI Recommendation
                        </NavLink>
                    )}
                    <NavLink
                        to="/about"
                        className={({ isActive }) =>
                            isActive
                                ? "text-lime-600 font-medium"
                                : "text-gray-700 dark:text-gray-300 hover:text-lime-600 font-medium"
                        }
                    >
                        About Us
                    </NavLink>
                    <NavLink
                        to="/contact"
                        className={({ isActive }) =>
                            isActive
                                ? "text-lime-600 font-medium"
                                : "text-gray-700 dark:text-gray-300 hover:text-lime-600 font-medium"
                        }
                    >
                        Contact Us
                    </NavLink>
                </nav>

                {/* Right Side */}
                <div className="flex items-center">
                    <Link
                        to="/cart"
                        className="relative p-2 text-gray-700 dark:text-gray-300 hover:text-lime-600"
                    >
                        <ShoppingCartCheckoutIcon />
                        {cartItems.length > 0 && (
                            <span className="absolute -top-1 -right-1 bg-lime-600 text-white text-xs font-semibold rounded-full h-5 w-5 flex items-center justify-center">
                                {cartItems.length}
                            </span>
                        )}
                    </Link>
                    {isAuthenticated ? (
                        <div className="hidden md:flex items-center space-x-4 ml-4">
                            <NavLink
                                to="/profile"
                                className={({ isActive }) =>
                                    isActive
                                        ? "text-lime-600 font-medium"
                                        : "text-gray-700 dark:text-gray-300 hover:text-lime-600 font-medium"
                                }
                            >
                                Profile
                            </NavLink>
                            <button
                                onClick={handleLogout}
                                className="text-gray-700 dark:text-gray-300 hover:text-lime-600 font-medium"
                            >
                                Logout
                            </button>
                        </div>
                    ) : (
                        <div className="hidden md:flex items-center space-x-4 ml-4">
                            <NavLink
                                to="/sign-in"
                                className={({ isActive }) =>
                                    isActive
                                        ? "text-lime-600 font-medium"
                                        : "text-gray-700 dark:text-gray-300 hover:text-lime-600 font-medium"
                                }
                            >
                                Log in
                            </NavLink>
                            <NavLink
                                to="/sign-up"
                                className={({ isActive }) =>
                                    isActive
                                        ? "text-lime-600 font-medium"
                                        : "text-gray-700 dark:text-gray-300 hover:text-lime-600 font-medium"
                                }
                            >
                                Sign up
                            </NavLink>
                        </div>
                    )}

                    {/* Mobile Menu Toggle */}
                    <div className="md:hidden ml-4">
                        <button
                            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                            className="p-2 text-gray-700 dark:text-gray-300 hover:text-lime-600 focus:outline-none"
                        >
                            <svg
                                className="w-6 h-6"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                {mobileMenuOpen ? (
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M6 18L18 6M6 6l12 12"
                                    />
                                ) : (
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M4 6h16M4 12h16M4 18h16"
                                    />
                                )}
                            </svg>
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Navigation */}
            {mobileMenuOpen && (
                <nav className="md:hidden bg-gray-50 dark:bg-gray-900 border-t border-gray-300 dark:border-gray-700">
                    <div className="px-6 py-4 space-y-3">
                        <NavLink
                            onClick={() => setMobileMenuOpen(false)}
                            to="/"
                            className="block text-gray-700 dark:text-gray-300 hover:text-lime-600 font-medium"
                        >
                            Home
                        </NavLink>
                        <NavLink
                            onClick={() => setMobileMenuOpen(false)}
                            to="/restaurants"
                            className="block text-gray-700 dark:text-gray-300 hover:text-lime-600 font-medium"
                        >
                            Restaurants
                        </NavLink>
                        {isAuthenticated && (
                            <NavLink
                                onClick={() => setMobileMenuOpen(false)}
                                to="/orders-history"
                                className="block text-gray-700 dark:text-gray-300 hover:text-lime-600 font-medium"
                            >
                                My Orders
                            </NavLink>
                        )}
                        {isAuthenticated && (
                            <NavLink
                                onClick={() => setMobileMenuOpen(false)}
                                to="/personalised-recommendation"
                                className="block text-gray-700 dark:text-gray-300 hover:text-lime-600 font-medium"
                            >
                                AI Recommendation
                            </NavLink>
                        )}
                        <NavLink
                            onClick={() => setMobileMenuOpen(false)}
                            to="/about"
                            className="block text-gray-700 dark:text-gray-300 hover:text-lime-600 font-medium"
                        >
                            About Us
                        </NavLink>
                        <NavLink
                            onClick={() => setMobileMenuOpen(false)}
                            to="/contact"
                            className="block text-gray-700 dark:text-gray-300 hover:text-lime-600 font-medium"
                        >
                            Contact Us
                        </NavLink>
                        <div className="pt-3 border-t border-gray-300 dark:border-gray-700">
                            {isAuthenticated ? (
                                <>
                                    <NavLink
                                        onClick={() => setMobileMenuOpen(false)}
                                        to="/profile"
                                        className="block text-gray-700 dark:text-gray-300 hover:text-lime-600 font-medium"
                                    >
                                        Profile
                                    </NavLink>
                                    <button
                                        onClick={() => {
                                            setMobileMenuOpen(false);
                                            handleLogout();
                                        }}
                                        className="block w-full text-left text-gray-700 dark:text-gray-300 hover:text-lime-600 font-medium"
                                    >
                                        Logout
                                    </button>
                                </>
                            ) : (
                                <>
                                    <NavLink
                                        onClick={() => setMobileMenuOpen(false)}
                                        to="/sign-in"
                                        className="block text-gray-700 dark:text-gray-300 hover:text-lime-600 font-medium"
                                    >
                                        Log in
                                    </NavLink>
                                    <NavLink
                                        onClick={() => setMobileMenuOpen(false)}
                                        to="/sign-up"
                                        className="block text-gray-700 dark:text-gray-300 hover:text-lime-600 font-medium"
                                    >
                                        Sign up
                                    </NavLink>
                                </>
                            )}
                        </div>
                    </div>
                </nav>
            )}
        </header>
    );
};

export default Header;

