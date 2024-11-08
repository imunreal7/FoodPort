import CloseIcon from "@mui/icons-material/Close";
import { useDispatch } from "react-redux";
import { removeItem } from "../redux/slices/cartSlice";
import toast from "react-hot-toast";

const CartItem = (props) => {
    const item = props.item;
    const dispatch = useDispatch();

    const handleRemoveItem = (item) => {
        dispatch(removeItem(item));
        toast.success(`${item.name} removed from cart`, {
            duration: 2000,
            position: "top-center",
            style: {
                backgroundColor: "#fffbeb",
                color: "#d84315",
                fontWeight: 500,
                borderRadius: "8px",
                boxShadow: "0 4px 8px rgba(0, 0, 0, 0.15)",
            },
        });
    };

    return (
        <div className="flex flex-col lg:flex-row justify-between items-center p-4 rounded-xl shadow-lg bg-gradient-to-br from-white to-gray-50 hover:shadow-2xl border border-gray-100 transition-shadow duration-200 ease-in-out">
            <div className="flex gap-4 w-full lg:w-3/4 items-start">
                <img className="rounded-md" src={item?.image} alt={item?.name} width="100px" />
                <div className="flex flex-col justify-between">
                    <h2 className="text-lg font-semibold text-gray-800 hover:text-lime-700 transition-colors duration-150">
                        {item?.name}
                    </h2>
                    <p className="text-sm text-gray-600 mt-1">{item?.description}</p>
                </div>
            </div>
            <div className="flex pt-4 lg:pt-0 justify-between lg:justify-around w-full lg:w-1/4 gap-4 text-center">
                <span className="text-lg font-semibold text-gray-700">₹{item?.price}</span>
                <span className="text-lg font-semibold text-gray-700">{item?.quantity}</span>
                <span className="text-lg font-semibold text-gray-700">
                    ₹{item?.price * item?.quantity}
                </span>
                <button
                    onClick={() => handleRemoveItem(item)}
                    className="flex items-center text-lg font-semibold text-red-500 hover:text-red-700 transition-colors duration-150"
                >
                    Remove <CloseIcon fontSize="small" className="ml-1" />
                </button>
            </div>
        </div>
    );
};

export default CartItem;

