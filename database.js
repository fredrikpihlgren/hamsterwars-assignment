const admin = require("firebase-admin");

let serviceAccount;
if (process.env.PRIVATE_KEY) {
	//på heroku
	serviceAccount = JSON.parse(process.env.PRIVATE_KEY);
}
else {
	//lokalt på dator
	serviceAccount = require("./firestore-private-key.json");
}


admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});



function getDatabase() {
	return admin.firestore();
}

module.exports = getDatabase;