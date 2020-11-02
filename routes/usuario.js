const express = require('express')
const Usuario = require('../models/usuario')
const bcrypt = require('bcrypt')
const colors = require('colors')
const _ = require('underscore')
const auth = require('../server/auth')
const usuario = require('../models/usuario')

const app = express()


app.get('/', async (req, res) => {

    let page = Number(req.query.page) || 0
    let limit = Number(req.query.limit) || 5

    const usuarios = await Usuario.find({estado: true}, 'nombre email role google img')
        .skip(limit * page)
        .limit(limit)
        .catch(err => res.status(404).json({ok: false, err}))

    const count = await Usuario.count({estado: true})
        .catch(err => res.status(404).json({ok: false, err}))

    res.json({ok: true, usuarios, count})
})

app.get('/totalsize', async (req, res) => {

    res.json({ok: true, totalsize: await Usuario.count({estado: true})})
})

app.get('/:id', (req, res) => {
    res.status(200).json({conexion: 'correcta', id: req.params.id})
})

app.post('/', auth.verificaAdmin, (req, res) => {

    let usuario = new Usuario({
        nombre: req.body.nombre,
        email: req.body.email,
        password: (req.body.password !== undefined)? bcrypt.hashSync(req.body.password, 10) : undefined,
        role: req.body.role
    })

    usuario.save((err, doc) => {
        if(err) {

            let errores = []

            console.log('\n' + ' ¡¡¡ Error al crear usuario !!! '.black.bgRed)
            
            for (let i = 0; i < Object.keys(err.errors).length; i++) {
                const error = err.errors[Object.keys(err.errors)[i]].properties;
                
                errores.push({
                    code: 0,
                    message: `*Error en ${error.path}: [${error.value}] (${error.message})`
                })
                console.log(errores[i].message.red);   
            }
            
            res.status(400).json({ok: false, errores})
            return
        }

        console.log('\n' + ' ¡¡¡ Usuario creado correctamente !!! '.black.bgGreen)
        console.log(doc)

        res.status(201).json({ok: true, doc})
    })


})

app.put('/:id', auth.verificaAdmin, (req, res) => {

    let updateData = _.pick(req.body, ['nombre', 'email', 'img', 'role', 'estado'])

    Usuario.findByIdAndUpdate(req.params.id, updateData, { new: true, runValidators: true, context: 'query' }, (err, doc) => {
        
        if(err) return res.status(400).json({ok: false, err})

        res.status(200).json({ok: true, doc})
    })

})

app.delete('/:id', auth.verificaAdmin, async (req, res) => {

    const id = req.params.id

    const usuarioBorrado = await Usuario.findByIdAndUpdate(id, {estado: false}, {new: true})
        .catch(err => res.status(400).json({ok: false, err}))

    if(!usuarioBorrado)
        return res.status(404).json({ok: false, err: {message: `El usuario con id: ${id} no existe en la base de datos`}})

    res.json({ok: true, usuario: usuarioBorrado})
})

module.exports = app