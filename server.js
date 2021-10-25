const express = require('express');
const app = express();
const db = require('./config/keys');
const mongoose = require('mongoose');


// Write our first route
app.get('/', (req, res) => res.send('Hello GAYWAD!'));

// Connecting to database
mongoose.connect(db.mongoURI)
        .then(() => console.log('Mongodb connected'))
        .catch((err) => console.log(err) );

// Callback below. Promise statement above.
const port = 5001;
app.listen(port, () => console.log(`Server is running on port ${port}`) );