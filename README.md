# RapidCommerce Product Management Server

This is an e-commerce product management backend server built with Express.js, Mongoose, and Zod for validation.

## `Useful Links`

**1. [Github Server Side Repository](https://github.com/yusuf-khan-swd/rapid-commerce-server)** \
**2. [Live Server](https://rapidcommerce.vercel.app)**

## How to Setup Project Locally

1. **First step** => Clone the project

   ```sh
   git clone https://github.com/yusuf-khan-swd/rapid-commerce-server.git
   cd rapid-commerce-server
   ```

2. **Second step** => Install all the packages using

   ```sh
   npm install
   ```

3. **Third step** => Add environment variables according to the config file into your `.env` file

   ```env
   DB_URL=your_mongodb_connection_string
   ```

4. **Fourth and final step** => Run your code by using

   ```sh
   npm run dev
   ```

### Application Routes:

### Category

- api/v1/categories/create-category (POST)
- api/v1/categories (GET)
- api/v1/categories/bc4beb7e-8756-41d8-92ae-9c36d13b5540 (Single GET) Include an id that is saved in your database
- api/v1/categories/bc4beb7e-8756-41d8-92ae-9c36d13b5540 (PATCH)
- api/v1/categories/7dd3b045-8fc4-43ee-8dbf-b315de27ba92 (DELETE) Include an id that is saved in your database

### Services

- api/v1/services/create-book (POST)
- api/v1/services (GET)
- api/v1/services/bc4beb7e-8756-41d8-92ae-9c36d13b5540/category (GET)
- api/v1/services/45e5d21d-e115-4a55-a3ac-a4da01e2b25c (GET)
- api/v1/services/45e5d21d-e115-4a55-a3ac-a4da01e2b25c (PATCH)
- api/v1/services/1be009bb-911e-4763-805b-84f6788ade4f (DELETE)
