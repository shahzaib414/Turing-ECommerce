var ErrorResponse = require('../../utils/errorHandling/errorResponse')
var ErrorCode = require('../../utils/errorHandling/errorCodes')
var Sequelize = require('../../models/sequelize')

/**
 * Get All Taxes
 */

exports.getAllTax = (request, response) => {
    Sequelize.TaxModel.findAll()
        .then((results) => {
            response.json(results)
        })
}

/**
 * Get Tax by ID
 */

exports.getTaxbyID = (request, response) => {
    if (typeof request.params.tax_id != 'undefined') {
        Sequelize.TaxModel.findOne({
            where: {
                tax_id: request.params.tax_id
            }
        })
            .then((results) => {
                if (results != null) {
                    response.json(results)
                }
                else {
                    response.json(ErrorResponse.getErrorMessageObject(ErrorCode.TAX.INVALID_ID, "Tax ID"))
                }
            })
    }
    else {
        response.json(ErrorResponse.getErrorMessageObject(ErrorCode.USERS.REQUIRED_FIELDS, "Tax ID"))
    }
}
