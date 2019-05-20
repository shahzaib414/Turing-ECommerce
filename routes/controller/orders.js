const authToken = require('../middleware/authToken')
const auth = require('../../config/auth')
var ErrorResponse = require('../../utils/errorHandling/errorResponse')
var ErrorCode = require('../../utils/errorHandling/errorCodes')
var Sequelize = require('../../models/sequelize')
var http = require('http')
var nodeMailer = require('nodemailer')

/**
 * Create Order and Clear Shopping Cart
 */

exports.CreateOrder = (request, response) => {
    let token = request.headers['x-access-token'] || request.headers[auth.AUTH_HEADER];
    if (token) {
        if (authToken.validateToken(token)) {
            if (typeof request.body.cart_id != 'undefined' && typeof request.body.shipping_id != 'undefined' && typeof request.body.tax_id != 'undefined') {
                var products = []
                
                var cart_id = request.body.cart_id
                var shipping_id = request.body.shipping_id
                var tax_id = request.body.tax_id
                var promises = []
                var status = typeof request.body.status != 'undefined' ? request.body.status : 1
                var comments = typeof request.body.comments != 'undefined' ? request.body.comments : "Order Comments"
                var customer_id = typeof request.body.customer_id != 'undefined' ? request.body.customer_id : 1
                var auth_code = typeof request.body.auth_code != 'undefined' ? request.body.auth_code : "111"
                var reference = typeof request.body.reference != 'undefined' ? request.body.reference : "Order reference"
                var shipping_id = typeof request.body.shipping_id != 'undefined' ? request.body.shipping_id : 2
                var tax_id = typeof request.body.tax_id != 'undefined' ? request.body.tax_id : 1

                var SqlQuery = "Select shopping_cart.product_id, shopping_cart.quantity, shopping_cart.attributes,"+
                "product.name, product.price, shopping_cart.quantity * product.price as totalPrice " + 
                "from shopping_cart " +
                "join product on shopping_cart.product_id = product.product_id " +
                "where cart_id = '"+cart_id+"';"
                Sequelize.initSequelize.query(SqlQuery)
                .then((results) => {
                    Sequelize.OrdersModel.create({
                        cart_id: cart_id,
                        shipping_id: shipping_id,
                        tax_id: tax_id,
                        total_amount: CalculateAmount(results),
                        status: status,
                        comments: comments,
                        customer_id: customer_id,
                        auth_code: auth_code,
                        reference: reference
                    })
                        .then((result) => {
                            promises = []
                            var order_id = result.order_id
                            for (var index in results[0]) {
                                var promise = new Promise(function (res, rej) {
                                    Sequelize.OrderDetailsModel.create({
                                        order_id: order_id,
                                        product_id: results[0][index].product_id,
                                        attributes: results[0][index].attributes,
                                        product_name: results[0][index].name,
                                        quantity: results[0][index].quantity,
                                        unit_cost: results[0][index].price
                                    }).then((orderObject) => {
                                        res()

                                    })
                                })
                                promises.push(promise)
                            }
                            Promise.all(promises)
                                .then(() => {
                                    /**
                                     * Call Empty Cart API 
                                     */
                                    var options = {
                                        host: "localhost",
                                        port: 3000,
                                        path: '/shoppingcart/empty/'+cart_id,
                                        method: 'DELETE'
                                      };
                                      
                                      http.request(options, function(res) {
                                        res.setEncoding('utf8');
                                        res.on('data', function (chunk) {
                                          console.log('BODY: ' + chunk);
                                        });
                                      }).end();

                                      SendEmail("Your Order No:"+order_id+" is confirmed")
                                    response.json({
                                        order_id: order_id
                                    })
                                })
                        })
                })

            } else {
                response.json(ErrorResponse.getErrorMessageObject(ErrorCode.USERS.REQUIRED_FIELDS, "Cart ID / Shipping ID / Tax ID"))
            }
        }
        else {
            response.json(ErrorResponse.getErrorMessageObject(ErrorCode.AUTHENTICATION.UNAUTHORIZED, "Auth Token"))
        }
    }
    else {
        response.json(ErrorResponse.getErrorMessageObject(ErrorCode.AUTHENTICATION.EMPTY_CODE, "Auth Token"))
    }
}

