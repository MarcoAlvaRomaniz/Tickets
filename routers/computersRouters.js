const express = require('express');
const router = express.Router();
const { db } =  require('../firebaseConfig');
const { async } = require('@firebase/util');

router.get('/', async(req,res) => {
    const snapshot = await db.collection('computer').get();
    const computers = snapshot.docs.map(doc => ({id: doc.id, ...doc.data()}));
    
})