const routerAPI = require('./routers/index.js');
//referencia de express
const express = require('express');
const app = express();
//manejo de archivos
const fs = require('fs');
//variable para envio de informacion
const {send}=require('process');
const port = process.env.PORT || 3000;
const server =  require('http').Server(app);
//Llamado de cors
const cors = require('cors');
const {logErrors, errorHandler}  = require('./middleware/error.handler.js');
const { log } = require('console');
app.use(cors());
app.use(express.json());
routerAPI(app);
app.use(logErrors);
app.use(errorHandler);
//inicio de estaticos para poder renderizar los archivos de imagen
app.use('/uploads', express.static('uploads'));

// Iniciar el servidor y escuchar en el puerto especificado
app.listen(port, () => {
  console.log(`Servidor ejecutándose en http://localhost:${port}`);
});