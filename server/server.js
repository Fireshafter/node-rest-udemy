const express = require('express')
const app = express()

const port = process.env.PORT || 3000

app.get('/', (req, res) => res.json({nombre: 'Rubén', apellidos: 'Cabrera Royo', edad: 21}))

app.listen(port, () => console.log(`Servidor iniciado en el puerto ${port}`))