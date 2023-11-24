import express from 'express';
import dotenv from 'dotenv';
dotenv.config();

import errorHandler from './middleware/errorHandler.js';
import userRoute from './routes/userRoute.js';
import taskRoute from './routes/taskRoute.js';



const app = express();
const PORT  = process.env.PORT ||  8000;



// For parsing application/json
app.use(express.json());
app.use(express.urlencoded({ extended: false }));


app.use('/api/auth', userRoute);
app.use('/api/tasks', taskRoute);


// Middleware to handle error;
app.use(errorHandler);




app.listen(PORT, () => {
    console.log(`\x1b[35m%s\x1b[0m`, `SERVER: Server started on port ${PORT}`);
  });