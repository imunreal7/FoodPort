import React from "react";

const BenefitCard = ({ icon, title, desc }) => {
    return (
        <div className="p-6 shadow-[rgba(7,_65,_210,_0.1)_0px_9px_30px] rounded-2xl cursor-pointer hover:bg-gradient-to-t from-lime-200 via-lime-400 group">
            <span className="group-hover:text-white">{icon}</span>
            <h2 className="capitalize text-4xl font-extrabold text-center lg:text-left py-5 pr-10 group-hover:text-white">
                {title}
            </h2>
            <p className="pb-5 text-lg group-hover:text-white">{desc}</p>
        </div>
    );
};

export default BenefitCard;

