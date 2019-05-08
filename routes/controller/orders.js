const authToken = require('../middleware/authToken')
const auth = require('../../config/auth')
var ErrorResponse = require('../../utils/errorHandling/errorResponse')
var ErrorCode = require('../../utils/errorHandling/errorCodes')
var Sequelize = require('../../models/sequelize')

exports.CreateOrder = (request, response) => {
    let token = request.headers['x-access-token'] || request.headers[auth.AUTH_HEADER];
    if (token) {
        if (authToken.validateToken(token)){
            if (typeof request.body.cart_id != 'undefined' && typeof request.body.shipping_id != 'undefined' && typeof request.body.tax_id != 'undefined'){
                var cart_id = request.body.cart_id
                var shipping_id = request.body.shipping_id 
                var tax_id = request.body.tax_id
                var total_amount = typeof request.body.total_amount != 'undefined' ?  request.body.total_amount : 0
                var status = typeof request.body.status != 'undefined' ?  request.body.status : 1
                var comments = typeof request.body.comments != 'undefined' ?  request.body.comments : "Order Comments"
                var customer_id = typeof request.body.customer_id != 'undefined' ?  request.body.customer_id : 1
                var auth_code = typeof request.body.auth_code != 'undefined' ?  request.body.auth_code : "111"
                var reference = typeof request.body.reference != 'undefined' ?  request.body.reference : "Order reference"
                var shipping_id = typeof request.body.shipping_id != 'undefined' ?  request.body.shipping_id : 2
                var tax_id = typeof request.body.tax_id != 'undefined' ?  request.body.tax_id : 1

                var product_id = typeof request.body.product_id != 'undefined' ?  request.body.product_id : 2
                var attributes = typeof request.body.attributes != 'undefined' ?  request.body.attributes : "Product Attributes"
                var product_name = typeof request.body.product_name != 'undefined' ?  request.body.product_name : "Product Name"
                var quantity = typeof request.body.quantity != 'undefined' ?  request.body.quantity : 2
                var unit_cost = typeof request.body.unit_cost != 'undefined' ?  request.body.unit_cost : 1.2

                Sequelize.OrdersModel.create({
                    cart_id : cart_id,
                    shipping_id: shipping_id,
                    tax_id : tax_id,
                    total_amount : total_amount,
                    status : status,
                    comments : comments,
                    customer_id :  customer_id,
                    auth_code : auth_code,
                    reference : reference
                })
                .then((result) => {
                    Sequelize.OrderDetailsModel.create({
                        order_id : result.order_id,
                        product_id :product_id,
                        attributes : attributes,
                        product_name  : product_name,
                        quantity :quantity,
                        unit_cost : unit_cost
                    })
                    .then((orderObject) => {
                        response.json( {
                            order_id : orderObject.order_id
                        })
                    })
                })
                
            } else {
                response.json(ErrorResponse.getErrorMessageObject(ErrorCode.USERS.REQUIRED_FIELDS,"Cart ID / Shipping ID / Tax ID"))
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
exports.getOrderInfo = (request, response) => {
    let token = request.headers['x-access-token'] || request.headers[auth.AUTH_HEADER];
    if (token) {
        if (authToken.validateToken(token)){
            if (typeof request.params.order_id != 'undefined' ) {
                Sequelize.OrdersModel.findOne( {
                    attributes: [
                        'order_id',
                        'total_amount',
                        'created_on' ,
                        'shipped_on',
                        'status'
                     ],
                    where : {
                        order_id : request.params.order_id
                    }
                })
                .then((result) => {
                    response.json(result)
                })
            }
            else {
                response.json(ErrorResponse.getErrorMessageObject(ErrorCode.USERS.REQUIRED_FIELDS,"Order ID"))
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
exports.getOdrderByID  = (request, response) => {
    let token = request.headers['x-access-token'] || request.headers[auth.AUTH_HEADER];
    if (token) {
        if (authToken.validateToken(token)){
            if (typeof request.params.order_id != 'undefined' ) {
                Sequelize.OrderDetailsModel.findOne( {
                    where : {
                        order_id : request.params.order_id
                    }
                })
                .then((result) => {
                    response.json(result)
                })
            }
            else {
                response.json(ErrorResponse.getErrorMessageObject(ErrorCode.USERS.REQUIRED_FIELDS,"Order ID"))
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
exports.getOdrderByCustomer = (request, response) => {
    let token = request.headers['x-access-token'] || request.headers[auth.AUTH_HEADER];
    if (token) {
        if (authToken.validateToken(token)){
            Sequelize.OrdersModel.findAll( )
            .then((result) => {
                response.json(result)
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