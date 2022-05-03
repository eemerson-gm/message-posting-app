
// Server
const express = require('express');
const cors = require('cors');
const port = process.env.PORT || 5000;
const dbo = require('./src/connect');

// App
const app = express();
app.use(cors());
app.use(express.json());
app.use(require('./src/routes'));

// Start server
app.listen(port, () => {
    dbo.connectToDatabase(function(err){
        if (err) console.error(err);
    });
    console.log(`Server is running on port: ${port}`);
});