const jwt = require('jsonwebtoken')

// VerificarToken
const verificaToken = (req, res, next) => {

    let token = req.get('Authorization-Token')

    jwt.verify(token, process.env.TOKEN_SEED, (err, decoded) => {

        if (err) return res.status(401).json({ok: false, err: { message: 'No tienes acceso para realizar esta llamada sin un token válido' }})

        req.usuario = decoded.usuario
        next()

    })

}

const verificaAdmin = (req, res, next) => {

    if(req.usuario.role === 'ADMIN_ROLE')
        next()
    else
        res.status(401).json({ok: false, err: { message: 'No tienes acceso para realizar esta llamada sin privilegios de administrador' }})

}

module.exports = { verificaToken, verificaAdmin }