const express = require('express');
const app = express();
const cors = require('cors');
const path = require('path');

const hamsters = require('./routes/hamsters.js');
const matches = require('./routes/matches.js');


const PORT = process.env.PORT || 1338;
const staticFolder = path.join(__dirname, 'public');
const staticImages = path.join(__dirname, 'img');

//Middleware
//Logger, skriver ut info om kommande requests
app.use((req, res, next) => {
	console.log(`${req.method} ${req.url}`, req.params);
	next();
});


app.use( express.json() );
app.use( cors() );
app.use( '/img', express.static(staticImages) );
app.use( express.static(staticFolder) );


//REST API FOR HAMSTERS & MATCHES
app.use('/hamsters', hamsters);
app.use('/matches', matches);




//Startar servern
app.listen(PORT, () => {
	console.log('Server listening on port '+PORT);
});