import RestroCarausel from "../RestroCarausel";
import offer2 from "../../images/hero-thumb.png";
import RestaurantListWithFilters from "../RestaurantListWithFilters";

const Restaurant = () => {
    return (
        <>
            <div className="mx-auto w-full max-w-screen-xl py-16 px-6 lg:px-8 border-b">
                <RestaurantListWithFilters title="Restaurants with online food delivery" />
            </div>
        </>
    );
};

export default Restaurant;

