const authToken = require('../middleware/authToken')
const auth = require('../../config/auth')
var ErrorResponse = require('../../utils/errorHandling/errorResponse')
var ErrorCode = require('../../utils/errorHandling/errorCodes')
var Sequelize = require('../../models/sequelize')
var sequelize = require('sequelize')

exports.getAttributes = (request, response) => {
    let token = request.headers['x-access-token'] || request.headers[auth.AUTH_HEADER];
    if (token) {
        if (authToken.validateToken(token)) {
            Sequelize.AttributesModel.findAll()
                .then((result) => {
                    if (result != null) {
                        response.json(result)
                    }
                    else {
                        response.json(ErrorResponse.getErrorMessageObject(ErrorCode.USERS.EMPTY, "Attributes"))
                    }
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
exports.getAttributesByID = (request, response) => {
    let token = request.headers['x-access-token'] || request.headers[auth.AUTH_HEADER];
    if (token) {
        if (authToken.validateToken(token)) {
            if (typeof request.params.attribute_id !== 'undefined') {
                Sequelize.AttributesModel.findOne({
                    where: {
                        attribute_id: request.params.attribute_id
                    }
                })
                    .then((result) => {
                        if (result != null) {
                            response.json(result)
                        }
                        else {
                            response.json(ErrorResponse.getErrorMessageObject(ErrorCode.ATTRIBUTE.ID_NOT_EXIST, "Attribute ID"))
                        }

                    })
            }
            else {
                response.json(ErrorResponse.getErrorMessageObject(ErrorCode.USERS.REQUIRED_FIELDS, "Attribute ID"))
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


exports.getAttributeValueByID = (request, response) => {
    let token = request.headers['x-access-token'] || request.headers[auth.AUTH_HEADER];
    if (token) {
        if (authToken.validateToken(token)) {
            if (typeof request.params.attribute_value_id !== 'undefined') {
                Sequelize.Attributes_ValueModel.findOne({
                    where: {
                        attribute_value_id: request.params.attribute_value_id
                    }
                })
                    .then((result) => {
                        if (result != null) {
                            response.json(result)
                        }
                        else {
                            response.json(ErrorResponse.getErrorMessageObject(ErrorCode.ATTRIBUTE_VALUE.ID_NOT_EXIST, "Attribute Value ID"))
                        }

                    })
            }
            else {
                response.json(ErrorResponse.getErrorMessageObject(ErrorCode.USERS.REQUIRED_FIELDS, "Attribute Value ID"))
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
exports.getAttributesWithProductID = (request, response) => {

    let token = request.headers['x-access-token'] || request.headers[auth.AUTH_HEADER];
    if (token) {
        if (authToken.validateToken(token)) {
            if (typeof request.params.product_id !== 'undefined') {
                var SQL = "SELECT attribute_value.attribute_value_id,value ,attribute.name from attribute_value " +
                    "INNER JOIN product_attribute ON attribute_value.attribute_value_id = product_attribute.attribute_value_id " +
                    "INNER JOIN attribute on attribute_value.attribute_id = attribute.attribute_id where product_id = "+request.params.product_id
                    Sequelize.initSequelize.query(SQL).then(([results, metadata]) => {
                        if (result !=null) {
                            response.json(results)
                        } 
                        else {
                            response.json(ErrorResponse.getErrorMessageObject(ErrorCode.ATTRIBUTE.ID_NOT_EXIST, "Product ID"))
                        }
                    })
            }
            else {
                response.json(ErrorResponse.getErrorMessageObject(ErrorCode.USERS.REQUIRED_FIELDS, "Product ID"))
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