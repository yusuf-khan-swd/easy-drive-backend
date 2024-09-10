# Easy Drive

Welcome to **Easy Drive Backend**, a comprehensive car rental service application backend. This README provides all the necessary information to set up, run, and use the application effectively.

This is a car rental management backend server built with Express.js, Mongoose, and Zod for validation.

## Project Overview

**Easy Drive** is designed to facilitate seamless car rental services. It provides a user-friendly interface for customers to book cars, and an admin interface to manage the car inventory and bookings.

## `Useful Links`

**1. [Github Server Side Repository](https://github.com/yusuf-khan-swd/easy-drive-backend)** \
**2. [Live Server](https://easydrive-backend.vercel.app)**

## Features

- **User Authentication**: Secure sign-up and login functionality.
- **Car Management**: Admins can add, update, return, and delete cars from the inventory.
- **Booking Management**: Users can book cars, view their bookings, and admins can view all bookings.

## Technology Stack

- **Backend**: Node.js, Express.js, TypeScript
- **Database**: MongoDB, Mongoose
- **Validation**: Zod
- **Authentication**: JWT, bcrypt
- **Linting and Formatting**: ESLint, Prettier

## Getting Started

### Prerequisites

Ensure you have the following installed:

- Node.js (>= 14.x)
- npm (>= 6.x)
- MongoDB

### How to Setup Project Locally

1. **First step** => Clone the project

   ```sh
   git clone https://github.com/yusuf-khan-swd/easy-drive-backend.git
   cd easy-drive-backend
   ```

2. **Second step** => Install all the packages using

   ```sh
   npm install
   ```

3. **Third step** => Add environment variables according to the config file into your `.env` file. e.g:

   ```env
   DATABASE_URL=your_mongodb_connection_string
   JWT_ACCESS_SECRET=your_jwt_secret
   ```

4. **Fourth and final step** => Run your code by using

   ```sh
   npm run dev
   ```

## Application Routes:

### Auth

- api/auth/signup (POST)
- api/auth/signin (POST)

### Car

- api/cars (POST)
- api/cars (GET)
- api/cars/6697779f1b96cacd04bdb078 (Single GET)
- api/cars/6697779f1b96cacd04bdb078 (PATCH)
- api/cars/6697779f1b96cacd04bdb078 (DELETE)

### Bookings

- api/bookings (POST)
- api/bookings (GET)
- api/bookings/my-bookings (GET)