/**
 * Get information about order
 */

exports.getOrderInfo = (request, response) => {
    let token = request.headers['x-access-token'] || request.headers[auth.AUTH_HEADER];
    if (token) {
        if (authToken.validateToken(token)) {
            if (typeof request.params.order_id != 'undefined') {
                Sequelize.OrdersModel.findOne({
                    attributes: [
                        'order_id',
                        'total_amount',
                        'created_on',
                        'shipped_on',
                        'status'
                    ],
                    where: {
                        order_id: request.params.order_id
                    }
                })
                    .then((result) => {
                        response.json(result)
                    })
            }
            else {
                response.json(ErrorResponse.getErrorMessageObject(ErrorCode.USERS.REQUIRED_FIELDS, "Order ID"))
            }
        }
        else {
            response.json(ErrorResponse.getErrorMessageObject(ErrorCode.AUTHENTICATION.UNAUTHORIZED, "Auth Token"))
        }
    }
    else {
        response.json(ErrorResponse.getErrorMessageObject(ErrorCode.AUTHENTICATION.EMPTY_CODE, "Auth Token"))
    }
}

/**
 * Get Orders by ID
 */

exports.getOdrderByID = (request, response) => {
    let token = request.headers['x-access-token'] || request.headers[auth.AUTH_HEADER];
    if (token) {
        if (authToken.validateToken(token)) {
            if (typeof request.params.order_id != 'undefined') {
                Sequelize.OrderDetailsModel.findAll({
                    where: {
                        order_id: request.params.order_id
                    }
                })
                    .then((result) => {
                        response.json(result)
                    })
            }
            else {
                response.json(ErrorResponse.getErrorMessageObject(ErrorCode.USERS.REQUIRED_FIELDS, "Order ID"))
            }
        }
        else {
            response.json(ErrorResponse.getErrorMessageObject(ErrorCode.AUTHENTICATION.UNAUTHORIZED, "Auth Token"))
        }
    }
    else {
        response.json(ErrorResponse.getErrorMessageObject(ErrorCode.AUTHENTICATION.EMPTY_CODE, "Auth Token"))
    }
}

/**
 * Get Order by Customer 
 */

exports.getOdrderByCustomer = (request, response) => {
    let token = request.headers['x-access-token'] || request.headers[auth.AUTH_HEADER];
    if (token) {
        if (authToken.validateToken(token)) {
            Sequelize.OrdersModel.findAll()
                .then((result) => {
                    response.json(result)
                })

        }
        else {
            response.json(ErrorResponse.getErrorMessageObject(ErrorCode.AUTHENTICATION.UNAUTHORIZED, "Auth Token"))
        }
    }
    else {
        response.json(ErrorResponse.getErrorMessageObject(ErrorCode.AUTHENTICATION.EMPTY_CODE, "Auth Token"))
    }
}
/**
 * Calculate total Amount for Order
 * @param {*} data 
 */
function CalculateAmount(data) {
    var totalAmount =0;

    for (var index in data[0]) {
        totalAmount = totalAmount + Number(data[0][index].totalPrice);
    }
    return totalAmount
}

/**
 * 
 * @param {*} emailContent 
 */

function SendEmail (emailContent) {
    let transporter = nodeMailer.createTransport({
        service: 'Gmail',
        auth: {
            user: 'shahzaib.shahid414@gmail.com',
            pass: 'Speed1822414'
        }
    });
    let mailOptions = {
        from: 'shahzaib.shahid414@gmail.com',
        to: "shahzaib.shahid414@gmail.com", 
        subject: "Order Confirmation", 
        text: emailContent, 
        html: emailContent 
    };
    transporter.sendMail(mailOptions, (err, info) => {
        if (!err) {

        } 
        else {
            console.log(err)
        }
    })
}