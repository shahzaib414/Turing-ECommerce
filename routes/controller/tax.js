const authToken = require('../middleware/authToken')
const auth = require('../../config/auth')
var ErrorResponse = require('../../utils/errorHandling/errorResponse')
var ErrorCode = require('../../utils/errorHandling/errorCodes')
var Sequelize = require('../../models/sequelize')

exports.getAllTax = (request, response) => {
    let token = request.headers['x-access-token'] || request.headers[auth.AUTH_HEADER];
    if (token) {
        if (authToken.validateToken(token)) {
            Sequelize.TaxModel.findAll()
                .then((results) => {
                    response.json(results)
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

exports.getTaxbyID = (request, response) => {
    let token = request.headers['x-access-token'] || request.headers[auth.AUTH_HEADER];
    if (token) {
        if (authToken.validateToken(token)) {
            if (typeof request.params.tax_id != 'undefined') {
                Sequelize.TaxModel.findOne({
                    where : {
                        tax_id : request.params.tax_id
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
        else {
            response.json(ErrorResponse.getErrorMessageObject(ErrorCode.AUTHENTICATION.UNAUTHORIZED, "Auth Token"))
        }
    }
    else {
        response.json(ErrorResponse.getErrorMessageObject(ErrorCode.AUTHENTICATION.EMPTY_CODE, "Auth Token"))
    }
}
