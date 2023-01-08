// To add data to the animals.json
const fs = require('fs');
// For pushing data
const path = require('path');
// Requiring express
const express = require('express');

const PORT = process.env.PORT || 3001;
// Instansitate server
const app = express();
// parse incoming string or array data
app.use(express.urlencoded({ extended: true }));
// parse incoming JSON data
app.use(express.json());
// JS AND CSS file middleware
app.use(express.static('public'));


// ROUTES
//Index.html route
app.get('/', (req, res) => {
	res.sendFile(path.join(__dirname, './public/index.html'));
});
//Animals.html route
app.get('/animals', (req, res) => {
	res.sendFile(path.join(__dirname, './public/animals.html'));
});
//Zookeeper.html route
app.get('/zookeepers', (req, res) => {
	res.sendFile(path.join(__dirname, './public/zookeepers.html'));
});
// Wildcard Route - Just in case someone tried to request a page that doesn't exist
app.get('*', (req, res) => {
	res.sendFile(path.join(__dirname, './public/index.html'));
  });

// Asking server to listen for requests (should always be last)
app.listen(PORT, () => {
	console.log(`API server now on port ${PORT}!`);
});
