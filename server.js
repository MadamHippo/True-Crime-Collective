const express = require('express');
const app = express();

// Write our first route
app.get('/', (req, res) => res.send('Hello!'));

const port = 5001;
app.listen(port, () => console.log(`Server is running on port ${port}`) );