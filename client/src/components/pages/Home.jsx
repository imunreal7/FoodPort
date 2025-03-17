import React from "react";
import RestaurantList from "../RestaurantList";
import FoodItemCarousel from "../FoodItemCarausal"; // Ensure the spelling matches your file name

const Home = () => {
    return (
        <div className="w-full min-h-screen bg-gradient-to-r from-white to-[#efe5af]">
            <div className="relative h-128 w-full bg-[#e6ffe6] flex items-center px-6 lg:px-8">
                <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center justify-between">
                    <div>
                        <h1 className="lg:w-6/12 lg:pr-4 capitalize text-4xl lg:text-6xl font-bold leading-snug text-center lg:text-left">
                            Favorite{" "}
                            <span className="logo-text-second text-green-700">Restaurants</span> At
                            Your Home
                        </h1>
                        <p className="lg:w-4/6 py-5 text-lg text-gray-600 text-center lg:text-left">
                            Discover curated flavors, exclusive deals, and mouthwatering creations
                            from top restaurants in your city.
                        </p>
                        <p className="text-lg pb-6 capitalize text-green-700 font-semibold text-center lg:text-left">
                            Because every meal should be an adventure!
                        </p>
                    </div>
                    <img className="w-2/6" src="/headerHero.jpeg" alt="Delivery Service" />
                </div>
            </div>
            <div className="mx-auto w-full max-w-screen-xl py-16 px-6 lg:px-8 border-y border-gray-200">
                <FoodItemCarousel title="Popular Dishes" />
            </div>
            <RestaurantList />
        </div>
    );
};

export default Home;

