const express = require('express');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors());

app.post('/', (req, res) => {
  try {
    
    const { itemName ,itemId} = req.body;
    console.log("name " ,itemName);
    console.log(itemId);

    // Insert the item name into the database (uncomment and implement as needed)
    // const sql = 'INSERT INTO names (name) VALUES (?)';
    // db.query(sql, [itemName], (err, result) => {
    //   if (err) {
    //     console.error('Error inserting item name:', err);
    //     res.status(500).json({ error: 'Error processing item name' });
    //     return;
    //   }
      
      // Return a success response (uncomment and modify as needed)
      const response = {
        message: 'Received item name successfully and added to the database',
        itemName: itemName
      };
      res.status(200).json(response);
    // });
  } catch (error) {
    console.error('Error processing request:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

const PORT = process.env.PORT || 5000; 
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
