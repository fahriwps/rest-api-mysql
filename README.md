## Description

This project implements a simple REST API for managing CRUD using Express JS, Typescript, and MySQL database.

## Usage

1. Clone the repository.
2. Navigate to the project directory and install required packages by running `npm install`.
3. Start the server with `npm run dev`.

## API Endpoints

- **GET** `/user` - Get all registered user.
- **GET** `/user/:id` - Get a specific registered user by ID and their balance & expense.
- **POST** `/transaction` - Create a new transaction based on `user_id`.
- **PUT** `/transaction/:id` - Update an existing transaction by ID.
- **DELETE** `/transactions/:id` - Delete a transaction by ID.