import HeaderHero from "../../images/headerHero.jpeg";
import RestaurantList from "../RestaurantList";
import TopCarousel from "../Carausel";
import FoodItemCarousel from "../FoodItemCarausal";

const Home = () => {
    return (
        <>
            <div className="relative h-128 w-full bg-[#fafac4] flex items-center px-6 lg:px-8">
                <div className="max-w-7xl mx-auto flex items-center justify-between flex-col lg:flex-row">
                    <div>
                        <h1 className="lg:w-6/12 lg:pr-4 capitalize text-4xl lg:text-6xl font-bold leading-snug text-center lg:text-left">
                            The finest
                            <span className="logo-text-second"> Dining Spots </span>
                            Around You!
                        </h1>
                        <p className="lg:w-4/6 py-5 text-lg lg:text-lg text-gray-600 text-center lg:text-left">
                            Embark on a mouth-watering adventure with irresistible offers on beloved
                            dishes and eateries.
                        </p>

                        <p className="text-center lg:text-left text-lg pb-6 capitalize text-green-700 font-semibold">
                            Fuel your body, uplift your mood.
                        </p>
                    </div>
                    <img className="w-2/6" src={HeaderHero} alt="Delivery Service" />
                </div>
            </div>
            <TopCarousel />
            <RestaurantList />
            <div className="mx-auto w-full max-w-screen-xl py-16 px-6 lg:px-8 border-y border-gray-200">
                <FoodItemCarousel title="Popular Dishes" />
            </div>
        </>
    );
};

export default Home;

