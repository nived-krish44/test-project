const express = require('express');
const cors = require('cors');
const session = require('express-session');
const connection = require('./db');

require('dotenv').config();
const path = require('path'); // Import the path module

const app = express();
app.use(express.json());
app.use(cors());
app.use(session({ secret: 'mysecret', resave: false, saveUninitialized: true }));

// MySQL connection setup

//Import routers from the router folder
const userRouter = require('./routers/userRouter');
const cartRouter = require('./routers/cartRouter');
const adminRouter = require('./routers/adminRouter');
const menuRouter = require('./routers/menuRouter');
const offersRouter = require('./routers/offersRouter');
const authenticate = require("./middlewares/isAutheniticated");


// Use routers with appropriate base paths
app.use('/', userRouter);
app.use('/cart', authenticate, cartRouter);
app.use('/admin', adminRouter);
app.use('/offers',offersRouter);
app.use('/menu',menuRouter);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});