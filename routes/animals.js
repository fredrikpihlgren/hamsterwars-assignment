const express = require('express');
const router = express.Router();


router.get('/', (req, res) => {
	res.send('GET /animals/');
});


//GET
//POST
//PUT
//DELETE

module.exports = router;