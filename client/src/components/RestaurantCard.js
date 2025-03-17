import { Link } from "react-router-dom";
import StarIcon from "@mui/icons-material/Star";

const RESTRO_URL =
    "https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_660/";

const RestaurantCard = ({ item }) => {
    const data = item;

    return (
        <div
            className="relative border border-gray-200 border-opacity-60 bg-white/80 backdrop-blur-sm
                 rounded-xl shadow-lg hover:shadow-2xl overflow-hidden
                 group transition-all duration-300 cursor-pointer"
        >
            {/* Top Rated Badge */}
            {data?.avgRating > 4 && (
                <span className="absolute top-4 right-4 bg-white text-sm font-bold px-3 py-1 rounded-full shadow-md z-20 text-green-600">
                    Top Rated
                </span>
            )}

            {/* Image with Hover Scale */}
            <div className="relative overflow-hidden">
                <img
                    src={RESTRO_URL + data?.cloudinaryImageId}
                    alt={data?.name}
                    className="w-full h-64 object-cover transition-transform duration-300
                     group-hover:scale-105"
                />
            </div>

            {/* Card Details */}
            <div className="p-5 flex flex-col gap-3">
                {/* Name / Link */}
                <h3 className="text-xl font-semibold text-gray-800 hover:text-lime-600 transition-colors">
                    <Link to={`/restaurant/${data.id}`}>{data?.name}</Link>
                </h3>

                {/* Cuisines */}
                <p className="text-sm text-gray-500">{data?.cuisines.join(", ")}</p>

                {/* Cost & Area */}
                <p className="text-sm text-gray-600 font-semibold">
                    {data?.costForTwo},{" "}
                    <span className="text-xs text-gray-400">{data?.areaName}</span>
                </p>

                {/* Rating & Veg Label */}
                <div className="flex items-center space-x-3 py-2">
                    <span
                        className="inline-flex items-center gap-1 border border-blue-300
                           text-blue-600 text-xs font-semibold px-3 py-1 rounded-full"
                    >
                        <StarIcon className="text-yellow-400" fontSize="small" />
                        {data?.avgRating}
                    </span>

                    {data?.veg && (
                        <span
                            className="inline-flex items-center gap-1 border border-green-300
                             text-green-600 text-xs font-semibold px-3 py-1
                             rounded-full"
                        >
                            Veg
                        </span>
                    )}
                </div>
            </div>
        </div>
    );
};

export default RestaurantCard;

