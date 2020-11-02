// Puerto
process.env.PORT = process.env.PORT || 3000

// Entorno
process.env.NODE_ENV = process.env.NODE_ENV || 'dev'

// JWT Token Config
process.env.TOKEN_EXPIRE = 2592000000 // Fecha de expiración = 30 días
process.env.TOKEN_SEED = process.env.TOKEN_SEED || 'este-es-el-seed-desarrollo' // Semilla de autenticación