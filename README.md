# WriteSphere - A MERN Stack Blogging Platform

WriteSphere is a full-featured blogging platform built with the MERN stack (MongoDB, Express.js, React, Node.js). Designed to be modern and scalable, it provides secure authentication, role-based access control, and rich blog management tools for content creators.

---

## Features

### User Authentication & Authorization
* Secure **JWT-based** login and registration.
* Users can manage their own content securely.

### Role-Based Access Control (RBAC)
* Supports `user` and `admin` roles.
* Admins can moderate and manage all posts.

### Blog Management
* Full **CRUD** (Create, Read, Update, Delete) functionality.
* Rich text editing experience using the **TipTap** editor.

### File Uploads
* Upload blog thumbnails and other assets via **Multer**.

### Search & Filtering
* Search blogs by title.
* Filter by categories for faster navigation.

### User Profiles
* Public profiles showcasing published blogs.
* Private dashboards for user-specific blog management.

### Admin Dashboard
* View and manage all user blogs.
* Delete or moderate content as needed.

---

## Tech Stack

### Frontend
* **React.js** – Component-based UI.
* **Redux Toolkit** – Predictable and efficient state management.
* **React Hook Form** – Flexible form handling.
* **Zod** – Schema validation for forms and API data.
* **React Router v6** – Modern routing system.
* **TipTap** – Customizable rich text editor.
* **Tailwind CSS** – Utility-first CSS framework.

### Backend
* **Node.js & Express.js** – Scalable backend server.
* **MongoDB & Mongoose** – NoSQL database and ODM.
* **JWT (JSON Web Tokens)** – Secure user authentication.
* **Multer** – Middleware for handling file uploads.

---

## Getting Started

### Prerequisites
* Node.js and npm installed.
* MongoDB connection string.
* Terminal or CLI environment.

---

### 1. Clone the Repository
git clone [https://github.com/BigGSSquare/blogsphere.git](https://github.com/BigGSSquare/blogsphere.git)
cd blogsphere

###2. Backend Setup
cd server
npm install

###3. Create a .env file in the server/ directory
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
PORT=5000
###4.Start the backend server:
npm run dev
###Author
Ganesh Sai Santosh Chivukula
Software Developer | Full-Stack Enthusiast
Passionate about building scalable full-stack applications.


