// Suggested code may be subject to a license. Learn more: ~LicenseLog:1393978351.
const express = require('express');
const cors = require('cors')
// Suggested code may be subject to a license. Learn more: ~LicenseLog:2864940723.
// Suggested code may be subject to a license. Learn more: ~LicenseLog:1652079927.
const bodyParser = require('body-parser')
//require('dotenv').config();
//const { db } = require('./firebaseConfig');
const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
//Usar body-parser middleware para parsear cuerpos de solicitudes Json
//app.use(bodyParser.json());
//import routes
//const userRouters = require('./routers/userRouers');
//const computerRouters = require('./routers/computersRouters');
//const ticketRouters= require('./routers/ticcketsRouters');

//Use routers
//app.use('/api/users',userRouters);
//app.use('/api/computers',computerRouters);
//app.use('/api/tickets',ticketRouters);

app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto: ${PORT}`)
})