const mongoose = require('mongoose')
const Vehiculos = require('../models/Vehiculos')


exports.mostrarVehiculos = async(req,res,next) =>{
  try {
    await Vehiculos.find({}).then(vehiculos => {
      if (!vehiculos.length){
        throw new Error('No hay vehiculos para mostrar')
      }
      res.json(vehiculos)
    })
  } catch (err){
    res.status(400).json({'errors':[{'msg':err.message}]});
  }
  }

exports.agregarVehiculo = async(req,res) =>{
  try {
   // console.log(req.body.vendido)
   var vendido
   var valores = {}
   valores['nombre'] = (req.body.nombre) 
   valores['marca']=(req.body.marca)
   valores['anio']=(req.body.anio)
   
   if (req.body.vendido.length){
     if (req.body.vendido.toLowerCase() == 'true'){
       vendido = true
       valores['vendido'] = true
     } 
     else if (req.body.vendido.toLowerCase() == 'false'){
      vendido = false
    } else {
      {
        throw Error('vendido debe ser true o false')
      }
    }
   } 
   
   
   req.body.hasOwnProperty('descripcion') ? valores['descripcion']=(req.body.descripcion) : ''
    const vehiculo = new Vehiculos(valores)
    await vehiculo.save().then(result =>  { 
        res.json('agregado correctamente')
    })
  } catch (err){
    res.status(400).json({'errors':[{'msg':err.message}]});
  }
  }

exports.buscarVehiculo = async (req,res) =>{
    try {
    const querys = {}
    req.query.nombre ? querys['nombre'] = (req.query.nombre) : ''
    req.query.anio ?  querys['anio'] = parseInt(req.query.anio) : ''
    (req.query.vendido == 'true' || req.query.vendido == 'false') ? querys['vendido'] = req.query.vendido : ''
      
    if (Object.keys(querys).length === 0){
      throw(res.status(400).json({error:'debe ingresar un query valido'}))
    }
  
  await Vehiculos.find(querys).then(vehiculo => {
    if (!vehiculo.length){
      throw Error ('no se encontro ningun vehiculo')
    }
    res.json(vehiculo)

  })} catch(err){
    res.status(400).json({'errors':[{'msg':error.message}]});
  }
  }

exports.borrarVehiculo = async (req,res,next) => {

  try { 
    const id  = req.params.id;
    const comprobar = Vehiculos.findById(id)
    if (!comprobar.length){
      throw Error('No hay vehiculo con esa id')
    }
    await Vehiculos.findByIdAndDelete(id);
    
    res.status(200).json('Vehiculo Eliminado Correctamente')
  
    } catch (err) {
      res.status(400).json({'errors':[{'msg':error.message}]});
    }

   
}

exports.actualizarVehiculo = async (req,res,next) => {
    try {
      const id = req.params.id
      var valores = {}
      req.body.hasOwnProperty('nombre') ? valores['nombre']=req.params.nombre : ''
      req.body.hasOwnProperty('marca') ? valores['marca']=req.params.marca : ''
      req.body.hasOwnProperty('anio') ? valores['anio']=req.params.anio : ''
      if (req.body.hasOwnProperty('vendido') && (req.body.vendido != true || req.body.vendido != false)){
        throw new Error('vendido debe ser true o false')
      } else if (req.body.hasOwnProperty('vendido')) {
        valores['vendido']=req.params.vendido 
      }
      req.body.hasOwnProperty('descripcion') ? valores['descripcion']=(req.body.descripcion) : ''
      valores['actualizado'] = Date.now()
      await Vehiculos.findByIdAndUpdate(id, valores, {new: true}).then(auto => {
          res.json('actualizado correctamente')
      })} catch (err){
        res.status(400).json({'errors':[{'msg':error.message}]});
      }
    }

exports.actualizar = async (req,res,next) => {
    try {const id = req.params.id
    var valores = {}
    var original = await Vehiculos.findById(id).lean()

      if (!req.body.nombre || !req.body.marca || !req.body.anio){
        throw new Error('Nombre marca y año son parametros obligatorios')
      }

    valores['nombre'] = (req.body.nombre) 
    valores['marca']=(req.body.marca)
    valores['anio']=(req.body.anio)
    valores['creado'] = original.creado
    valores['actualizado'] = Date.now()

    req.body.hasOwnProperty('vendido') ? valores['vendido']=(req.body.vendido) : ''
    req.body.hasOwnProperty('descripcion') ? valores['descripcion']=(req.body.descripcion) : ''

    await Vehiculos.replaceOne({ _id: id },valores).then(auto => {
        res.send('actualizado correctamente')
        })}
      catch (err){
        res.status(400).json(err.name + ': '+err.message);
      }
    }

exports.encontrarPorId= async (req,res) => {
  try{
    Vehiculos.findById(req.params.id).exec().then(vehiculo => {
      if (!vehiculo.length){
        throw new Error('No se encontro vehiculo con ese id')
      }
      res.json(vehiculo)
    })
  }catch (err){
    res.status(400).json(err.name + ': '+err.message);
  }
}
