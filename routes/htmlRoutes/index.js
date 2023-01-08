const router = require('express').Router();
const path = require('path');

//Index.html route
router.get('/', (req, res) => {
	res.sendFile(path.join(__dirname, '../../public/index.html'));
});
//Animals.html route
router.get('/animals', (req, res) => {
	res.sendFile(path.join(__dirname, '../../public/animals.html'));
});
//Zookeeper.html route
router.get('/zookeepers', (req, res) => {
	res.sendFile(path.join(__dirname, '../../public/zookeepers.html'));
});
// Wildcard Route - Just in case someone tried to request a page that doesn't exist
router.get('*', (req, res) => {
	res.sendFile(path.join(__dirname, '../../public/index.html'));
  });


module.exports = router; 