const getDatabase = require('../database.js');
const db = getDatabase();

const express = require('express');
const router = express.Router();

const getAllData = require('../modules/get-all-data.js');


//GET winners or losers
router.get('/', (req, res) => {
    try {
        //send in db, empty array, route, req & res, calltype:
        getAllData(db, [], 'hamstrar', req, res, req.baseUrl);
    }
    catch(error) {
        console.log('An error occurred '+error.message);
        res.status(500).send(error.message);
    }
});



module.exports = router;