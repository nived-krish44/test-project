const express = require('express');
const cors = require('cors');
const mysql = require('mysql2/promise');
require('dotenv').config();
const session = require('express-session');
const app = express();
app.use(express.json());
app.use(cors());

const connection = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: process.env.MYSQL_PASSWORD,
  database: 'menuorder',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

app.use(session({
  secret: 'mysecret',
  resave: false,
  saveUninitialized: true
}));

(async () => {
  try {
    await connection.getConnection(); // This line ensures the pool is initialized and a connection is established
    console.log('Connected to MySQL database');

    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  } catch (error) {
    console.error('Error connecting to MySQL:', error);
  }
})();

app.post('/',async (req, res) => {
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
      res.status(200).json({ success: true, redirectUrl: 'http://localhost:3000/intro' });
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

app.post('/cart',(req, res) => {
  try {
    const data = req.body;
    const order_date = new Date().toISOString().slice(0, 10); // Get current date in YYYY-MM-DD format
    const order_time = new Date().toLocaleTimeString('en-US', { hour12: false });
    console.log(data);
    const sql = 'INSERT INTO ordered (itemname, price,quantity,order_time,order_date) VALUES ?';
    const values = [];
    for (const item of data) {
      if (item.name && item.quantity && item.price) {
        values.push([item.name, item.price,item.quantity,order_time,order_date]);
        console.log("values pushed");
      } else {
        console.warn('Skipping invalid item:', item);
      }
    }
    connection.query(sql, [values], (err, result) => {
      if (err) {
        console.error('Error inserting data into MySQL:', err);
        return res.status(500).json({ error: 'Error inserting data into MySQL' });
      }
      console.log('Data inserted into MySQL:', result);
      res.status(201).json({ message: 'Data inserted successfully' });
    });

  } catch (error) {
    console.error('Error processing request:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.get('/offers', (req,res)=> {
  const query = 'select * from offers';
  connection.query(query , (err,results)=>{
    if(err){
      console.log("error");
    }
    console.log("Data fetched : ", results);
    res.status(200).json(results);
  })
})

app.post('/admin',(req,res)=>{
  const queries = 'insert into offers( Id,itemName,offer) values ?';
  const offers = [];
  const datas = req.body;
  console.log(datas);
  for(const item of datas){
    if (item.Id && item.itemName && item.offer){
    offers.push([item.Id,item.itemName,item.offer]);
  }
}
  connection.query(queries,[offers],(err,results)=>{
    if(err){
      console.log(err);
    }
    console.log(results)

  })
  res.status(201).json({ message: 'Data inserted successfully' });
})


app.get('/menu',(req,res)=>{
  query = 'select * from menu';
  connection.query(query , (err,results)=>{
    if(err){
      console.log("error");
    }
    console.log("Data fetched : ", results);
    res.status(200).json(results);
  })
})

app.get('/admin',(req,res)=>{
  query = ' SELECT itemName, price, SUM(quantity) AS totalQuantity,order_date from ordered GROUP BY itemName, price,order_date';
  connection.query(query , (err,results)=>{
    if(err){
      console.log("error");
    }
    console.log("Data fetched : ", results);
    res.status(200).json(results);
  })
})


