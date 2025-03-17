import React from "react";
import { Link } from "react-router-dom";
import StarIcon from "@mui/icons-material/Star";

const RESTRO_URL =
    "https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_660/";

const RestaurantCard = ({ item }) => {
    return (
        <div className="relative border border-gray-200 border-opacity-60 bg-white/80 backdrop-blur-sm rounded-xl shadow-lg hover:shadow-2xl overflow-hidden group transition-all duration-300 cursor-pointer">
            {item?.avgRating > 4 && (
                <span className="absolute top-4 right-4 bg-white text-sm font-bold px-3 py-1 rounded-full shadow-md z-20 text-green-600">
                    Top Rated
                </span>
            )}
            <div className="relative overflow-hidden">
                <img
                    src={RESTRO_URL + item?.cloudinaryImageId}
                    alt={item?.name}
                    className="w-full h-64 object-cover transition-transform duration-300 group-hover:scale-105"
                />
            </div>
            <div className="p-5 flex flex-col gap-3">
                <h3 className="text-xl font-semibold text-gray-800 hover:text-lime-600 transition-colors">
                    <Link to={`/restaurant/${item.id}`}>{item?.name}</Link>
                </h3>
                <p className="text-sm text-gray-500">{item?.cuisines.join(", ")}</p>
                <p className="text-sm text-gray-600 font-semibold">
                    {item?.costForTwo},{" "}
                    <span className="text-xs text-gray-400">{item?.areaName}</span>
                </p>
                <div className="flex items-center space-x-3 py-2">
                    <span className="inline-flex items-center gap-1 border border-blue-300 text-blue-600 text-xs font-semibold px-3 py-1 rounded-full">
                        <StarIcon className="text-yellow-400" fontSize="small" />
                        {item?.avgRating}
                    </span>
                    {item?.veg && (
                        <span className="inline-flex items-center gap-1 border border-green-300 text-green-600 text-xs font-semibold px-3 py-1 rounded-full">
                            Veg
                        </span>
                    )}
                </div>
            </div>
        </div>
    );
};

export default RestaurantCard;

