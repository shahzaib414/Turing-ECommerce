const authToken = require('../middleware/authToken')
const auth = require('../../config/auth')
var ErrorResponse = require('../../utils/errorHandling/errorResponse')
var ErrorCode = require('../../utils/errorHandling/errorCodes')
var Sequelize = require('../../models/sequelize')

exports.getShippingRegions = (request, response) => {
    let token = request.headers['x-access-token'] || request.headers[auth.AUTH_HEADER];
    if (token) {
        if (authToken.validateToken(token)){
            Sequelize.ShippingRegionModel.findAll()
            .then((results) => {
                response.json (results)
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
exports.getShippingRegionByID = (request, response) => {
    let token = request.headers['x-access-token'] || request.headers[auth.AUTH_HEADER];
    if (token) {
        if (authToken.validateToken(token)){
            if (typeof request.params.shipping_region_id != 'undefined') {
                Sequelize.ShippingModel.findOne({
                    where :{
                        shipping_region_id : request.params.shipping_region_id
                    }
                })
                .then((result) => {
                    if (result!=null) {
                        response.json(result)
                    }
                    else {
                        response.json(ErrorResponse.getErrorMessageObject(ErrorCode.SHIPPING.INVALID_ID,"shipping_region_id"))
                    }
                })
            }
            else {
                response.json(ErrorResponse.getErrorMessageObject(ErrorCode.USERS.REQUIRED_FIELDS,"shipping_region_id"))
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