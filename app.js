// app.js


const express = require('express'),
    bodyParser = require('body-parser'),
    mongoose = require('mongoose'),
    dotenv = require('dotenv'),
    swaggerUi = require('swagger-ui-express'),
    swaggerJsDoc = require('swagger-jsdoc'),
    recordRouter = require('./routes/record');

// env file for constant variables
dotenv.config({ path: '.env.example' });

// middleware for date format control
const dateFormatChecker = require('./middleware/dateFormatChecker');


// Set up mongoose connection
const mongoDB = process.env.MONGODB_URI;

const app = express(),
    port = process.env.PORT || 3000,
    serverUrl = "http://localhost:" + port;

const swaggerOptions = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "Library API",
            version: "1.0.0",
            description: "A simple Express Library API",
        },
        servers: [
            {
                url: serverUrl,
            },
            {
                url: 'https://getir-case-app-ae.herokuapp.com'
            }
        ],
    },
    apis: ["./routes/*.js"],
};

const specs = swaggerJsDoc(swaggerOptions);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.use(dateFormatChecker);
app.use(recordRouter);

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(specs));

/*Start Connect MONGODB*/

mongoose.connect(mongoDB, { useNewUrlParser: true, useUnifiedTopology: true});
mongoose.Promise = global.Promise;

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

db.once('open', function() {
    console.log('Connected!');
    app.listen(port, () => {
        console.log('Server is up and running on ' + serverUrl);
        console.log('Swagger UI -> ' + serverUrl + '/api-docs');
    });
});

module.exports = app