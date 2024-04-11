const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const connection = require('../db.js');
require('dotenv').config();

// Define user routes
router.post('/', async (req, res) => {
    try{
        const { username, password } = req.body;
        const [rows, fields] = await connection.query('SELECT * FROM users WHERE username = ? AND password = ?', [username, password]);
        console.log(username)
        if (rows.length > 0) {
            const user = rows[0];
            req.session.user = user;
            console.log("recieved");
            //res.send("recieved");
            // res.redirect('localhost:3000/intro');
            const token = jwt.sign({ username: username }, process.env.JWT_SECRET, { expiresIn: '1h' });
            res.status(200).json({ success: true, redirectUrl: 'http://localhost:3000/intro' ,token: token});
            console.log(token);
        } else {
            return res.send('Invalid credentials');
        }
      } catch (error) {
        console.error('Error:', error);
        return res.status(500).send('Internal Server Error');
      }
});

router.get('/logout', (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            return res.send('Error logging out');
        }
        res.redirect('/login');
    });
});

// Export the router
module.exports = router;
