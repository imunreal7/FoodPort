import React from "react";
import BenefitCard from "./BenefitCard";
import FastfoodOutlinedIcon from "@mui/icons-material/FastfoodOutlined";
import WatchLaterOutlinedIcon from "@mui/icons-material/WatchLaterOutlined";
import SellOutlinedIcon from "@mui/icons-material/SellOutlined";
import SoupKitchenOutlinedIcon from "@mui/icons-material/SoupKitchenOutlined";

const Benefits = () => {
    return (
        <div className="grid lg:grid-cols-4 py-8 gap-8 lg:py-10 px-4">
            <BenefitCard
                icon={<SoupKitchenOutlinedIcon sx={{ fontSize: 60 }} color="success" />}
                title="Best quality"
                desc="We source only the freshest and highest quality ingredients to ensure your meals are of the highest quality."
            />
            <BenefitCard
                icon={<WatchLaterOutlinedIcon sx={{ fontSize: 60 }} color="success" />}
                title="Fast delivery"
                desc="Enjoy effortless and timely delivery with no added costs—making delicious meals even more accessible."
            />
            <BenefitCard
                icon={<FastfoodOutlinedIcon sx={{ fontSize: 60 }} color="success" />}
                title="Saved your time"
                desc="We prioritize quick service to save you time, so you can focus on what matters most."
            />
            <BenefitCard
                icon={<SellOutlinedIcon sx={{ fontSize: 60 }} color="success" />}
                title="Big discount"
                desc="Benefit from frequent discounts to make your favorite meals more affordable."
            />
        </div>
    );
};

export default Benefits;

