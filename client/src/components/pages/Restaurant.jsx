import React from "react";
import RestaurantListWithFilters from "../RestaurantListWithFilters";

const Restaurant = () => {
    return (
        <div className="min-h-screen bg-gradient-to-br from-lime-50 via-lime-100 to-white">
            <div className="max-w-screen-xl mx-auto py-16 px-6 lg:px-8">
                <RestaurantListWithFilters title="Restaurants with online food delivery" />
            </div>
        </div>
    );
};

export default Restaurant;

