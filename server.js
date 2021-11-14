// Calling The Packages
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

// Setup empty JS object to act as endpoint for all routes
projectData = {};

// Start up an instance of app
const app = express();

// Cors for cross origin allowance
app.use(cors());

/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Initialize the main project folder
app.use(express.static("website"));

// Setup Server Using => (node server.js) in The Terminal
let port = 4500;
app.listen(port, () => {
  console.log(`Server Is Running On: http://localhost:${port}`);
});

// Require Express to run server and routes
// Get All Data By The Following Link: http://localhot:4500/all
app.get("/all", (req, res) => {
  res.send(projectData).status(200).end();
});

// post data by the following link: http://localhot:4500/postData
app.post("/postData", (req, res) => {
  projectData = {
    temp: req.body.temp,
    date: req.body.date,
    content: req.body.content,
  };
  res.send(projectData).status(404).end();
});
