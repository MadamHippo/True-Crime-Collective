const express = require('express'); //importing library to use
const app = express(); // creating an instance of Express and naming it app
const db = require('./config/keys');
const mongoose = require('mongoose');
const users = require('./routes/api/users');
const profile = require('./routes/api/profile');
const posts = require('./routes/api/posts');
const passport = require('passport');

//Body parser config...

// All forms of communication to API will be in form of data (key: value). Even if there is no UI yet, the data will be in JSON format. 

// Tell Express to convert the body HTML into JSON...body parser is now part of Express so body-parser is not needed.

// The code below is saying "I want Express to convert the data I'm receiving into a JSON format!"

app.use(express.urlencoded())
app.use(express.json())

//url encoding will convert characters into respective codes. That way you don't miss characters. Data will come thru the HTTP request and you will use encoding to turn unicode to ASCII.

// Express will encode the data and convert and send it as part of the request in users.js. In Post function, the body of the request will have data. The user submits data, Express will encode the data and send it to mongodb.



//Passport config
app.use(passport.initialize());
// calling passport.js where most of the code is.
require('./config/passport')(passport); // writing it in one-shot so I can call, and execute it in ONE line. calling it and executing it easily.


//Writing our first route!
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

// we write code in server.js because it's a main common code.