# Car Management API

A simple Node.js Express API for managing car records with MySQL. Supports CRUD operations with soft delete functionality.

## Features

- **GET** `/api/cars`: Fetch all cars where `deleted_flag` is `0`.
- **PUT** `/api/cars/:id`: Update a specific car by ID.
- **DELETE** `/api/cars/:id`: Soft-delete a car by setting `deleted_flag` to `1`.
- Environment variable configuration (`.env` file).
- Organized code structure with separate routes, controllers, and middleware.
- Auto-restart development server using `nodemon`.

## Technologies Used

- **Backend**: Node.js, Express.js
- **Database**: MySQL
- **Libraries**: `mysql2`, `dotenv`, `cors`, `body-parser`
- **Tools**: MySQL Workbench, Insomnia/Postman

## Prerequisites

- Node.js and npm installed
- MySQL Server
- MySQL Workbench (or another MySQL client)
- API testing tool (e.g., Insomnia, Postman)

---

## Installation

1. **Clone the repository**:
   ```bash
   git clone https://github.com/your-username/car-api.git
   cd car-api
2. **Install_NPM_Packages**:
   ```bash
   npm i
3. **Setup MySQL DB**:
   ```bash
    CREATE DATABASE car_api_db;
    USE car_api_db;
    CREATE TABLE car (
      id INT(10) PRIMARY KEY AUTO_INCREMENT,
      make VARCHAR(45) NOT NULL,
      model VARCHAR(45) NOT NULL,
      year INT(4) NOT NULL,
      deleted_flag TINYINT(1) DEFAULT 0
    );
4. **Set Up .env file**:
   ```bash
    PORT=3000
    DB_HOST=localhost
    DB_USER=root
    DB_PASSWORD=your_mysql_password
    DB_DATABASE=car_api_db
5. **Start Server**:
   ```bash
   npm run dev  # Uses nodemon for auto-restart during development

# API Endpoints Documentation

This document provides detailed information about the available API endpoints for the Car Management API.

---

## Base URL
All endpoints are relative to the base URL: http://localhost:3000/api

## 1. Fetch All Active Cars
Fetch all cars where the `deleted_flag` is `0`.

- **Method**: `GET`
- **URL**: `/cars`
- **Response**:
  ```json
  [
    {
      "id": 1,
      "make": "Toyota",
      "model": "Corolla",
      "year": 2020,
      "deleted_flag": 0
    },
    {
      "id": 2,
      "make": "Honda",
      "model": "Civic",
      "year": 2019,
      "deleted_flag": 0
    }
  ]

## 2. Update a Car
Update the details of a specific car by its ID.

- **Method**: `PUT`
- **URL**: `/cars/:id`
- **Body**:
  ```json
  {
  "make": "Honda",
  "model": "Civic",
  "year": 2022
  }
- **Response**:
  ```json
  { "message": "Car updated successfully" }

## 3. Soft-Delete a Car
Mark a car as "deleted" by setting its deleted_flag to 1.

- **Method**: `Delete`
- **URL**: `/cars/:id`
- **Response**:
  ```json
  { "message": "Car deleted successfully" }

