import PageHeader from "./PageHeader";
import Benefits from "../Benefits";

const About = () => {
    return (
        <>
            <PageHeader
                title="About us"
                style={{ fontSize: "1.5rem", fontFamily: "Arial, sans-serif" }}
            />
            <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
                <p
                    style={{
                        padding: "1.25rem",
                        fontSize: "1rem",
                        color: "#64748b",
                        textAlign: "justify",
                        textAlignLast: "center",
                        paddingLeft: "1rem",
                        paddingRight: "1rem",
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

