//Llamado de express para el servidor
const express = require('express');
//importacion de la rutas de usuario
const userRouter = require('./userRouters.js')
const computerRouter = require('./computersRouters.js')

function routerAPI(app){
    const router = express.Router();
    app.use('/api/v1/', router);
    router.use('/users',userRouter);
    router.use('/computers',computerRouter);
}
//exportacion de la funcoin routerAPI
module.exports = routerAPI;