import { useDispatch } from "react-redux";
import { additem } from "../redux/slices/cartSlice";
import StarIcon from "@mui/icons-material/Star";
import toast from "react-hot-toast";

const ProductCard = ({ item }) => {
    const dispatch = useDispatch();

    const handleAddToCart = (item) => {
        // Dispatch an action
        dispatch(additem(item));
        toast.success(`${item.name} added to cart`, {
            duration: 2000,
            position: "top-center",
            // Styling
            style: {
                backgroundColor: "#7BFFC2",
                color: "green",
                fontWeight: 600,
            },
        });
    };

    return (
        <div className="rounded-lg shadow-lg hover:shadow-xl cursor-pointer overflow-hidden group dark:bg-gray-800 dark:border-gray-700 transition duration-300">
            <a href="#">
                <img
                    className="h-64 w-full rounded-t-lg transition-transform ease-in-out group-hover:scale-105 group-hover:-translate-y-1 duration-300"
                    src={item.image}
                    alt="product"
                />
            </a>
            <div className="p-5">
                <h5 className="text-xl font-semibold text-gray-800 dark:text-white">{item.name}</h5>
                <p className="text-sm text-gray-500 font-normal mt-2">{item.description}</p>
                <div className="flex py-3 space-x-3">
                    <span className="border border-blue-200 text-blue-600 text-xs font-semibold px-3 py-0.5 rounded-full flex items-center">
                        <StarIcon className="text-yellow-400 text-xs" /> {item.rating}
                    </span>
                    <span
                        className={`${
                            item.isVeg
                                ? "border-green-200 text-green-600 dark:bg-green-200 dark:text-green-800"
                                : "border-red-200 text-red-400 dark:bg-red-200 dark:text-red-800"
                        } text-xs font-semibold px-3 py-0.5 rounded-full flex items-center border`}
                    >
                        {item.isVeg ? "Veg" : "Non Veg"}
                    </span>
                </div>

                <div className="flex items-center justify-between">
                    <span className="text-3xl font-semibold text-gray-900 dark:text-white">
                        ₹{item.price}
                    </span>
                    <button
                        className="py-2 px-4 border border-lime-600 text-lime-600 hover:bg-lime-600 hover:text-white rounded-md transition duration-300"
                        onClick={() => handleAddToCart(item)}
                    >
                        Add to cart
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ProductCard;
