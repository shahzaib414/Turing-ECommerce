var ErrorResponse = require('../../utils/errorHandling/errorResponse')
var ErrorCode = require('../../utils/errorHandling/errorCodes')
var Sequelize = require('../../models/sequelize')

/**
 * Return Shipping regions
 */

exports.getShippingRegions = (request, response) => {
    Sequelize.ShippingRegionModel.findAll()
            .then((results) => {
                response.json (results)
            })
}

/**
 * Return shipping Region by ID
 */

exports.getShippingRegionByID = (request, response) => {
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