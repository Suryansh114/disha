# Disha - Full Stack Application

A modern MERN (MongoDB, Express, React, Node.js) stack application built with a scalable architecture.

## Project Structure

```
disha/
├── backend/              # Node.js + Express API
│   ├── models/          # MongoDB models
│   ├── controllers/     # Business logic
│   ├── routes/          # API routes
│   ├── middleware/      # Custom middleware
│   ├── server.js        # Entry point
│   └── package.json     # Dependencies
│
├── frontend/            # React application
│   ├── public/          # Static files
│   ├── src/
│   │   ├── components/  # Reusable components
│   │   ├── pages/       # Page components
│   │   ├── services/    # API services
│   │   ├── App.js       # Main component
│   │   └── index.js     # Entry point
│   └── package.json     # Dependencies
│
└── .gitignore          # Git ignore rules
```

## Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- MongoDB (local or cloud - MongoDB Atlas)

## Installation & Setup

### Backend Setup

1. Navigate to the backend directory:
```bash
cd backend
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file from `.env.example`:
```bash
cp .env.example .env
```

4. Update the `.env` file with your MongoDB connection string and other configurations

5. Start the development server:
```bash
npm run dev
```

The backend will run on `http://localhost:5000`

### Frontend Setup

1. Navigate to the frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file from `.env.example`:
```bash
cp .env.example .env
```

4. Start the React development server:
```bash
npm start
```

The frontend will run on `http://localhost:3000`

## Run the Website

To run the full website locally, start the backend and frontend in separate terminals.

### 1. Start the Backend
```bash
cd backend
npm install
npm run dev
```

The backend server should run on `http://localhost:5000`.

### 2. Start the Frontend
```bash
cd frontend
npm install
npm start
```

Then open the app in your browser at `http://localhost:3000`.

> Make sure your backend `.env` is configured with a valid MongoDB connection string and any other required environment variables.

## Available Scripts

### Backend

- `npm start` - Run the server in production mode
- `npm run dev` - Run the server in development mode with auto-reload

### Frontend

- `npm start` - Runs the app in development mode
- `npm build` - Builds the app for production
- `npm test` - Runs the test suite

## API Endpoints

### Users
- `GET /api/users` - Get all users
- `GET /api/users/:id` - Get user by ID
- `POST /api/users` - Create a new user
- `PUT /api/users/:id` - Update a user
- `DELETE /api/users/:id` - Delete a user

## Features

- User management system
- RESTful API
- MongoDB database integration
- React UI with routing
- Responsive design
- JWT authentication ready
- Error handling
- CORS enabled

## Technologies Used

### Backend
- Express.js
- MongoDB with Mongoose
- bcryptjs (for password hashing)
- JWT (jsonwebtoken)
- CORS
- Dotenv

### Frontend
- React
- React Router
- Axios
- CSS3

## Environment Variables

### Backend (.env)
```
MONGODB_URI=your_mongodb_connection_string
PORT=5000
JWT_SECRET=your_secret_key
NODE_ENV=development
```

### Frontend (.env)
```
REACT_APP_API_URL=http://localhost:5000/api
```

## Next Steps

1. Set up MongoDB Atlas account (or use local MongoDB)
2. Get your MongoDB connection string
3. Update the `.env` files in both frontend and backend
4. Install dependencies for both folders
5. Run both servers simultaneously
6. Start developing!

## Contributing

Feel free to fork this project and submit pull requests for any improvements.

## License

ISC
hi