# Backend README

## Overview
This backend application provides APIs for managing tasks and user authentication. It features two models: `Task` and `User`, with routes, controllers, and middleware for handling tasks and user-related functionality. The application is built using Node.js, Express, and MongoDB (via Mongoose).

---

## Features
### **Tasks**
- **Routes**:
  - `GET /tasks` - Retrieve all tasks.
  - `POST /tasks` - Create a new task.
  - `PUT /tasks/:id` - Update a specific task by ID.
  - `DELETE /tasks/:id` - Delete a specific task by ID.
- **Controllers**:
  - `getAllTasks`: Fetch all tasks from the database.
  - `createTask`: Add a new task to the database.
  - `updateTask`: Modify an existing task using its ID.
  - `deleteTask`: Remove a task from the database using its ID.

### **Users**
- **Routes**:
  - `POST /users/login` - Login a user.
  - `POST /users/signup` - Register a new user.
  - Default route: `GET /users` for fetching all users.
- **Controllers**:
  - `loginController`: Handle user login, generate JWT token.
  - `signupController`: Register a new user in the database.

### **Middleware**
- **Token Verification**: Middleware to verify JWT tokens and decode values for `role`, `id`, and `email`. This middleware is applied to all task routes to ensure only authorized users can access task operations.

---

## Application Structure
### **Files and Folders**
```
backend/
├── models/
│   ├── task.js
│   └── user.js
├── routes/
│   ├── taskRoutes.js
│   └── userRoutes.js
├── controllers/
│   ├── taskController.js
│   └── userController.js
├── middleware/
│   └── authMiddleware.js
├── index.js
└── config/
    └── db.js
```

---

## Setup
### **Prerequisites**
- Node.js (v14 or higher)
- MongoDB (local or cloud instance)

### **Installation**
1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd backend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Set up environment variables in a `.env` file:
   ```
   PORT=5000
   MONGO_URI=<your-mongo-uri>
   JWT_SECRET=<your-secret-key>
   ```

4. Start the application:
   ```bash
   npm start
   ```
   The server will start on the defined port (default: 5000).

---

## API Documentation
### **Tasks Endpoints**
#### **1. Get All Tasks**
- **Route**: `GET /tasks`
- **Middleware**: Token verification
- **Response**:
  - **200**: Returns all tasks in JSON format.
  - **404**: Error fetching tasks.

#### **2. Create Task**
- **Route**: `POST /tasks`
- **Middleware**: Token verification
- **Request Body**:
  ```json
  {
    "title": "Task Title",
    "description": "Task Description",
    "dueDate": "YYYY-MM-DD"
  }
  ```
- **Response**:
  - **200**: Returns the newly created task.
  - **404**: Error creating task.

#### **3. Update Task**
- **Route**: `PUT /tasks/:id`
- **Middleware**: Token verification
- **Request Body**:
  ```json
  {
    "title": "Updated Title",
    "description": "Updated Description",
    "dueDate": "YYYY-MM-DD"
  }
  ```
- **Response**:
  - **200**: Task updated successfully.
  - **404**: Task not found or error updating.

#### **4. Delete Task**
- **Route**: `DELETE /tasks/:id`
- **Middleware**: Token verification
- **Response**:
  - **200**: Task deleted successfully.
  - **400**: Task not found or error deleting.

### **Users Endpoints**
#### **1. Login**
- **Route**: `POST /users/login`
- **Request Body**:
  ```json
  {
    "email": "user@example.com",
    "password": "password123"
  }
  ```
- **Response**:
  - **200**: Login successful, returns JWT token.
  - **400**: Invalid credentials.

#### **2. Signup**
- **Route**: `POST /users/signup`
- **Request Body**:
  ```json
  {
    "name": "John Doe",
    "email": "john@example.com",
    "password": "password123"
  }
  ```
- **Response**:
  - **200**: User registered successfully.
  - **404**: Error registering user.

---

## Technologies Used
- **Node.js**: Runtime environment.
- **Express**: Web framework.
- **MongoDB**: Database.
- **Mongoose**: Object Data Modeling (ODM) library.
- **JWT**: JSON Web Token for authentication.

---

## Development Workflow
### **Database Connection**
- Defined in `config/db.js`.
- Connects to MongoDB using Mongoose.

### **Index File**
- Main entry point (`index.js`).
- Configures routes for users and tasks.
- Handles middleware setup (CORS, JSON parsing).
- Starts server on the defined port.

---

## Contributing
Feel free to contribute by submitting issues or pull requests. Ensure you follow coding standards and add relevant tests.

---

## License
This project is licensed under the MIT License.

