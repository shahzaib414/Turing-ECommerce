var ErrorResponse = require('../../utils/errorHandling/errorResponse')
var ErrorCode = require('../../utils/errorHandling/errorCodes')
var Sequelize = require('../../models/sequelize')
var sequelize = require('sequelize').Op
var Op = sequelize.Op

/**
 * Returns List of All Categories
 */
exports.getCategories = (request, response) => {
    if (typeof request.query.order !== 'undefined' && typeof request.query.limit !== 'undefined') {
        var order = request.query.order
        var page = typeof request.query.page !== 'undefined' ? request.query.page : 0
        var limit = request.query.limit;
        order = validateOrderField(order)  /* Valid format for Param Order: 'category_id', 'name'*/
        if (order.length == 2) {
            if (order[0] === 'category_id' || order[0] === 'name') {
                if (order[1] === 'ASC' || order[1] === 'DESC') {
                    var fieldName = order[0]
                    var orderType = order[1]
                    Sequelize.CategoryModel.findAll({
                        order: [
                            [fieldName, orderType]
                        ],
                        limit: Number(limit),
                        offset: Number(page)
                    }).then((result) => {
                        if (result.length > 0) {
                            response.json({
                                count: result.length,
                                rows: result
                            })
                        }
                        else {
                            response.json(ErrorResponse.getErrorMessageObject(ErrorCode.USERS.EMPTY, "Category"))
                        }
                    })
                }
                else {
                    response.json(ErrorResponse.getErrorMessageObject(ErrorCode.PAGINATION.ORDER_NOT_MATCHED))
                }
            }
            else {
                response.json(ErrorResponse.getErrorMessageObject(ErrorCode.PAGINATION.ORDER_NOT_ALLOWED))
            }
        }
        else {
            response.json(ErrorResponse.getErrorMessageObject(ErrorCode.PAGINATION.ORDER_NOT_MATCHED))
        }
    }
    else if (typeof request.query.order !== 'undefined') {
        var order = request.query.order
        order = validateOrderField(order)  /* Valid format for Param Order: 'category_id', 'name'*/
        if (order.length == 2) {
            var fieldName = order[0]
            var orderType = order[1]
            Sequelize.CategoryModel.findAll({
                order: [
                    [fieldName, orderType]
                ]
            })
                .then((result) => {
                    response.json({
                        count: result.length,
                        rows: result
                    })
                })

        }
        else {
            response.json(ErrorResponse.getErrorMessageObject(ErrorCode.PAGINATION.ORDER_NOT_MATCHED))
        }
    }
    else if (typeof request.query.limit !== 'undefined') {
        var page = typeof request.query.page !== 'undefined' ? request.query.page : 0
        var limit = request.query.limit;
        Sequelize.CategoryModel.findAll({
            offset: Number(page),
            limit: Number(limit)
        })
            .then((result) => {
                response.json({
                    count: result.length,
                    rows: result
                })
            })
    }
    else {
        Sequelize.CategoryModel.findAll()
            .then((result) => {
                response.json({
                    count: result.length,
                    rows: result
                })
            })
    }
}

/**
 * Returns a Category by Category ID
 */

exports.getCategoryByID = (request, response) => {
    if (typeof request.params.category_id !== 'undefined') {
        Sequelize.CategoryModel.findOne({
            where: {
                category_id: request.params.category_id
            }
        })
            .then((result) => {
                if (result != null) {
                    response.json(result)
                } else {
                    response.json(ErrorResponse.getErrorMessageObject(ErrorCode.CATEGORY.ID_NOT_EXIST, "Category ID"))
                }
            })
    }
    else {
        response.json(ErrorResponse.getErrorMessageObject(ErrorCode.USERS.REQUIRED_FIELDS, "Category ID"))
    }
}

/**
 * Returns list of categories By Product ID
 */

exports.getCategoriesOfProduct = (request, response) => {
    if (typeof request.params.product_id !== 'undefined') {
        Sequelize.Product_CategoryModel.findOne({
            where: {
                product_id: request.params.product_id
            }
        }).then((result) => {
            if (result != null) {
                Sequelize.CategoryModel.findOne({
                    where: {
                        category_id: result.category_id
                    }
                })
                    .then((result) => {
                        if (result != null) {
                            response.json(result)
                        } else {
                            response.json(ErrorResponse.getErrorMessageObject(ErrorCode.CATEGORY, "Category ID"))
                        }
                    })
            }
            else {
                response.json(ErrorResponse.getErrorMessageObject(ErrorCode.PRODUCT.ID_NOT_EXIST, "Product ID"))
            }
        })
    }
    else {
        response.json(ErrorResponse.getErrorMessageObject(ErrorCode.USERS.REQUIRED_FIELDS, "Product ID"))
    }
}

/**
 * Returns list of Categories from Department ID
 */

exports.getCategoriesOfDepartment = (request, response) => {
    if (typeof request.params.department_id !== 'undefined') {
        Sequelize.CategoryModel.findOne({
            where: {
                department_id: request.params.department_id
            }
        })
            .then((result) => {
                if (result != null) {
                    response.json(result)
                } else {
                    response.json(ErrorResponse.getErrorMessageObject(ErrorCode.DEPARTMENT.ID_NOT_EXIST, "Department ID"))
                }
            })
    }
    else {
        response.json(ErrorResponse.getErrorMessageObject(ErrorCode.USERS.REQUIRED_FIELDS, "Department ID"))
    }
}
function validateOrderField(orderType) {
    var list = orderType.split(",")
    if (list.length == 2) {
        return list;
    }
    else {
        return [];
    }
}