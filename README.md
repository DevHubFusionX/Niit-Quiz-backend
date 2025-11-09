# NIIT Quiz Backend API

## Setup

1. Install dependencies:
```bash
npm install
```

2. Install MongoDB locally or use MongoDB Atlas

3. Update `.env` file with your MongoDB connection string

4. Start the server:
```bash
npm run dev  # Development with nodemon
npm start    # Production
```

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user

### Quiz
- `GET /api/quiz/:subject` - Get quiz questions
- `POST /api/quiz/:subject/submit` - Submit quiz answers

### User
- `GET /api/user/profile` - Get user profile
- `GET /api/user/stats` - Get user statistics

### Health Check
- `GET /api/health` - Server health status

## Environment Variables

```
PORT=5000
MONGODB_URI=mongodb://localhost:27017/niit-quiz
JWT_SECRET=your-super-secret-jwt-key
NODE_ENV=development
```