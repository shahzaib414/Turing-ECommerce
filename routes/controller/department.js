const authToken = require('../middleware/authToken')
const auth = require('../../config/auth')
var ErrorResponse = require('../../utils/errorHandling/errorResponse')
var ErrorCode = require('../../utils/errorHandling/errorCodes')
var Sequelize = require('../../models/sequelize')

exports.getDepartments = (request, response) => {
    let token = request.headers['x-access-token'] || request.headers[auth.AUTH_HEADER];
    if (token) {
        if (authToken.validateToken(token)){
            Sequelize.DepartmentModel.findAll()
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
exports.getDepartmentByID = (request, response) => {
    let token = request.headers['x-access-token'] || request.headers[auth.AUTH_HEADER];
    if (token) {
        if (authToken.validateToken(token)){
            if (typeof request.params.department_id !== 'undefined') {
                Sequelize.DepartmentModel.findOne({
                    where: {
                        department_id: request.params.department_id
                    }
                })
                .then((result) => {
                    if (result !=null) {
                        response.json(result)
                    }
                    else {
                        response.json(ErrorResponse.getErrorMessageObject(ErrorCode.DEPARTMENT.ID_NOT_EXIST,"Department ID"))
                    }
                    
                })
            }
            else {
                response.json(ErrorResponse.getErrorMessageObject(ErrorCode.USERS.REQUIRED_FIELDS,"Department ID"))
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
