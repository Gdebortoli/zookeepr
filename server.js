const fs = require('fs');
// Requiring Animal Data 
const { animals } = require('./data/animals');
// Requiring express
const express = require('express');


const PORT = process.env.port || 3001; 
// Instansitate server
const app = express(); 
// parse incoming string or array data
app.use(express.urlencoded({ extended: true }));
// parse incoming JSON data
app.use(express.json());
// Query Filter
function filterByQuery(query, animalsArray) {
    let personalityTraitsArray = [];
    // Note that we save the animalsArray as filteredResults here:
    let filteredResults = animalsArray;
    if (query.personalityTraits) {
    // Save personalityTraits as a dedicated array.
    // If personalityTraits is a string, place it into a new array and save.
    if (typeof query.personalityTraits === 'string') {
        personalityTraitsArray = [query.personalityTraits];
    } else {
         personalityTraitsArray = query.personalityTraits;
  }
    // Loop through each trait in the personalityTraits array:
      personalityTraitsArray.forEach(trait => {
     // Check the trait against each animal in the filteredResults array. Remember, it is initially a copy of the animalsArray,
     // but here we're updating it for each trait in the .forEach() loop. For each trait being targeted by the filter, the filteredResults
     // array will then contain only the entries that contain the trait, so at the end we'll have an array of animals that have every one 
     // of the traits when the .forEach() loop is finished.
        filteredResults = filteredResults.filter(
          animal => animal.personalityTraits.indexOf(trait) !== -1
        );
      });
    }
    if (query.diet) {
      filteredResults = filteredResults.filter(animal => animal.diet === query.diet);
    }
    if (query.species) {
      filteredResults = filteredResults.filter(animal => animal.species === query.species);
    }
    if (query.name) {
      filteredResults = filteredResults.filter(animal => animal.name === query.name);
    }
    return filteredResults;
  }
// Find by ID and return a single animal object 
function findById(id, animalsArray) {
    const result = animalsArray.filter(animal => animal.id === id)[0];
    return result; 
}

// GET route to Animal Data
app.get('/api/animals', (req, res) => {
  let results = animals;
  if (req.query) {
    results = filterByQuery(req.query, results);
  }
  res.json(results);
}); 
// GET route for animals by ID
app.get('/api/animals/:id', (req, res) => {
    const result = findById(req.params.id, animals);
    if (result) {
      res.json(result);
    } else {
      res.send(404); //error code
    }
  });
// Post Request 
app.post('/api/animals', (req, res) => {
// req.body is where our incoming content will be
  
  res.json(req.body);
  console.log(req.body);
}); 

// Asking server to listen for requests 
app.listen(PORT, () => {
    console.log(`API server now on port ${PORT}!`); 
});