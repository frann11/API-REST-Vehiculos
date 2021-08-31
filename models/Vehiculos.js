const mongoose = require('mongoose')
mongoose.Promise = global.Promise;

const vehiculosSchema = new mongoose.Schema({
    nombre:{
        type: String,
        trim: true,
        required : true
    },
    marca:{
        type: String,
        trim: true,
        required : true
    },
    anio:{
        type: Number,
        trim: true,
        required : true
    },
    descripcion:{
        type: String,
        trim:true,
        default: 'nok'
    },
    vendido:{
        type:Boolean,
        trim:true,
        default: false
    },
    creado:{type: Date,
        default: Date.now
    }, 
    actualizado:{
        type:Date
    } 
})

vehiculosSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})


module.exports = mongoose.model('Vehiculos', vehiculosSchema)