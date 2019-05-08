var http = require('http')
var express = require('express')
var bodyParser = require ('body-parser')
var cors = require('cors')
const app = express()

var routes = require('./routes/routes')
var morgan  = require('morgan')
app.use(bodyParser.urlencoded({ extended: true }))

app.use(bodyParser.json())
app.use(morgan('combined'))

routes(app)
app.listen(3000, () => {
    console.log(`server running on port 3000`)
  });