# Stock Trading Management System

This project provides a frontend and backend application to manage stock trading. The backend uses **Node.js**, **Express**, **Sequelize**, and **MySQL** to interact with a stock trading API and record transactions, while the frontend is built with **Vue.js**.

## Table of Contents
- [Features](#features)
- [Technologies](#technologies)
- [Setup Instructions](#setup-instructions)
- [Backend Setup](#backend-setup)
- [Frontend Setup](#frontend-setup)
- [API Documentation](#api-documentation)
- [Usage](#usage)
- [Logging and Monitoring](#logging-and-monitoring)
- [Contributing](#contributing)
- [License](#license)
- [Contact](#contact)

---

## Features

- **Real-time Stock Data**: Retrieve live data on stock instruments from YH Finance API.
- **Buy & Sell Transactions**: Record buy/sell transactions.
- **Portfolio Tracking**: View portfolio value and performance.
- **Transaction History**: Detailed record of transaction history.
- **API Documentation**: Swagger documentation for backend endpoints.

## Technologies

- **Backend**: Node.js, Express, Sequelize, MySQL, Swagger, Winston (for logging)
- **Frontend**: Vue.js, Vuetify, Pinia Axios

---

## Setup Instructions

### Prerequisites

- Node.js (v14 or above)
- PostgreSQL
- Vue CLI (for frontend setup)
- Git

---

## Backend Setup

1. **Clone the Repository**

    ```bash
    git clone https://github.com/Arslan038/stock-trading-management.git
    cd stock-trading-management/backend
    ```

2. **Install Dependencies**

    ```bash
    npm install
    ```

3. **Configure Environment Variables**

    Create a `.env` file in the `backend` directory with the following variables:

    ```bash
    YH_BASE_URL=finance-api-base-url
    YH_API_KEY=finance-api-key
    ```

4. **Database Setup**

    - **Initialize MySQL**: Ensure MySQL is running on your system locally.

5. **Run the Server**

    Start the server with:

    ```bash
    npm run dev
    ```

    By default, the server runs on `http://localhost:3800`.

6. **API Documentation**

    - Swagger documentation is available at `http://localhost:3800/api-docs`.

---

## Frontend Setup

1. **Navigate to the Frontend Directory**

    ```bash
    cd ../front
    ```

2. **Install Dependencies**

    ```bash
    npm install
    ```

3. **Configure Environment Variables**

    Create a `.env` file in the `frontend` directory with the following variables:

    ```bash
    VUE_APP_API_URL=http://localhost:3800  # Backend API URL
    ```

4. **Run the Development Server**

    Start the Vue.js development server with:

    ```bash
    npm run serve
    ```

    By default, the frontend runs on `http://localhost:3000`.

---

## API Documentation

The backend API is documented using **Swagger**. You can view the API docs at:

