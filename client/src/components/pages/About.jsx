import React from "react";
import PageHeader from "./PageHeader";
import Benefits from "../Benefits";

const About = () => {
    return (
        <>
            <PageHeader title="About us" />
            <div
                className="mx-auto w-full max-w-screen-xl py-16 px-6 lg:px-8 border-b"
                style={{ maxWidth: "1200px" }}
            >
                <p
                    className="px-4 py-5 text-base text-gray-600 text-justify text-center-last"
                    style={{
                        fontSize: "1rem",
                        color: "#6c757d",
                    }}
                >
                    At FoodPort, we create innovative products and solutions that bring unmatched
                    convenience to city life. The best part? Every task you undertake here
                    contributes to enhancing the lives of our users across India.
                </p>
                <Benefits />
            </div>
        </>
    );
};

export default About;

