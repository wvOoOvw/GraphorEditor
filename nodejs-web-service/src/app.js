const express = require('express')
const compression = require('compression')
const http = require('http')

const app = express()
app.use(compression())
app.use(express.json({ limit: '1mb' }))
app.use(express.urlencoded({ limit: '1mb', extended: false }))

app.use('/', (req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*")
  res.header("Access-Control-Allow-Headers", "*")
  res.header("Access-Control-Allow-Methods", "*")
  next()
})

app.use(express.static('public'))
app.use('/', require('./router.main.server'))
app.use('/', require('./router.mongo.server'))

http.createServer(app).listen(80)