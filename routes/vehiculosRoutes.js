const express = require('express')
const router = express.Router()
const vehiculosController = require('../controllers/vehiculosController')
const { check, validationResult } = require('express-validator');


require('dotenv').config({path:'variables.env'});

module.exports = () =>{
    router.get('/', vehiculosController.mostrarVehiculos)
    router.post('/', 
    [        
        check("nombre", "Nombre debe contener un valor").trim().not().isEmpty(),
        check("marca", "marca debe contener un valor").trim().not().isEmpty().isAlphanumeric(),
        check("anio", "año debe contener un valor numerico").trim().not().isEmpty().isInt(),
        check("descripcion").trim().escape(),
    ],
    (req, res) => {
        try {
            validationResult(req).throw();
             vehiculosController.agregarVehiculo(req,res)
          } catch (err) {
            res.status(400).json(err);
          }
        }
)
    
    
    router.get('/buscar', 

    (req, res) => {
        try {
            validationResult(req).throw();
            vehiculosController.buscarVehiculo(req,res)
          } catch (err) {
            res.status(400).json(err);
          }
        }
)
    router.get('/:id',[        
        check("id", "id debe ser valido").isAlphanumeric(),
    ],
    (req, res) => {
        try {
            validationResult(req).throw();
            vehiculosController.encontrarPorId(req,res)
          } catch (err) {
            res.status(400).json(err);
          }
        }
)
    router.put('/:id',
    [        
        check("nombre", "Nombre debe contener un valor").trim().not().isEmpty(),
        check("marca", "marca debe contener un valor").trim().not().isEmpty(),
        check("anio", "año debe contener un valor").trim().not().isEmpty().isInt(),
        check("descripcion").trim().escape(),
    ],
    (req, res) => {
        try {
            validationResult(req).throw();
            vehiculosController.actualizar(req,res)
          } catch (err) {
            res.status(400).json(err);
          }
        }
)
    
    router.patch('/:id', vehiculosController.actualizarVehiculo)
    router.delete('/:id',[        
        check("id", "id debe ser valido").isAlphanumeric(),
    ],
    (req, res) => {
        try {
            validationResult(req).throw();
            vehiculosController.borrarVehiculo(req,res)
          } catch (err) {
            res.status(400).json(err);
          }
        }
    )
 
    return router 
}