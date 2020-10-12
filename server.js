// Setup empty JS object to act as endpoint for all routes
projectData = {};

// Require Express to run server and routes
const express = require('express');
// Start up an instance of app
const app = express();

/* Dependencies*/
const bodyParser = require('body-parser');
/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
const cors = require('cors');
const { request } = require('http');
const { response } = require('express');
app.use(cors());

// Initialize the main project folder
app.use(express.static('website'));


// set variable to port 8000
const port = 8000;
// Setup Server
//2 Utilize the .listen() method Set your variable named server
const server = app.listen(port, () => {console.log(`running on localhost: ${port}`);});

//GET route//
app.get('/all', sendData)

const sendData = (req, res) =>{
    res.send(projectData);
};

//POST route//
// const data = [];

app.post()
app.post('/addData', addData);

function addData(req, res){
    projectData.temperature= req.body.temperature;
    projectData.date= req.body.date;
    projectData.content= req.body.content;
    res.end();
    // data.push(newEntry)
    console.log(projectData)
}