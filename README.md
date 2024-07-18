# EasyDrive Backend

This is a car rental management backend server built with Express.js, Mongoose, and Zod for validation.

## `Useful Links`

**1. [Github Server Side Repository](https://github.com/yusuf-khan-swd/easy-drive-backend)** \
**2. [Live Server](https://easydrive-backend.vercel.app)**

## How to Setup Project Locally

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
   ```

4. **Fourth and final step** => Run your code by using

   ```sh
   npm run dev
   ```

### Application Routes:

### Auth

- api/auth/signup (POST)
- api/auth/login (POST)

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
