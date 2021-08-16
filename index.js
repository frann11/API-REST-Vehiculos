const express = require('express')
const routes= require('./routes')
const vehiculosRoutes = require('./routes/vehiculosRoutes')
const mongoose=require('mongoose')
var bodyParser  = require('body-parser');
require('./config/db')
//const MongoStore=require('connect-mongo')

const app = express();
app.use(express.urlencoded({extended: true})); 
app.use(express.json());

app.use('/',routes())
app.use('/api/vehiculos',vehiculosRoutes())


const host = '0.0.0.0'
const port = process.env.PORT

const server = app.listen(port,host, () => {
    console.log(`el servidor esta funcionando`)
  })