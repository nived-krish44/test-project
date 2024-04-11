const express = require('express');
const router = express.Router();
const connection = require('../app.js');



router.get('/', (req, res) => {
    const query = 'select * from offers';
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
