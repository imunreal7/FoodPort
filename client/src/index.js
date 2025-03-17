// index.js
import React, { Suspense } from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Provider } from "react-redux";
import appStore from "./redux/appStore";

// Lazy load page components
const Home = React.lazy(() => import("./components/pages/Home"));
const About = React.lazy(() => import("./components/pages/About"));
const Contact = React.lazy(() => import("./components/pages/Contact"));
const Restaurant = React.lazy(() => import("./components/pages/Restaurant"));
const Signin = React.lazy(() => import("./components/pages/Signin"));
const Signup = React.lazy(() => import("./components/pages/Signup"));
const SingleRestaurant = React.lazy(() => import("./components/pages/SingleRestaurant"));
const Cart = React.lazy(() => import("./components/pages/Cart"));
const PersonalisedRecommendation = React.lazy(() =>
    import("./components/pages/PersonalisedRecommendation"),
);
const Profile = React.lazy(() => import("./components/pages/Profile"));
const Checkout = React.lazy(() => import("./components/pages/Checkout"));
const OrderSuccess = React.lazy(() => import("./components/pages/OrderSuccess"));
const OrderHistory = React.lazy(() => import("./components/pages/OrderHistory"));
const OrderDetail = React.lazy(() => import("./components/pages/OrderDetail"));
const ErrorPage = React.lazy(() => import("./components/pages/Error"));

const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        children: [
            { path: "/", element: <Home /> },
            { path: "/about", element: <About /> },
            { path: "/contact", element: <Contact /> },
            { path: "/restaurants", element: <Restaurant /> },
            { path: "/sign-in", element: <Signin /> },
            { path: "/sign-up", element: <Signup /> },
            { path: "/restaurant/:id", element: <SingleRestaurant /> },
            { path: "/cart", element: <Cart /> },
            {
                path: "/personalised-recommendation",
                element: <PersonalisedRecommendation />,
            },
            { path: "/profile", element: <Profile /> },
            { path: "/checkout", element: <Checkout /> },
            { path: "/order-success", element: <OrderSuccess /> },
            { path: "/orders-history", element: <OrderHistory /> },
            { path: "/order/:orderId", element: <OrderDetail /> },
        ],
        errorElement: <ErrorPage />,
    },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
    <Provider store={appStore}>
        <Suspense fallback={<div>Loading...</div>}>
            <RouterProvider router={router} />
        </Suspense>
    </Provider>,
);

