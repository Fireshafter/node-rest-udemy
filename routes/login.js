const express = require('express')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const Usuario = require('../models/usuario')

const app = express()


app.post('/', async (req, res) => {

    let usuario

    if(req.body.email && req.body.password) usuario = await Usuario.findOne({email: req.body.email}).catch(err => res.status(500).json({ok: false, err}))

    console.log(usuario)

    if(usuario && bcrypt.compareSync(req.body.password, usuario.password)){

        const token = jwt.sign({usuario}, process.env.TOKEN_SEED, {expiresIn: process.env.TOKEN_EXPIRE})

        console.log(process.env.TOKEN_EXPIRE);

        res.json({ok: true, token})
    }
    else{
        res.status(400).json({ok: false, message: 'El usuario y/o la contraseña son incorrectos'})
    }

})


module.exports = app