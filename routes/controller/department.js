var ErrorResponse = require('../../utils/errorHandling/errorResponse')
var ErrorCode = require('../../utils/errorHandling/errorCodes')
var Sequelize = require('../../models/sequelize')
/**
 * Returns List of All Departments
 */
exports.getDepartments = (request, response) => {

    Sequelize.DepartmentModel.findAll()
        .then((result) => {
            if (result.length > 0) {
                response.json(result)
            }
            else {
                response.json(ErrorResponse.getErrorMessageObject(ErrorCode.USERS.EMPTY, "Department"))
            }
        })
}
/**
 * Returns Department by Department ID
 */
exports.getDepartmentByID = (request, response) => {
    if (typeof request.params.department_id !== 'undefined') {
        Sequelize.DepartmentModel.findOne({
            where: {
                department_id: request.params.department_id
            }
        })
        .then((result) => {
                if (result != null) {
                    response.json(result)
                }
                else {
                    response.json(ErrorResponse.getErrorMessageObject(ErrorCode.DEPARTMENT.ID_NOT_EXIST, "Department ID"))
                }

            })
    }
    else {
        response.json(ErrorResponse.getErrorMessageObject(ErrorCode.USERS.REQUIRED_FIELDS, "Department ID"))
    }
}
