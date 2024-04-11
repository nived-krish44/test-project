const express = require('express');
const router = express.Router();
const connection = require('../db.js');
// Define order routes
router.post('/', async (req, res) => {
    try {
        const data = req.body;
        console.log(data);
        const order_date = new Date().toISOString().slice(0, 10);
        const order_time = new Date().toLocaleTimeString('en-US', { hour12: false });
        const sql = 'INSERT INTO ordered (itemname, price, quantity, order_time, order_date) VALUES ?';
        const values = [];
        for (const item of data) {
          if (item.name && item.quantity && item.price) {
            values.push([item.name, item.price, item.quantity, order_time, order_date]);
          } else {
            console.warn('Skipping invalid item:', item);
          }
        }
    
        if (values.length > 0) {
          // Use await with connection.query for INSERT operation
          await connection.getConnection();
          const [results, fields] = await connection.query(sql, [values]);
          console.log('Data inserted into MySQL:', results);
          res.status(201).json({ message: 'Data inserted successfully' });
        } else {
          res.status(400).json({ error: 'No valid data to insert' });
        }
      } catch (error) {
        console.error('Error processing request:', error);
        res.status(500).json({ error: 'Internal server error' });
      }
});

// router.get('/offers', (req, res) => {
//   // Offer fetching logic
// });

// Export the router
module.exports = router;
