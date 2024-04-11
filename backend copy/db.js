const mysql = require('mysql2/promise');
require('dotenv').config();

const connection = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: process.env.MYSQL_PASSWORD,
    database: 'menuorder',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
  });
  
  //Middleware to ensure MySQL connection
  (async () => {
      try {
        await connection.getConnection(); // This line ensures the pool is initialized and a connection is established
        console.log('Connected to MySQL database');
      } catch (error) {
        console.error('Error connecting to MySQL:', error);
      }
    })();
  
 module.exports = connection;