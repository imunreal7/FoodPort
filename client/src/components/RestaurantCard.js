import { RESTRO_URL } from "../utils/constants";
import { Link } from "react-router-dom";
import StarIcon from "@mui/icons-material/Star";

const RestaurantCard = ({ item }) => {
    const data = item;

    return (
        <div className="rounded-lg shadow-lg hover:shadow-xl cursor-pointer overflow-hidden group relative transition-all duration-300">
            {data?.avgRating > 4 && (
                <span className="absolute top-4 right-4 bg-white text-xl font-semibold px-4 py-1 rounded-full shadow-md z-20">
                    Top Rated
                </span>
            )}
            <img
                src={RESTRO_URL + data?.cloudinaryImageId}
                alt={data?.name}
                className="w-full h-80 rounded-t-lg transition-transform group-hover:scale-105 group-hover:translate-y-2 duration-300"
            />
            <div className="p-5 flex flex-col gap-3">
                <div className="text-xl font-semibold hover:text-lime-600">
                    <Link to={`/restaurant/${data.id}`}>{data?.name}</Link>
                </div>
                <div className="text-sm text-gray-500 font-normal">{data?.cuisines.join(", ")}</div>
                <div className="text-sm text-gray-600 font-semibold">
                    {data?.costForTwo},{" "}
                    <span className="text-xs text-gray-400">{data?.areaName}</span>
                </div>
                <div className="flex items-center py-3 space-x-3">
                    <span className="border border-blue-300 text-blue-600 text-xs font-semibold px-3 py-1 rounded-full flex items-center">
                        <StarIcon className="text-yellow-400 text-xs" /> {data?.avgRating}
                    </span>
                    {data?.veg && (
                        <span className="border border-green-300 text-green-600 text-xs font-semibold px-3 py-1 rounded-full flex items-center">
                            Veg
                        </span>
                    )}
                </div>
            </div>
        </div>
    );
};

export default RestaurantCard;

