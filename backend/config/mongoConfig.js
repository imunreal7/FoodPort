import { connect } from "mongoose";

const isProduction = process.env.NODE_ENV === "production";
const DB_URI = isProduction ? process.env.DB_URI : "mongodb://localhost:27017/foodPort";

export const connectToMongo = () => {
    connect(DB_URI)
        .then(() => console.log("✅ Connected to MongoDB"))
        .catch((error) => {
            console.error("❌ MongoDB connection error:", error);
            process.exit(1);
        });
};

