const express = require('express');
const router = express.Router();
const connection = require('../app.js');

// Define admin routes
// router.post('/', (req, res) => {
//   // Admin data insertion logic
// });

router.get('/', (req, res) => {
    query = 'select * from menu';
    console.log("selecteeeeed");
    connection.query(query , (err,results)=>{
      if(err){
        console.log("error");
      }
      console.log("Data fetched : ", results);
      res.status(200).json(results);
    })
});

// router.get('/admin', (req, res) => {
//   // Admin data fetching logic
// });

// Export the router
module.exports = router;
