// Requiring file systems and file paths
const fs = require('fs');
const path = require('path');
// Requiring express
const express = require('express');
// Requiring Routes
const apiRoutes = require('./routes/apiRoutes');
const htmlRoutes = require('./routes/htmlRoutes');

const PORT = process.env.PORT || 3001;
// Instansitate server
const app = express();
// parse incoming string or array data
app.use(express.urlencoded({ extended: true }));
// parse incoming JSON data
app.use(express.json());
// JS AND CSS file middleware
app.use(express.static('public'));
// api routes
app.use('/api', apiRoutes);
app.use('/', htmlRoutes);


// Asking server to listen for requests (should always be last)
app.listen(PORT, () => {
	console.log(`API server now on port ${PORT}!`);
});
