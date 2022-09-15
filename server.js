import express from 'express';
import cors from 'cors';
import connect from './db/connectDb.js';
import dotenv from 'dotenv';
import homeRoutes from './routes/home.js';
import ownerRoutes from './routes/ownerAuth.js';
import guestRoutes from './routes/userAuth.js';
import roomRoutes from './routes/room.js';
import cookieParser from 'cookie-parser';

// web server
const app = express();

app.use(
  cors({
    origin: '*',
    credentials: true,
  })
);

// dotenv environment setup
dotenv.config();

// middlewares

app.use(cookieParser());
app.use(express.json());

app.use('/api/home', homeRoutes);
app.use('/api/room', roomRoutes);
app.use('/api/ownerAuth', ownerRoutes);
app.use('/api/guestAuth', guestRoutes);

//error handler
app.use((err, req, res, next) => {
  const status = err.status || 500;
  const message = err.message || 'Something went wrong!';
  return res.status(status).json({
    success: false,
    status,
    message,
    stack: err.stack,
  });
});

let port = process.env.PORT || 4006;

app.listen(port, () => {
  console.log(`The App is running on the port ${port}!`);
  // connect to the database
  connect();
});
