import { Link, NavLink } from "react-router-dom";
import FacebookOutlinedIcon from "@mui/icons-material/FacebookOutlined";
import GitHubIcon from "@mui/icons-material/GitHub";
import TwitterIcon from "@mui/icons-material/Twitter";

const Footer = () => {
    return (
        <footer className="bg-gray-50 dark:bg-gray-900 border-t border-gray-300">
            <div className="container mx-auto max-w-screen-xl px-6 py-8">
                {/* Top Section: Brand & Quick Intro */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
                    {/* Brand + Tagline */}
                    <div className="mb-6 md:mb-0 flex flex-col space-y-2">
                        <Link to="/" className="flex items-center space-x-2">
                            <img src="/logo.png" className="h-9" alt="FoodPort Logo" />
                            <span className="text-2xl font-bold text-gray-800 dark:text-white">
                                Food<span className="text-lime-600">Port</span>
                            </span>
                        </Link>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                            Delivering Joy, One Meal at a Time.
                        </p>
                    </div>

                    {/* Social Icons */}
                    <div className="flex space-x-5">
                        <a
                            href="https://facebook.com"
                            className="text-gray-500 hover:text-blue-500 dark:hover:text-blue-400 transition-colors"
                            target="_blank"
                            rel="noreferrer"
                        >
                            <FacebookOutlinedIcon />
                        </a>
                        <a
                            href="https://twitter.com/"
                            className="text-gray-500 hover:text-cyan-500 dark:hover:text-cyan-400 transition-colors"
                            target="_blank"
                            rel="noreferrer"
                        >
                            <TwitterIcon />
                        </a>
                        <a
                            href="https://github.com/imunreal7"
                            className="text-gray-500 hover:text-gray-800 dark:hover:text-gray-200 transition-colors"
                            target="_blank"
                            rel="noreferrer"
                        >
                            <GitHubIcon />
                        </a>
                    </div>
                </div>

                {/* Middle Section: Links */}
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-6 md:gap-10 mb-8">
                    {/* Column 1: Discover */}
                    <div>
                        <h2 className="mb-3 text-base font-semibold uppercase text-gray-800 dark:text-white tracking-wider">
                            Discover
                        </h2>
                        <ul className="text-gray-600 dark:text-gray-400 text-sm space-y-2">
                            <li>
                                <NavLink to="/restaurants" className="hover:text-lime-600">
                                    Our Restaurants
                                </NavLink>
                            </li>
                            <li>
                                <NavLink to="/about" className="hover:text-lime-600">
                                    About FoodPort
                                </NavLink>
                            </li>
                            <li>
                                <NavLink to="/contact" className="hover:text-lime-600">
                                    Contact Us
                                </NavLink>
                            </li>
                        </ul>
                    </div>

                    {/* Column 2: Follow Us */}
                    <div>
                        <h2 className="mb-3 text-base font-semibold uppercase text-gray-800 dark:text-white tracking-wider">
                            Follow Us
                        </h2>
                        <ul className="text-gray-600 dark:text-gray-400 text-sm space-y-2">
                            <li>
                                <a
                                    href="https://www.linkedin.com/in/amandubey7/"
                                    target="_blank"
                                    rel="noreferrer"
                                    className="hover:text-lime-600"
                                >
                                    LinkedIn
                                </a>
                            </li>
                            <li>
                                <a
                                    href="https://github.com/imunreal7"
                                    target="_blank"
                                    rel="noreferrer"
                                    className="hover:text-lime-600"
                                >
                                    GitHub
                                </a>
                            </li>
                            <li>
                                <a
                                    href="https://facebook.com"
                                    target="_blank"
                                    rel="noreferrer"
                                    className="hover:text-lime-600"
                                >
                                    Facebook
                                </a>
                            </li>
                        </ul>
                    </div>

                    {/* Column 3: Help & Info */}
                    <div>
                        <h2 className="mb-3 text-base font-semibold uppercase text-gray-800 dark:text-white tracking-wider">
                            Help &amp; Info
                        </h2>
                        <ul className="text-gray-600 dark:text-gray-400 text-sm space-y-2">
                            <li>
                                <NavLink to="/contact" className="hover:text-lime-600">
                                    FAQs
                                </NavLink>
                            </li>
                            <li>
                                <NavLink to="/contact" className="hover:text-lime-600">
                                    Terms &amp; Policies
                                </NavLink>
                            </li>
                        </ul>
                    </div>
                </div>

                {/* Bottom Section: Copyright */}
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between border-t border-gray-300 dark:border-gray-700 pt-5">
                    <span className="text-sm text-gray-500 dark:text-gray-400">
                        © 2025{" "}
                        <Link to="/" className="hover:underline hover:text-lime-600">
                            FoodPort
                        </Link>
                        . All rights reserved.
                    </span>
                    <span className="text-sm text-gray-400 mt-2 sm:mt-0">
                        Proudly built by{" "}
                        <a
                            href="https://github.com/imunreal7"
                            className="hover:underline hover:text-lime-600"
                        >
                            Aman Dubey
                        </a>
                    </span>
                </div>
            </div>
        </footer>
    );
};

export default Footer;

