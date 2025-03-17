import React from "react";

const Error = () => {
    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-4">
            <h1 className="text-4xl font-bold text-gray-800">Oops! Something went wrong.</h1>
            <p className="mt-4 text-lg text-gray-600">Please try again later.</p>
        </div>
    );
};

export default Error;

