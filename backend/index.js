const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
const app = express();
app.use(express.json())

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

app.post('/login', (req, res) => {
    const username = req.body.username;
    const password= req.body.password;
    console.log(username)
    const user = users.find(u => u.username === username && u.password === password);
    if (user) {
       console.log(user)
        req.session.user = user;
       // res.redirect('/');
        res.status(200).send('logged in');
    } else {
        res.send('invalid ');
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
