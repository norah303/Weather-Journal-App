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
const server = app.listen(port, () => {
    console.log(`running on localhost: ${port}`);
});

//POST route//
const data = [];


function addData(req, res){
    projectData.temperature= req.body.temperature;
    projectData.date= req.body.date;
    projectData.content= req.body.content;
    res.end(projectData);
    // data.push(newEntry)
    console.log(projectData)
}

app.post('/add', addData);

//GET route//


const getData = (req, res) =>{
    res.send(projectData);
};

app.get('/all', getData);

