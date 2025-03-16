import React, { useEffect, useState } from "react";
import axios from "axios";
import FastfoodOutlinedIcon from "@mui/icons-material/FastfoodOutlined";
import FoodBankOutlinedIcon from "@mui/icons-material/FoodBankOutlined";
import WhereToVoteOutlinedIcon from "@mui/icons-material/WhereToVoteOutlined";
import RestaurantCard from "./RestaurantCard";
import RestaurantShimmer from "./shimmer/RestaurantShimmer";

const apiUrl = process.env.REACT_APP_API_URL || "http://localhost:5000";

const RestaurantListWithFilters = (props) => {
    const [restaurantsList, setRestaurantsList] = useState([]);
    const [filterRestaurant, setFilterRestaurant] = useState([]);
    const [searchText, setSearchtext] = useState("");

    // Fetch restaurants
    const getRestaurants = async () => {
        try {
            const res = await axios.get(`${apiUrl}/api/restaurants`);
            setRestaurantsList(res.data);
            setFilterRestaurant(res.data);
        } catch (error) {
            console.log(error.message);
        }
    };

    useEffect(() => {
        getRestaurants();
    }, []);

    // Filter logic
    const handleFilter = (filterValue) => {
        if (filterValue === "top") {
            const topRestro = restaurantsList.filter((r) => r.avgRating > 4);
            setFilterRestaurant(topRestro);
        } else if (filterValue === "all") {
            setFilterRestaurant(restaurantsList);
        } else {
            // For example: "sector 15"
            const areaFiltered = restaurantsList.filter((r) =>
                r.areaName.toLowerCase().includes(filterValue.toLowerCase()),
            );
            setFilterRestaurant(areaFiltered);
        }
    };

    // Search logic
    const handleSearch = () => {
        const searchRestro = restaurantsList.filter((r) =>
            r.name.toLowerCase().includes(searchText.toLowerCase()),
        );
        setFilterRestaurant(searchRestro.length > 0 ? searchRestro : []);
    };

    // Loading shimmer
    if (restaurantsList.length === 0) {
        return <RestaurantShimmer />;
    }

    return (
        <>
            {/* Title */}
            <h2 className="text-4xl font-extrabold text-gray-800 mb-8 text-center">
                {props.title}
            </h2>

            {/* Filters + Search Row */}
            <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-6">
                {/* Filter Buttons */}
                <div className="flex space-x-4">
                    {/* All */}
                    <div
                        onClick={() => handleFilter("all")}
                        className="flex items-center gap-1 py-2 px-3 bg-white border border-gray-200
                       rounded-md shadow-sm hover:bg-lime-600 hover:text-white
                       cursor-pointer transition-colors"
                    >
                        <FoodBankOutlinedIcon />
                        <span className="font-semibold">All</span>
                    </div>
                    {/* Top */}
                    <div
                        onClick={() => handleFilter("top")}
                        className="flex items-center gap-1 py-2 px-3 bg-white border border-gray-200
                       rounded-md shadow-sm hover:bg-lime-600 hover:text-white
                       cursor-pointer transition-colors"
                    >
                        <FastfoodOutlinedIcon />
                        <span className="font-semibold">Top</span>
                    </div>
                    {/* Sector 15 */}
                    <div
                        onClick={() => handleFilter("Central Market")}
                        className="flex items-center gap-1 py-2 px-3 bg-white border border-gray-200
                       rounded-md shadow-sm hover:bg-lime-600 hover:text-white
                       cursor-pointer transition-colors"
                    >
                        <WhereToVoteOutlinedIcon />
                        <span className="font-semibold">Central Market</span>
                    </div>
                    <div
                        onClick={() => handleFilter("sector 15")}
                        className="flex items-center gap-1 py-2 px-3 bg-white border border-gray-200
                       rounded-md shadow-sm hover:bg-lime-600 hover:text-white
                       cursor-pointer transition-colors"
                    >
                        <WhereToVoteOutlinedIcon />
                        <span className="font-semibold">Sector 15</span>
                    </div>
                </div>

                {/* Search Bar */}
                <div className="flex gap-2 w-full md:w-auto">
                    <input
                        type="search"
                        name="search"
                        placeholder="Search restaurants..."
                        className="flex-grow border border-gray-300 rounded-md p-2
                       focus:outline-none focus:ring-2 focus:ring-lime-500"
                        value={searchText}
                        onChange={(e) => setSearchtext(e.target.value)}
                    />
                    <button
                        onClick={handleSearch}
                        className="py-2 px-4 bg-lime-600 text-white font-semibold
                       rounded-md hover:bg-lime-700 transition-colors"
                    >
                        Search
                    </button>
                </div>
            </div>

            {/* No Restaurants */}
            {filterRestaurant.length === 0 && (
                <h1 className="text-center text-2xl font-semibold text-gray-500 py-6">
                    No Restaurants Available
                </h1>
            )}

            {/* Restaurant Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                {filterRestaurant.map((item, index) => (
                    <RestaurantCard item={item} key={index} />
                ))}
            </div>
        </>
    );
};

export default RestaurantListWithFilters;

