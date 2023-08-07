const express = require('express')
const morgan =require('morgan')

//console.log('app.js started')

const app = express()
 
app.use(express.json()) 
app.use(morgan('dev'))

//routes
const userRoutes = require('./routes/user.route')
const repairRoutes = require('./routes/repair.route')
  
//rutas
app.use('/api/v1/users',userRoutes)
app.use('/api/v1/repairs',repairRoutes)

module.exports = app; 