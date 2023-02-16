const express = require('express')

import productsRouter from './routes/products.js'
import cartsRouter from './routes/carts.js'
import { engine } from 'express-handlebars'

const viewrouter = require('./routes/views.router.js' ) 
const app = express ()
const PORT = 8080
const hanblebars = require('express-hanblebars')
const {Server}= require('socket.io')

app.use(express.json())
app.use(express.urlencoded({extended:true}))

app.use('/api/products', productsRouter)
app.use('/api/carts', cartsRouter)
app.use('/public' ,express.static(__dirname+'/public'))

app.engine('handlebars', hanblebars.engine())
app.set('views' ,__dirname+ '/views')
app.set('views engine' ,'hanblebars')

app.use('/.',viewrouter)



const httpServer = app.listen(PORT, (err) => {
    if (err) console.log(err);
    console.log('Escuchando puerto: ', PORT);
  })
  
  httpServer.on
  
  const io = new Server(httpServer)

  io.on('connection', socket => {
    console.log('Usuario conectado')


    socket.on('disconnect', () => {
      console.log('Usuario desconectado')
    })
  })