const express = require('express');
const router = express.Router();
const { db } = require('./../bd/firebase.js');
const { async } = require('@firebase/util');

router.get('/',async(req,res) =>{
    const snapshot = await db.collection('user').get();
    const users = snapshot.docs.map(doc => ({id: doc.id, ...doc.data()}));
    res.json({mensaje:'ok'});

})
router.post('/',async(req,res) =>{
    const newUser = req.body;
    const docRef = await db.collection('users').add(newUser);
    const user = { id:docRef.id, ...newUser };
    res.json(user);
})
//export las rutas
module.exports = router;