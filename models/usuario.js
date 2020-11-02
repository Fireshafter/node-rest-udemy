const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')

let Schema = mongoose.Schema

let rolesValidos = {
    values: ['ADMIN_ROLE', 'USER_ROLE'],
    message: '{VALUE} no es un rol válido'
}


let usuarioSchema = new mongoose.Schema({
    nombre:{
        type: String,
        required: [true, 'El nombre es necesario']
    },
    email:{
        type: String,
        unique: true,
        required: [true, 'El correo es necesario']
    },
    password:{
        type: String,
        required: [true, 'La contraseña es obligatoria']
    },
    img:{
        type: String
    },
    role:{
        type: String,
        default: 'USER_ROLE',
        enum: rolesValidos
    },
    estado:{
        type: Boolean,
        default: true
    },
    google:{
        type: Boolean,
        default: false
    }
})

usuarioSchema.plugin(uniqueValidator, {message: 'No pueden haber dos personas registradas con el mismo correo'})

module.exports = mongoose.model('usuario', usuarioSchema)