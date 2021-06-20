// app.js

const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const dotenv = require('dotenv');

const recordRouter = require('./routes/record');

const app = express();

// env file for constant variables
dotenv.config({ path: '.env.example' });

// middleware for date format control
const dateFormatChecker = require('./middleware/dateFormatChecker');

// Set up mongoose connection

const mongoDB = process.env.MONGODB_URI;

mongoose.connect(mongoDB, { useNewUrlParser: true, useUnifiedTopology: true});
mongoose.Promise = global.Promise;

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.use(dateFormatChecker);
app.use(recordRouter);


const port = process.env.PORT || 3000;

db.once('open', function() {
    console.log('Connected!');
    app.listen(port, () => {
        console.log('Server is up and running on port number ' + port);
    });
});

module.exports = app