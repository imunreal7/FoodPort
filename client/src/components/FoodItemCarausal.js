import React, { useState, useEffect } from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import axios from "axios";
import ProductCard from "./ProductCard";
import RestaurantShimmer from "./shimmer/RestaurantShimmer";

const FoodItemCarousel = ({ title }) => {
    const [menu, setMenu] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Use environment variable for API URL; fallback to localhost
    const apiUrl = process.env.REACT_APP_API_URL || "http://localhost:5000";

    useEffect(() => {
        let isMounted = true;
        const fetchMenuItems = async () => {
            try {
                setLoading(true);
                const response = await axios.get(`${apiUrl}/api/products`);
                if (isMounted) {
                    setMenu(response.data);
                    setError(null);
                }
            } catch (err) {
                if (isMounted) {
                    setError("Failed to fetch products. Please try again later.");
                }
            } finally {
                if (isMounted) {
                    setLoading(false);
                }
            }
        };
        fetchMenuItems();
        return () => {
            isMounted = false;
        };
    }, [apiUrl]);

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

    if (loading) {
        return <RestaurantShimmer />;
    }

    if (error) {
        return (
            <div className="py-8 text-center">
                <p className="text-red-500">{error}</p>
            </div>
        );
    }

    return (
        <>
            <h2 className="text-3xl font-bold text-gray-800 pb-4 capitalize">{title}</h2>
            <Carousel
                responsive={carouselSettings}
                autoPlay={true}
                infinite={true}
                removeArrowOnDeviceType={["tablet", "mobile"]}
                className="py-6"
            >
                {menu.map((item) => (
                    <div className="px-4" key={item.id || item._id}>
                        <ProductCard item={item} />
                    </div>
                ))}
            </Carousel>
        </>
    );
};

export default FoodItemCarousel;

