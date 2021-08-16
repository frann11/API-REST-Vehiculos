const express = require('express')

const vehiculosController = require('../controllers/vehiculosController')
const mongoose = require('mongoose')
const Autos = require('../models/Vehiculos')
const router = express.Router()
const { check, validationResult } = require('express-validator');

//mongoose.connect(process.env.DATABASE, {useNewUrlParser:true})

module.exports = () =>{
    router.get('/', (req,res)=>res.send('funciona'))
     return router 
}