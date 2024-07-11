//llamada a express
const express = require('express');
//metodo router de express
const router = express.Router();
//importacion del servicio
// Suggested code may be subject to a license. Learn more: ~LicenseLog:2643534852.
const Computer = require('../Services/computers.js');
//importacion de multer
const multer = require('multer');
//crear instancia de multer para cuando no se reciben archivos
const uploadNone = multer();
//instancia para la clase de computers
const computers = new Computer();
//rutas para la funcion
router.get('/',async(req,res,next)=>{
    try{
        const getAllComputers = await computers.getAll();
        res.status(200).json(getAllComputers);
    }catch(error){
        next(error);
    }
})
router.get('/:id',async(req,res,next)=>{
    //extraemos primero el id del parametro de la solicitud
    const {id} = req.params;
    try{
        const getOneComputer = await computers.getOne(id);
        res.status(200).json(getOneComputer);
    }catch(error){
        next(error)
    }
})
//export las rutas
module.exports = router;