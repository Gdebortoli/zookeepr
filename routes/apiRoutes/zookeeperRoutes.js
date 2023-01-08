// Zookeeper Routes 
const router = require('express').Router();
// Importing lib functions
const {
    filterByQuery, 
    findById,
    createNewZookeeper, 
    validateZookeeper
} = require('../../lib/zookeepers'); 
const { zookeepers } = require('../../data/zookeepers');

// GET Requests 
// Get Zookeepers Data
router.get('/zookeepers', (req, res) => {
	let results = zookeepers;
	if (req.query) {
		results = filterByQuery(req.query, results);
	}
	res.json(results);
});
// Get Zookeepers by ID
router.get('/zookepers/:id', (req, res) => {
	const result = findById(req.params.id, zookeepers);
	if (result) {
		res.json(result);
	} else {
		res.send(404);
		//error code
	}
});
// POST Requests 
router.post('/zookeepers', (req, res) => {
	// set id based on what the next index of the array will be
	req.body.id = zookeepers.length.toString();

	// if any data in req.body is incorrect, send 400 error back
	if (!validateZookeeper(req.body)) {
		res.status(400).send('The zookeeper is not properly formatted.');
	} else {
		// add zk to json file and zookeepers array in this function
		const zookeeper = createNewZookeeper(req.body, zookeepers);

		res.json(zookeeper);
	}
});

module.exports = router;