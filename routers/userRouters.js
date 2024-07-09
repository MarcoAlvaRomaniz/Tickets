//llamado de express
const express = require('express');
//metodo router de express
const router = express.Router();
//importacin del servicio
const User = require('../Services/users.services.js')
//importacion multer
const multer = require('multer')
//se crea una instancia para multer para cuando no se reciben archivos
const uploadNone = multer();
//instancia para la clase de usuarios
const user = new User();

//rutas para la funcion
router.get('/',async(req,res,next)=>{
    try{
        const getAllUsers = await user.getAll();
        res.status(200).json(getAllUsers);
    }catch(error){
        next(error);
    }
})
router.get('/:id',async(req,res,next)=>{
    const { id }= req.params;
    try{
        const getUser = await user.getOne(id);
        res.status(200).json(getUser)        
    }catch(error){
        next(error);
    }
})
router.post('/',uploadNone.none(),async(req,res,next)=>{
    try{
        let data = req.body;
        console.log('[Prueba de llegada]',data);
        let newUser = await user.create(data);
        res.status(201).json(newUser);
    }catch(error){
        next(error);
    }
})

//

//export las rutas
module.exports = router;