import logo from "../logo.png";
import { Link, NavLink } from "react-router-dom";
import FacebookOutlinedIcon from "@mui/icons-material/FacebookOutlined";
import GitHubIcon from "@mui/icons-material/GitHub";
import TwitterIcon from "@mui/icons-material/Twitter";

const Footer = () => {
    return (
        <>
            <footer className="bg-white dark:bg-gray-900 border-t border-gray-300">
                <div className="container mx-auto max-w-screen-xl p-5 py-7 lg:py-9">
                    <div className="flex flex-col md:flex-row justify-between">
                        <div className="mb-6 md:mb-0">
                            <Link to="/" className="flex items-center">
                                <img src={logo} className="h-9 mr-3" alt="FoodPort Logo" />
                                <div className="logo-text">
                                    Food <span className="logo-text-second">Port</span>
                                </div>
                            </Link>
                        </div>
                        <div className="grid grid-cols-2 gap-12 sm:gap-7 sm:grid-cols-3">
                            <div>
                                <h2 className="mb-5 text-sm font-semibold uppercase text-gray-900 dark:text-white">
                                    Explore
                                </h2>
                                <ul className="text-gray-500 dark:text-gray-400 font-medium">
                                    <li className="mb-4">
                                        <NavLink to="/restaurants" className="hover:underline">
                                            Our Restaurants
                                        </NavLink>
                                    </li>
                                    <li className="mb-4">
                                        <NavLink to="/about" className="hover:underline">
                                            About FoodPort
                                        </NavLink>
                                    </li>
                                    <li>
                                        <NavLink to="/contact" className="hover:underline">
                                            Get in Touch
                                        </NavLink>
                                    </li>
                                </ul>
                            </div>
                            <div>
                                <h2 className="mb-5 text-sm font-semibold uppercase text-gray-900 dark:text-white">
                                    Connect
                                </h2>
                                <ul className="text-gray-500 dark:text-gray-400 font-medium">
                                    <li className="mb-4">
                                        <a
                                            href="https://www.linkedin.com/in/amandubey7/"
                                            target="_blank"
                                            className="hover:underline"
                                            rel="noreferrer"
                                        >
                                            LinkedIn
                                        </a>
                                    </li>
                                    <li className="mb-4">
                                        <a
                                            href="https://github.com/imunreal7"
                                            target="_blank"
                                            className="hover:underline"
                                            rel="noreferrer"
                                        >
                                            GitHub
                                        </a>
                                    </li>
                                    <li>
                                        <a
                                            href="https://facebook.com"
                                            target="_blank"
                                            className="hover:underline"
                                            rel="noreferrer"
                                        >
                                            Facebook
                                        </a>
                                    </li>
                                </ul>
                            </div>
                            <div>
                                <h2 className="mb-5 text-sm font-semibold uppercase text-gray-900 dark:text-white">
                                    Information
                                </h2>
                                <ul className="text-gray-500 dark:text-gray-400 font-medium">
                                    <li className="mb-4">
                                        <a href="#" className="hover:underline">
                                            FAQs
                                        </a>
                                    </li>
                                    <li>
                                        <a href="#" className="hover:underline">
                                            Terms &amp; Policies
                                        </a>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    <hr className="my-6 border-gray-300 sm:mx-auto dark:border-gray-700 lg:my-9" />
                    <div className="sm:flex sm:items-center sm:justify-between">
                        <span className="text-sm text-gray-500 sm:text-center dark:text-gray-400">
                            © 2025{" "}
                            <Link to="/" className="hover:underline">
                                FoodPort
                            </Link>
                            . All rights reserved.
                        </span>
                        <div className="flex mt-4 space-x-6 sm:justify-center sm:mt-0">
                            <a
                                href="https://facebook.com"
                                className="text-gray-500 hover:text-blue-500 dark:hover:text-white"
                            >
                                <FacebookOutlinedIcon />
                            </a>
                            <a
                                href="https://twitter.com/"
                                className="text-gray-500 hover:text-cyan-500 dark:hover:text-white"
                            >
                                <TwitterIcon />
                            </a>
                            <a
                                href="https://github.com/imunreal7"
                                className="text-gray-500 hover:text-gray-800 dark:hover:text-white"
                            >
                                <GitHubIcon />
                            </a>
                        </div>
                    </div>
                </div>
            </footer>
        </>
    );
};

export default Footer;

