require('./server/config')

// Imports
const express = require('express')
const bodyParser = require('body-parser')

const app = express()

// Middlewares
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())

app.get('/', (req, res) => {
    let body = req.body

    if(body.nombre !== undefined){
        res.status(200).json({
            recibido: true,
            body
        })
    }
    else{
        res.status(400).json({
            error: 7,
            message: 'Esto tendría que dar error'
        })
    }

})

app.listen(process.env.PORT, () => console.log(`Servidor iniciado en el puerto ${process.env.PORT}`))