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

const app = express();

//export las rutas
module.exports = router;