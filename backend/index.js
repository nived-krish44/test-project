const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
const app = express();
const mysql = require('mysql2/promise');
app.use(express.json());

const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'menuorder',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});


// Middleware
// app.use(bodyParser.urlencoded({ extended: true }));
app.use(session({
    secret: 'mysecret', // Change this to a more secure secret in production
    resave: false,
    saveUninitialized: true
}));

// In-memory user database (for demonstration purposes)
const users = [
    { id: 1, username: 'admin', password: 'password', displayName: 'Administrator' }
];

// Middleware to check if user is logged in
// const requireLogin = (req, res, next) => {
//     if (!req.session.user) {
//         return res.redirect('/login');
//     }
//     next();
// };

// Routes
// app.get('/', requireLogin, (req, res) => {
//     const user = req.session.user;
//     res.send(user);
// });

app.get('/login', (req, res) => {
    res.render('login');
});

app.post('/login',async (req, res) => {
    try{
    const { username, password } = req.body;
    const [rows, fields] = await pool.query('SELECT * FROM users WHERE username = ? AND password = ?', [username, password]);
    console.log(username)
    if (rows.length > 0) {
        const user = rows[0];
        req.session.user = user;
        res.send("recieved");
    } else {
        return res.send('Invalid credentials');
    }
} catch (error) {
    console.error('Error:', error);
    return res.status(500).send('Internal Server Error');
}
});

app.get('/logout', (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            return res.send('Error logging out');
        }
        res.redirect('/login');
    });
});

// Start the server
const PORT = 5001;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
