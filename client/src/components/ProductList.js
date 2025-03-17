import React, { useEffect, useState } from "react";
import ProductCard from "./ProductCard";
import axios from "axios";
import RestaurantShimmer from "./shimmer/RestaurantShimmer";

const apiUrl = process.env.REACT_APP_API_URL || "http://localhost:5000";

const ProductList = ({ id }) => {
    const [menu, setMenu] = useState([]);
    const [filterMenu, setFilterMenu] = useState([]);
    const [searchText, setSearchText] = useState("");
    const [loading, setLoading] = useState(true);

    const getProducts = async () => {
        try {
            setLoading(true);
            const res = await axios.get(`${apiUrl}/api/restaurant/${id}`);
            setMenu(res.data);
            setFilterMenu(res.data);
        } catch (error) {
            console.error("Error fetching products:", error.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        getProducts();
    }, [id]);

    const handleSearch = () => {
        const searchMenu = menu.filter((product) =>
            product.name.toLowerCase().includes(searchText.toLowerCase()),
        );
        setFilterMenu(searchMenu);
    };

    if (loading) {
        return <RestaurantShimmer />;
    }

    return (
        <div className="py-16 border-t">
            <h2 className="text-3xl font-semibold capitalize pb-3">Top menu for you</h2>
            <div className="grid grid-cols-4 lg:grid-cols-10 py-3">
                <div className="col-start-1 lg:col-start-6 col-span-7 flex gap-3 pt-6 lg:pt-0">
                    <input
                        type="search"
                        name="search"
                        className="p-2 border rounded w-full"
                        value={searchText}
                        onChange={(e) => setSearchText(e.target.value)}
                    />
                    <button
                        onClick={handleSearch}
                        className="py-2 px-4 border border-lime-600 text-lime-600 hover:bg-lime-600 hover:text-white rounded-md"
                    >
                        Search
                    </button>
                </div>
            </div>
            {filterMenu.length === 0 ? (
                <h1 className="text-center text-3xl font-semibold capitalize pb-3 text-slate-500 py-6">
                    No menu Available
                </h1>
            ) : (
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 py-6">
                    {filterMenu.map((item) => (
                        <ProductCard item={item} key={item.id || item._id} />
                    ))}
                </div>
            )}
        </div>
    );
};

export default ProductList;

