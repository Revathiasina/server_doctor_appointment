
const express = require('express');
const cors = require('cors');

require('dotenv').config();

let { SERVER_PORT } = process.env;

SERVER_PORT = SERVER_PORT || 5050;

// Initialize Express
let app = express();

const controller = require('./src/controller/index');

const connection = require('./src/mongooseConnection');

connection.connect();


app.use(cors());

// Parse request body as JSON
app.use(express.json({ limit: '102mb', parameterLimit: '102mb' }));

app.use(express.urlencoded({ extended: false, limit: '102mb' }));


// Start the server
app.listen(SERVER_PORT, function () {
  console.log('Listening on port ' + SERVER_PORT + '.');
});

// default
app.get('/', (req, res) => {
  console.log('In Default API');
  res.send('Server is working');
});

app.post('/docavailability', controller.docApp.docAvailability);