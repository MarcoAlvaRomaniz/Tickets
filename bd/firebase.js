//como se utilizan variables de entorno se llama dotenv para facilitar el llamado a las variables
require('dotenv').config();
const server = process.env.URL_SERVER

//otro modeo de usar firebase
const admin = require('firebase-admin')
const firebaseConf = require('./firebaseConf');
admin.initializeApp({
    credential: admin.credential.cert(firebaseConf),
    databaseURL: `https://${process.env.PROJECT_ID}.firebaseio.com`
});

const db = admin.firestore();
module.exports = {db,server}
