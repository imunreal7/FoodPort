# FoodPort - Next Generation Food Delivery Platform

**FoodPort** is a state-of-the-art online food delivery platform designed using a robust microservices architecture and advanced **AI Recommendation Service**. This project demonstrates deep full‑stack engineering expertise—from scalable backend services and microservices to a dynamic, responsive React frontend. It is built to deliver a seamless user experience while leveraging cutting‑edge AI recommendation systems to personalize food suggestions.

---

## Table of Contents

-   [Demo](#demo)
-   [Key Features](#key-features)
-   [Architecture & Technologies](#architecture--technologies)
-   [AI Recommendation Service](#ai-recommendation-service)
-   [Microservices & Scalability](#microservices--scalability)
-   [Installation & Setup](#installation--setup)
-   [Usage](#usage)
-   [Demo](#demo)
-   [Project Structure](#project-structure)
-   [Future Enhancements](#future-enhancements)
-   [Contributing](#contributing)
-   [License](#license)
-   [Author](#author)

---

## Demo

Watch our demo video to see FoodPort in action:

[![Demo Video](client/public/youtube-thumbnail.png)](https://youtu.be/s2aFIs4AMcU)

_Click the image above to watch the demo video._

---

## Key Features

-   **AI-Driven Personalized Recommendations**: Tailored food suggestions based on user preferences, dietary restrictions, and order history.
-   **End-to-End Microservices Architecture**: Scalable services handling authentication, ordering, and AI recommendations.
-   **Modern UI/UX**: A sleek, intuitive front-end built with React, Redux, and Tailwind CSS.
-   **Secure & Optimized Backend**: Robust Express.js and MongoDB stack with authentication, rate limiting, and best security practices.
-   **Cloud Deployment**: Hosted on Vercel (frontend), Render/Railway (backend & AI service), and MongoDB Atlas (database).

---

## Architecture & Technologies

### Backend

-   **Node.js & Express.js**: Build a robust RESTful API for handling orders, user management, and more.
-   **MongoDB & Mongoose**: A flexible NoSQL database that supports rapid prototyping and scalable data storage.
-   **Redis & Express-Session**: Efficient session management and caching mechanisms.
-   **FastAPI (Python)**: High-performance API for our AI Recommendation Service.
-   **TensorFlow & FAISS**: Advanced machine learning and similarity search frameworks for real‑time personalized recommendations.
-   **Microservices Architecture**: Deployed as independent, containerized microservices ensuring high scalability and maintainability.

### Frontend

-   **React & Redux Toolkit**: Modern, component-based UI with centralized state management.
-   **React Router**: Seamless navigation between various application views.
-   **Tailwind CSS & MUI**: Utility‑first styling for a modern, responsive design.
-   **Axios & React Hot Toast**: Efficient HTTP requests and user-friendly notifications.

---

## AI Recommendation Service

The **AI Recommendation Service** is the heart of FoodPort’s personalization. It uses advanced deep learning models (TensorFlow) and FAISS for high‑performance similarity search, enabling the following:

-   **Dynamic Embedding Generation**: Utilize a trained deep learning model to generate product embeddings.
-   **Efficient Similarity Search**: Leverage FAISS to quickly retrieve relevant products from a vast dataset.
-   **Personalized Filtering**: Filters recommendations based on user-specific dietary preferences and preferred cuisine.
-   **Scalable Microservice**: Built with FastAPI, designed for low latency and high concurrency, making it perfect for deployment in cloud environments and Kubernetes clusters.

---

## Microservices & Scalability

-   **Independent Deployment**: Each service (backend APIs, AI recommendation service) can be developed, deployed, and scaled independently.
-   **Containerization**: Leverage Docker (and Kubernetes) to ensure consistent deployment across environments.
-   **CI/CD Pipeline**: Automated testing, linting, and continuous deployment ensure rapid and reliable releases.
-   **Monitoring & Logging**: Robust error handling, logging (PM2, centralized logging), and performance monitoring are integrated to maintain system resilience.

---

---

## Screenshot

Home
![Home Page](./client/public/demo-thumbnail2.png)

Personalized AI Recommedation
![Personalized AI Recommedation](./client/public/AI-recommendation.png)

Restaurants
![Restaurants](./client/public/restaurants.png)

Cart
![Cart](./client/public/cart.png)

---

## Installation & Setup

### Prerequisites

-   Node.js (v14+)
-   Python (3.8+)
-   MongoDB
-   Redis
-   Docker (optional, for containerized deployment)

### Backend Setup

1. **Clone the repository:**

    ```bash
    git clone https://github.com/imunreal7/FoodPort.git
    cd FoodPort/backend
    ```

2. **Install dependencies:**

    ```bash
    npm install
    ```

3. **Configure Environment Variables:**

    Create a `.env` file with variables such as:

    ```
    # Database Configuration
    DB_URI=your_database_uri

    # JWT Authentication
    JWT_SECRET=your_jwt_secret
    JWT_EXPIRES_IN=7d  # Token expiry duration

    # Server Configuration
    PORT=5000
    # NODE_ENV=production  # Uncomment for production mode

    # API Rate Limiting
    RATE_LIMIT_MAX=100  # Maximum requests allowed per 15 minutes
    RATE_LIMIT_WINDOW=15m

    # External API URLs
    RECOMMENDATION_SERVICE_URL=your_recommendation_service_url

    # Redis Configuration
    REDIS_HOST=127.0.0.1
    REDIS_PORT=6379
    REDIS_TTL=3600  # Cache expiration time in seconds (1 hour)
    SESSION_SECRET=your_session_secret

    ```

4. **Start the Backend Server:**

    ```bash
    npm start
    ```
    for dev:
   ```bash
    npm run dev
    ```

### AI Recommendation Service Setup

1. **Navigate to the recommendation service folder:**

    ```bash
    cd ../recommendation_service
    ```

2. **Install Python dependencies:**

    ```bash
    pip install -r requirements.txt
    ```

3. **Ensure model and index files are in place, then run:**

    ```bash
    uvicorn main:app --host 0.0.0.0 --port 8000
    ```

### Frontend Setup

1. **Navigate to the client directory:**

    ```bash
    cd ../client
    ```

2. **Install dependencies:**

    ```bash
    npm install
    ```

3. **Start the Frontend Application:**

    ```bash
    npm start
    ```

---

## Usage

-   **Restaurant & Menu Exploration:** Browse highly rated restaurants and detailed menus.
-   **Personalized Recommendations:** Leverage the AI-powered recommendation engine for curated food suggestions.
-   **Easy Order Placement:** Add items to your cart, proceed to checkout, and track orders seamlessly.
-   **User Profile Management:** Update personal information, dietary preferences, and more.

---

## Future Enhancements

-   **Advanced Analytics:** Incorporate user behavior tracking and advanced analytics to refine AI recommendations further.
-   **Enhanced Security:** Integrate multi-factor authentication and secure payment gateways.
-   **Jest Unit Test Cases:** Implement Jest unit tests with 80%+ code coverage, which helps us reduce bug occurrence.
-   **Global Support:** Implement internationalization (i18n) and multi-language support.
-   **Progressive Web App (PWA):** Enable offline support and improved mobile performance with PWA features.

---

## Contributing

Contributions, improvements, and bug fixes are welcome! Please fork the repository and open a pull request with your proposed changes.

---

## License

This project is licensed under the ISC License.

---

## Author

**Aman Dubey**
Senior Software Engineer | Full-Stack Developer | AI Enthusiast
[GitHub](https://github.com/imunreal7) | [LinkedIn](https://www.linkedin.com/in/amandubey7/)

---

_Thank you for checking out FoodPort – a showcase of cutting-edge microservices, AI, and full-stack development expertise._

