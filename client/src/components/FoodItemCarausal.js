import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import ProductCard from "./ProductCard";

import axios from "axios";
import { useState, useEffect } from "react";
import RestaurantShimmer from "./shimmer/RestaurantShimmer";

const FoodItemCarousel = ({ title }) => {
    const [menu, setMenu] = useState([]);

    const fetchMenuItems = async () => {
        const response = await axios.get("http://localhost:3001/api/products");
        setMenu(response.data);
    };

    useEffect(() => {
        fetchMenuItems();
    }, []);

    const carouselSettings = {
        superLargeDesktop: {
            breakpoint: { max: 4000, min: 3000 },
            items: 4,
            partialVisibilityGutter: 40,
        },
        desktop: {
            breakpoint: { max: 3000, min: 1024 },
            items: 3,
            partialVisibilityGutter: 40,
        },
        tablet: {
            breakpoint: { max: 1024, min: 464 },
            items: 2,
        },
        mobile: {
            breakpoint: { max: 464, min: 0 },
            items: 1,
        },
    };

    return menu.length === 0 ? (
        <RestaurantShimmer />
    ) : (
        <>
            <h2 className="text-3xl font-bold text-gray-800 pb-4 capitalize">{title}</h2>
            <Carousel
                responsive={carouselSettings}
                autoPlay={true}
                infinite={true}
                removeArrowOnDeviceType={["tablet", "mobile"]}
                className="py-6"
            >
                {menu.map((item, index) => (
                    <div className="px-4" key={index}>
                        <ProductCard item={item} />
                    </div>
                ))}
            </Carousel>
        </>
    );
};

export default FoodItemCarousel;

