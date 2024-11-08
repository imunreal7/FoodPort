import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import product1 from "../images/product1.avif";
import data from "../utils/mockData";
import { IMAGE_URL } from "../utils/constants";

const FeaturedCarousel = () => {
    const responsive = {
        superLargeDesktop: {
            breakpoint: { max: 4000, min: 3000 },
            items: 8,
        },
        desktop: {
            breakpoint: { max: 3000, min: 1024 },
            items: 6,
        },
        tablet: {
            breakpoint: { max: 1024, min: 464 },
            items: 3,
        },
        mobile: {
            breakpoint: { max: 464, min: 0 },
            items: 2,
        },
    };

    return (
        <>
            <div className="mx-auto w-full max-w-screen-lg py-14 px-5 lg:px-7">
                <h2 className="text-3xl font-bold capitalize">Top Picks Just for You</h2>
                <Carousel
                    responsive={responsive}
                    autoPlay={true}
                    infinite={true}
                    removeArrowOnDeviceType={["tablet", "mobile"]}
                    className="pt-7 lg:pt-9"
                >
                    {data.map((item) => (
                        <div className="w-36 lg:w-44 cursor-pointer" key={item.id}>
                            <img
                                className="rounded-lg"
                                src={`${IMAGE_URL}${item.imageId}`}
                                alt={product1}
                            />
                        </div>
                    ))}
                </Carousel>
            </div>
        </>
    );
};

export default FeaturedCarousel;

