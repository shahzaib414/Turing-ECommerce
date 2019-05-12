var stripe = require("stripe")("sk_test_lomdOfxbm7QDgZWvR82UhV6D");
const authToken = require('../middleware/authToken')
const auth = require('../../config/auth')
var ErrorResponse = require('../../utils/errorHandling/errorResponse')
var ErrorCode = require('../../utils/errorHandling/errorCodes')
var Sequelize = require('../../models/sequelize')

exports.getStripeToken = (request, response ) => {
    let token = request.headers['x-access-token'] || request.headers[auth.AUTH_HEADER];
    if (token) {
        if (authToken.validateToken(token)){
            stripe.tokens.create({
                card: {
                  number: '4242424242424242',
                  exp_month: 12,
                  exp_year: 2020,
                  cvc: '123'
                }
              }, function(err, token) {
                response.json({
                    token : token
                })
              })
        }
        else {
            response.json(ErrorResponse.getErrorMessageObject(ErrorCode.AUTHENTICATION.UNAUTHORIZED,"Auth Token"))
        }
    }
    else {
        response.json(ErrorResponse.getErrorMessageObject(ErrorCode.AUTHENTICATION.EMPTY_CODE,"Auth Token"))
    }
}

exports.charge = (request, response) => {
    let token = request.headers['x-access-token'] || request.headers[auth.AUTH_HEADER];
    if (token) {
        if (authToken.validateToken(token)){
            if (typeof request.body.stripeToken != 'defined' && typeof request.body.order_id != 'undefined'
            && typeof request.body.description != 'defined' && typeof request.body.amount != 'defined'){
                var stripeToken  = request.body.stripeToken
                var order_id = request.body.order_id 
                var description = request.body.description
                var amount = request.body.amount
                var currency = typeof request.body.currency != 'undefined' ? request.body.currency  : USD
                stripe.charges.create({
                    amount: amount,
                    currency: currency,
                    description: description,
                    source: stripeToken,
                    capture: true,
                    metadata: {'order_id': order_id}
                  }).then((result) => {
                    response.json(result)
                  });
                  
            }
            else {
                response.json(ErrorResponse.getErrorMessageObject(ErrorCode.USERS.REQUIRED_FIELDS,"Stripe token / order id / description / amount"))
            }
        }
        else {
            response.json(ErrorResponse.getErrorMessageObject(ErrorCode.AUTHENTICATION.UNAUTHORIZED,"Auth Token"))
        }
    }
    else {
        response.json(ErrorResponse.getErrorMessageObject(ErrorCode.AUTHENTICATION.EMPTY_CODE,"Auth Token"))
    }
}

exports.stripeWebhooks = (request, response) => {
    
     // console.log(request.body)
    /* Do something with eventJson */
    // Return a response to acknowledge receipt of the event
    response.send(200);
}
