const express = require('express')
const Usuario = require('../models/usuario')
const bcrypt = require('bcrypt')
const colors = require('colors')
const _ = require('underscore')

const app = express()


app.get('/', (req, res) => {
    res.status(200).json({conexion: 'correcta'})
})

app.get('/:id', (req, res) => {
    res.status(200).json({conexion: 'correcta', id: req.params.id})
})

app.post('/', (req, res) => {

    let usuario = new Usuario({
        nombre: req.body.nombre,
        email: req.body.email,
        password: (req.body.password !== undefined)? bcrypt.hashSync(req.body.password, 10) : undefined,
        role: req.body.role
    })

    usuario.save((err, doc) => {
        if(err) {

            let errores = []

            console.log('\n           ' + '     ¡¡¡ Error al crear usuario !!!     '.black.bgRed)
            
            for (let i = 0; i < Object.keys(err.errors).length; i++) {
                const error = err.errors[Object.keys(err.errors)[i]].properties;
                
                errores.push({
                    code: 0,
                    message: `\n*Error en ${error.path}: (${error.value})\n   ${error.message}`
                })
                console.log(errores[i].message.red);   
            }
            
            res.status(400).json(errores)
            return
        }

        console.log('\n           ' + '  ¡¡¡ Usuario creado correctamente !!!  '.black.bgGreen);
        console.log(doc);
        res.status(201).json(doc)
    })


})

app.put('/:id', (req, res) => {

    let updateData = _.pick(req.body, ['nombre', 'email', 'img', 'role', 'estado'])

    Usuario.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true, context: 'query' }, (err, doc) => {
        
        if(err) return res.status(400).json(err)

        res.status(200).json(doc)
    })

})

app.delete('/:id', (req, res) => {

})

module.exports = app