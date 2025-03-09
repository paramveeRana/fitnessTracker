# Fitness Tracker

A full-stack fitness tracking application built with the MERN stack (MongoDB, Express.js, React.js, Node.js).

## Features

- User Authentication (Sign up/Sign in)
- Track daily workouts
- Dashboard with workout statistics
- Calorie tracking
- Workout history

## Tech Stack

### Frontend
- React.js
- Redux for state management
- Axios for API calls
- Material-UI for styling

### Backend
- Node.js
- Express.js
- MongoDB with Mongoose
- JWT for authentication

## Deployment

- Frontend: Deployed on Vercel
- Backend: Deployed on Render
- Database: MongoDB Atlas

## Getting Started

### Prerequisites
- Node.js
- npm or yarn
- MongoDB

### Installation

1. Clone the repository
```bash
git clone https://github.com/paramveeRana/fitnessTracker.git
cd fitnessTracker
```

2. Install dependencies for both frontend and backend
```bash
# Install backend dependencies
cd server
npm install

# Install frontend dependencies
cd ../client
npm install
```

3. Create .env file in server directory with the following variables:
```
MONGODB_URL=your_mongodb_url
JWT=your_jwt_secret
COOKIE_SECRET=your_cookie_secret
PORT=8080
```

4. Run the application
```bash
# Run backend
cd server
npm start

# Run frontend in a new terminal
cd client
npm start
```

## Docker Support

The application can also be run using Docker:

```bash
docker-compose up --build
```

## License

MIT License 