var ErrorResponse = require('../../utils/errorHandling/errorResponse')
var ErrorCode = require('../../utils/errorHandling/errorCodes')
var Sequelize = require('../../models/sequelize')
var sequelize = require('sequelize')

/**
 * Returns list of Attributes
 */
exports.getAttributes = (request, response) => {
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
/**
 * Returns Attribute by ID
 */

exports.getAttributesByID = (request, response) => {
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

/**
 * Returns Values Attribute from Attribute ID
 */

exports.getAttributeValueByID = (request, response) => {
    if (typeof request.params.attribute_value_id !== 'undefined') {
        Sequelize.Attributes_ValueModel.findOne({
            where: {
                attribute_value_id: request.params.attribute_value_id
            }
        }).then((result) => {
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

/**
 * Returns list of Attributes with Product ID
 */

exports.getAttributesWithProductID = (request, response) => {
    if (typeof request.params.product_id !== 'undefined') {
        var SQL = "SELECT attribute_value.attribute_value_id,value ,attribute.name from attribute_value " +
            "INNER JOIN product_attribute ON attribute_value.attribute_value_id = product_attribute.attribute_value_id " +
            "INNER JOIN attribute on attribute_value.attribute_id = attribute.attribute_id where product_id = " + request.params.product_id
        Sequelize.initSequelize.query(SQL).then(([results, metadata]) => {
            if (result != null) {
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