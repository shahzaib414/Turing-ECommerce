var http = require('http')
var express = require('express')
var bodyParser = require ('body-parser')
var cors = require('cors')
const app = express()
var stripe = require("stripe")("sk_test_lomdOfxbm7QDgZWvR82UhV6D");

var routes = require('./routes/routes')
var morgan  = require('morgan')

stripe.webhookEndpoints.create({
  url: "https://49c4e196.ngrok.io/stripe/webhooks",
  enabled_events: ["charge.failed", "charge.succeeded"]
}, function(err, webhookEndpoint) {
    if (err) {
        console.log(err)
    }
    else {
        console.log(webhookEndpoint)
    }
});

app.use(bodyParser.urlencoded({ extended: true }))

app.use(bodyParser.json())
app.use(morgan('combined'))

routes(app)
app.use(function(req, res){
  res.send(404);
});
app.listen(3000, () => {
    console.log(`server running on port 3000`)
  });