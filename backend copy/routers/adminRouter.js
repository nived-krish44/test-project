const express = require('express');
const router = express.Router();
const connection = require('../app.js');

// Define admin routes
router.post('/', (req, res) => {
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
});

// router.get('/menu', (req, res) => {
//   // Menu fetching logic
// });

router.get('/', (req, res) => {
    query = ' SELECT itemName, price, SUM(quantity) AS totalQuantity,order_date from ordered GROUP BY itemName, price,order_date';
  connection.query(query , (err,results)=>{
    if(err){
      console.log("error");
    }
    console.log("Data fetched : ", results);
    res.status(200).json(results);
  })
});

// Export the router
module.exports = router;
