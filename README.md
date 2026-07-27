# Hospital Management System

A comprehensive hospital management system built with the MERN stack (MongoDB, Express, React, Node.js).

## 📋 Table of Contents

- [Project Overview](#project-overview)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Running the Application](#running-the-application)
- [Environment Variables](#environment-variables)
- [API Documentation](#api-documentation)
- [Contributing](#contributing)
- [License](#license)

## 📖 Project Overview

This hospital management system is designed to streamline hospital operations including patient management, appointment scheduling, and other healthcare administrative tasks. The application uses a modern full-stack architecture with a React frontend and a Node.js/Express backend with MongoDB database.

## 🛠️ Tech Stack

### Frontend
- **React.js** - Modern UI library
- **Node.js** - JavaScript runtime

### Backend
- **Node.js** - JavaScript runtime
- **Express.js** - Web application framework
- **MongoDB** - NoSQL database
- **Mongoose** - MongoDB object modeling
- **JWT** - JSON Web Tokens for authentication
- **Bcryptjs** - Password hashing
- **CORS** - Cross-Origin Resource Sharing

### Deployment
- **Docker** - Containerization
- **Docker Compose** - Multi-container orchestration

## 📁 Project Structure

```
hospital-management/
├── backend/              # Node.js/Express backend
│   ├── server.js
│   ├── package.json
│   ├── .env              # Environment variables (not committed)
│   └── ...
├── frontend/             # React frontend
│   ├── hospital-client/
│   └── ...
├── docker-compose.yml    # Docker Compose configuration
└── README.md
```

## ✅ Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (v14 or higher) and npm
- **MongoDB** (v4.4 or higher)
- **Docker** and **Docker Compose** (optional, for containerized deployment)

## 🚀 Installation

### Without Docker

#### Backend Setup

1. Navigate to the backend directory:
   ```bash
   cd backend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file in the backend directory with the required environment variables (see [Environment Variables](#environment-variables))

#### Frontend Setup

1. Navigate to the frontend directory:
   ```bash
   cd frontend/hospital-client
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

### With Docker

Simply run:
```bash
docker-compose up --build
```

This will build and start both the backend and frontend services.

## 🏃 Running the Application

### Without Docker

#### Start Backend
```bash
cd backend
npm run dev        # Development mode with nodemon
# or
npm start          # Production mode
```

The backend will run on `http://localhost:5000`

#### Start Frontend
```bash
cd frontend/hospital-client
npm start
```

The frontend will run on `http://localhost:3000`

### With Docker

```bash
docker-compose up
```

- Backend will be accessible at `http://localhost:5000`
- Frontend will be accessible at `http://localhost:3000`

## 🔐 Environment Variables

### Backend (.env)

Create a `.env` file in the `backend/` directory with the following variables:

```env
# MongoDB Connection
MONGODB_URI=mongodb://localhost:27017/hospital-management

# JWT Secret
JWT_SECRET=your_jwt_secret_key_here

# Server Configuration
PORT=5000
NODE_ENV=development

# Other configurations as needed
```

## 📚 API Documentation

The backend provides RESTful API endpoints for managing:
- Patients
- Doctors
- Appointments
- Other hospital operations

For detailed API documentation, refer to the backend server implementation or generate API docs using tools like Swagger/OpenAPI.

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/YourFeature`)
3. Commit your changes (`git commit -m 'Add YourFeature'`)
4. Push to the branch (`git push origin feature/YourFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the ISC License - see the LICENSE file for details.

---

For more information or support, please open an issue in the repository.
