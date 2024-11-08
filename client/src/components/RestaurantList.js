import { useEffect, useState } from "react";
import RestaurantCard from "./RestaurantCard";
import axios from "axios";
import RestaurantShimmer from "./shimmer/RestaurantShimmer";

const RestaurantDisplay = () => {
    const [restaurants, setRestaurants] = useState([]);

    const fetchRestaurants = async () => {
        try {
            const response = await axios.get("http://localhost:5000/api/restaurants");
            setRestaurants(response.data);
        } catch (error) {
            console.error("Failed to fetch restaurants:", error);
        }
    };

    useEffect(() => {
        fetchRestaurants();
    }, []);

    const highlyRatedRestaurants = restaurants.filter((restaurant) => restaurant.avgRating > 4);

    return restaurants.length === 0 ? (
        <RestaurantShimmer />
    ) : (
        <>
            <div className="mx-auto w-full max-w-screen-xl py-14 px-5 lg:px-7 border-y">
                <h2 className="text-3xl font-bold capitalize pb-3">
                    Highly Rated Restaurants Nearby
                </h2>
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 py-5">
                    {highlyRatedRestaurants.slice(0, 6).map((item) => (
                        <RestaurantCard item={item} key={item.id} />
                    ))}
                </div>
            </div>
        </>
    );
};

export default RestaurantDisplay;

