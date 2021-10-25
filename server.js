const express = require('express'); //importing library to use
const app = express(); // creating an instance of Express and naming it app
const db = require('./config/keys');
const mongoose = require('mongoose');
const users = require('./routes/api/users');
const profile = require('./routes/api/profile');
const posts = require('./routes/api/posts');

//Body parser config
// I want Express to convert the data I'm receiving into a JSON format:

app.use(express.urlencoded())
app.use(express.json())

//url encoding will convert characters into respective codes. That way you don't miss characters. Data will come thru the HTTP request and you will use encoding to turn unicode to ASCII.


//multi-threading is beautiful, let's write our first route
//you have to say what request (got or post)
//user came to the homepage and express will send a hello back
app.get('/', (req, res) => res.send('Hello World!'));

app.use('/api/users', users);
app.use('/api/profile', profile);
app.use('/api/posts', posts);

// .use means USE these javascript files. It's saying, hey Express (app) use these routes.

// Connect to db
mongoose.connect(db.mongoURI)
        .then(() => console.log('Mongodb connected'))
        .catch((err) => console.log(err) );

// promise statement can be attached to any funciton call. .then() and .catch(). It's callled promoise because afer this function is executed, ONE of the then and catch WILL run.
// You don't need both then and catch. Sometimes you don't care if something fails and nothing is there to catch it.


// now by this point, there are 2 threads running. That's why Server is running on port printed BEFORE Mongodb printed as connected.
const port = 5001;
app.listen(port, () => console.log(`Server is running on port ${port}`) );
//you're asking Express to listen at the port for a callback
//if successful you will have Express print on the screen server is running ...