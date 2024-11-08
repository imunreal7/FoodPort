
```markdown
# FoodPort

FoodPort is an online food delivery web application that allows users to explore a variety of restaurants, browse menus, and place orders conveniently. The project is built with the MERN stack (MongoDB, Express, React, and Node.js) and styled with Tailwind CSS.

## Project Structure

The project is divided into two main directories:

-   **Backend**: Contains the server-side code, API routes, and database models.
-   **Frontend (Client)**: Contains the React frontend application that interacts with the backend.

### Folder Structure
```

FoodPort/
├── backend/
│ ├── controllers/
│ │ ├── productController.js
│ │ └── restaurantController.js
│ ├── routes/
│ │ ├── productRoutes.js
│ │ └── restaurantRoutes.js
│ ├── .env
│ ├── index.js
│ ├── package.json
│ └── package-lock.json
├── client/
│ ├── src/
│ │ ├── components/
│ │ ├── images/
│ │ ├── redux/
│ │ ├── utils/
│ │ ├── App.js
│ │ ├── index.js
│ │ └── logo.png
│ ├── public/
│ ├── package.json
│ └── README.md
└── README.md

````

## Technologies Used

### Backend
- **Node.js**: Server runtime
- **Express.js**: Backend framework for building RESTful APIs
- **MongoDB**: NoSQL database for storing data
- **Mongoose**: ODM for MongoDB
- **dotenv**: Environment variable management
- **cors**: Middleware for handling Cross-Origin Resource Sharing

### Frontend
- **React**: JavaScript library for building user interfaces
- **React Router**: For routing between different pages
- **Redux Toolkit**: State management for handling global application state
- **MUI (Material-UI)**: UI component library
- **Axios**: For making HTTP requests
- **Tailwind CSS**: Utility-first CSS framework for styling

## Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/imunreal7/FoodPort.git
   cd FoodPort
````

2. **Install backend dependencies:**

    ```bash
    cd backend
    npm install
    ```

3. **Set up environment variables:**

    - Create a `.env` file in the `backend` folder with the following variables:
        ```
        JWT_SECRET_KEY=your_jwt_secret
        MONGODB_URI=your_mongodb_connection_string
        ```

4. **Install frontend dependencies:**
    ```bash
    cd ../client
    npm install
    ```

## Usage

### Running the Backend

1. Start the backend server:
    ```bash
    cd backend
    npm start
    ```
2. The server will run on `http://localhost:5000`.

### Running the Frontend

1. Start the frontend application:
    ```bash
    cd client
    npm start
    ```
2. The application will run on `http://localhost:3000`.

## Features

-   **Restaurant and Product Listings**: Explore various restaurants and their menu items.
-   **Responsive Design**: Optimized for both mobile and desktop views.
-   **State Management with Redux**: Manage application state efficiently.
-   **Styled with Tailwind CSS**: Clean and modern UI.

## Future Enhancements

-   **User Authentication**: Implement user signup and login functionality.
-   **Order Management**: Allow users to place and track orders.
-   **Payment Integration**: Integrate secure payment options for easy transactions.
-   **Reviews and Ratings**: Enable users to rate and review restaurants.

## License

This project is licensed under the ISC License.

## Author

Developed by Aman Dubey.
