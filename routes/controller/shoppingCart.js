const authToken = require('../middleware/authToken')
const auth = require('../../config/auth')
var ErrorResponse = require('../../utils/errorHandling/errorResponse')
var ErrorCode = require('../../utils/errorHandling/errorCodes')
var Sequelize = require('../../models/sequelize')
var randomstring = require("randomstring")
var moment = require('moment');

exports.generateUniqueID = (request, response) => {
    let token = request.headers['x-access-token'] || request.headers[auth.AUTH_HEADER];
    if (token) {
        if (authToken.validateToken(token)) {
            var randomString = randomstring.generate(10);
            response.json({
                cart_id: randomString
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
exports.addProductInCart = (request, response) => {
    let token = request.headers['x-access-token'] || request.headers[auth.AUTH_HEADER];
    if (token) {
        if (authToken.validateToken(token)) {
            if (typeof request.body.cart_id != 'undefined' && typeof request.body.product_id != 'product_id' && typeof request.body.attributes != 'undefined') {
                var cart_id = request.body.cart_id
                var product_id = request.body.product_id
                var attributes = request.body.attributes
                var buy_now = typeof request.body.buy_now != 'undefined' ? request.body.buy_now : 1
                var quantity = typeof request.body.quantity != 'undefined' ? request.body.quantity : 1
                Sequelize.ShoppingCartModel.create({
                    cart_id: cart_id,
                    product_id: product_id,
                    attributes: attributes,
                    buy_now: buy_now,
                    quantity: quantity,
                    added_on: moment().format('YYYY-MM-DD hh:mm:ss')
                }).then((result) => {
                    var SqlQuery = "Select item_id,shopping_cart.attributes,shopping_cart.product_id," +
                        "product.name,product.image,product.price,shopping_cart.quantity, product.price*shopping_cart.quantity as subtotal " +
                        "from shopping_cart " +
                        "inner join product on shopping_cart.product_id = product.product_id " +
                        "where cart_id = '" + result.cart_id + "';"
                    Sequelize.initSequelize.query(SqlQuery)
                        .then((list) => {
                            response.json(list[0])
                        })
                })
            }
            else {
                response.json(ErrorResponse.getErrorMessageObject(ErrorCode.USERS.REQUIRED_FIELDS, "Cart_id / product_id / attributes"))
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
exports.getListOfProductByCartID = (request, response) => {
    let token = request.headers['x-access-token'] || request.headers[auth.AUTH_HEADER];
    if (token) {
        if (authToken.validateToken(token)) {
            if (typeof request.params.cart_id != 'undefined') {
                var SqlQuery = "Select item_id,shopping_cart.attributes,shopping_cart.product_id," +
                    "product.name,product.image,product.price,shopping_cart.quantity, product.price*shopping_cart.quantity as subtotal " +
                    "from shopping_cart " +
                    "inner join product on shopping_cart.product_id = product.product_id " +
                    "where cart_id = '" + request.params.cart_id + "';"
                Sequelize.initSequelize.query(SqlQuery)
                    .then((list) => {
                        response.json(list[0])
                    })
            }
            else {
                response.json(ErrorResponse.getErrorMessageObject(ErrorCode.USERS.REQUIRED_FIELDS, "Cart_id"))
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
exports.updateCartItem = (request, response) => {
    let token = request.headers['x-access-token'] || request.headers[auth.AUTH_HEADER];
    if (token) {
        if (authToken.validateToken(token)) {
            if (typeof request.params.item_id != 'undefined' && typeof request.body.quantity != 'undefined') {
                var item_id = request.params.item_id
                var quantity = request.body.quantity
                Sequelize.ShoppingCartModel.update({
                    quantity: quantity
                }, {
                        where: {
                            item_id: item_id
                        }
                    })
                    .then((result) => {
                        var SqlQuery = "Select item_id,shopping_cart.attributes,shopping_cart.product_id," +
                            "product.name,product.image,product.price,shopping_cart.quantity, product.price*shopping_cart.quantity as subtotal " +
                            "from shopping_cart " +
                            "inner join product on shopping_cart.product_id = product.product_id " +
                            "where item_id = '" + request.params.item_id + "';"
                        Sequelize.initSequelize.query(SqlQuery)
                            .then((list) => {
                                response.json(list[0])
                            })
                    })
            }
            else {
                response.json(ErrorResponse.getErrorMessageObject(ErrorCode.USERS.REQUIRED_FIELDS, "item id / quantity"))
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
exports.emptyCart = (request, response) => {
    let token = request.headers['x-access-token'] || request.headers[auth.AUTH_HEADER];
    if (token) {
        if (authToken.validateToken(token)) {
            if (typeof request.params.cart_id != 'undefined') {
                Sequelize.ShoppingCartModel.destroy({
                    where : {
                        cart_id : request.params.cart_id
                    }
                })
                .then(()=> {
                    response.json([])
                })
            } 
            else {
                response.json(ErrorResponse.getErrorMessageObject(ErrorCode.USERS.REQUIRED_FIELDS, "Cart id"))
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
exports.totalAmountInCart = (request, response) => {
    let token = request.headers['x-access-token'] || request.headers[auth.AUTH_HEADER];
    if (token) {
        if (authToken.validateToken(token)) {
            if (typeof request.params.cart_id != 'undefined') {
                var SqlQuery = "Select sum(product.price*shopping_cart.quantity) as totalAmount "+
                "from shopping_cart "+
                "inner join product on shopping_cart.product_id = product.product_id "+
                "where cart_id = '"+request.params.cart_id+"'"
                Sequelize.initSequelize.query(SqlQuery)
                .then((result) => {
                    response.json(result[0])
                })
            } 
            else {
                response.json(ErrorResponse.getErrorMessageObject(ErrorCode.USERS.REQUIRED_FIELDS, "Cart id"))
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
exports.saveForLater = (request, response) => {
    let token = request.headers['x-access-token'] || request.headers[auth.AUTH_HEADER];
    if (token) {
        if (authToken.validateToken(token)) {
            if (typeof request.params.item_id != 'undefined') {
                Sequelize.ShoppingCartModel.update({
                    buy_now : 0
                },{
                    where : {
                        item_id : request.params.item_id
                    }
                })
                .then(()=> {
                    response.json({})
                })
            } 
            else {
                response.json(ErrorResponse.getErrorMessageObject(ErrorCode.USERS.REQUIRED_FIELDS, "item id"))
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
exports.getProductSavedForLatter = (request, response) => {
    let token = request.headers['x-access-token'] || request.headers[auth.AUTH_HEADER];
    if (token) {
        if (authToken.validateToken(token)) {
           if (typeof request.params.cart_id != 'undefined'){
                var SqlQuery = "Select item_id,shopping_cart.attributes,product.name,"+
                "product.price from shopping_cart inner join product on shopping_cart.product_id = product.product_id where buy_now = 0;"
                Sequelize.initSequelize.query(SqlQuery)
                .then((result) => {
                    response.json(result[0])
                })
           }
           else{
            response.json(ErrorResponse.getErrorMessageObject(ErrorCode.USERS.REQUIRED_FIELDS, "cart_id"))
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
exports.removeProductFromCart = (request, response) => {
    let token = request.headers['x-access-token'] || request.headers[auth.AUTH_HEADER];
    if (token) {
        if (authToken.validateToken(token)) {
           if (typeof request.params.item_id != 'undefined'){
               Sequelize.ShoppingCartModel.destroy({
                   where : {
                       item_id : request.params.item_id 
                   }
               })
               .then((result) => {
                   response.json({})
               })
           }
           else {
            response.json(ErrorResponse.getErrorMessageObject(ErrorCode.USERS.REQUIRED_FIELDS, "Item id"))
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