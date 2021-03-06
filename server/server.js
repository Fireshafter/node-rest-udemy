require('./config')

// Imports
const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const auth = require('./auth')

const app = express()

// Middlewares
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())

// Routes
app.use('/usuario', auth.verificaToken, require('../routes/usuario'))
app.use('/login', require('../routes/login'))

mongoose.connect('mongodb://localhost/cafe',
    {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
        useFindAndModify: false
    },
    (err, res) =>{
        if(err) throw err

        let info = res.connections[0]

        console.log(`Se ha conectado a la BBDD "${info.name}" como usuario "${info.user || 'anónimo'}" en [${info.client.s.url}]`)
    })

app.listen(process.env.PORT, () => console.log(`Servidor iniciado en el puerto ${process.env.PORT}`))