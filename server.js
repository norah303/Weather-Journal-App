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
app.use(cors());

// Initialize the main project folder
app.use(express.static('website'));

// Setup Server
const port = 8000;

const listening = () => {
    console.log(`running on localhost: ${port}`);
};

const server = app.listen(port, listening);

//POST route//
const data = [];

function addData(req, res){
    projectData.date= req.body.date;
    projectData.temp= req.body.temp;
    projectData.content= req.body.content;
    res.send(projectData);

    console.log("post ",projectData)
}

app.post('/add', addData);

//GET route//


const getData = (req, res) =>{
    res.send(projectData);
};

app.get('/all', getData);

