const authToken = require('../middleware/authToken')
const auth = require('../../config/auth')
var ErrorResponse = require('../../utils/errorHandling/errorResponse')
var ErrorCode = require('../../utils/errorHandling/errorCodes')
var Sequelize = require('../../models/sequelize')
var moment = require('moment');

/**
 * Return list of all products
 */

exports.getProducts = (request, response) => {

    /* Retrive results with page/limit/description length params */
    if (typeof request.query.description_length !== 'undefined' && typeof request.query.limit !== 'undefined') {
        var description_length = typeof request.query.description_length !== 'undefined' ? request.query.description_length : 200
        var page = typeof request.query.page !== 'undefined' ? request.query.page : 1
        var limit = request.query.limit;
        var CountQuery = "SELECT count(*) as count from Product;"
        Sequelize.initSequelize.query(CountQuery)
            .then(([result, metadata]) => {
                var SqlQuery = "SELECT product_id,name,substr(`description`,1," + description_length + ") " +
                    "as description,price,discounted_price,image,image_2,thumbnail,display FROM tshirtshop.product limit " + Number((page - 1) * limit) + "," + Number(limit) + ";"
                Sequelize.initSequelize.query(SqlQuery)
                    .then(([results, metadata]) => {
                        response.json({
                            count: result[0].count,
                            row: results
                        })
                    })
            })


    }
    /* description length param */
    else if (typeof request.query.description_length !== 'undefined') {
        var CountQuery = "SELECT count(*) as count from Product;"
        var description_length = typeof request.query.description_length !== 'undefined' ? request.query.description_length : 20
        Sequelize.initSequelize.query(CountQuery)
        .then(([result, metadata]) => {
            var SqlQuery = "SELECT product_id,name,substr(`description`,1," + description_length + ") " +
            "as description,price,discounted_price,image,image_2,thumbnail,display FROM tshirtshop.product;"
        Sequelize.initSequelize.query(SqlQuery)
            .then(([results, metadata]) => {
                response.json({
                    count: result[0].count,
                    row: results
                })
            })
        })
    }
    /* limit param */
    else if (typeof request.query.limit !== 'undefined') {

        var page = typeof request.query.page !== 'undefined' ? request.query.page : 1
        var limit = request.query.limit;
        var CountQuery = "SELECT count(*) as count from Product;"
        Sequelize.initSequelize.query(CountQuery)
        .then(([result, metadata]) => {
            var SqlQuery = "SELECT product_id,name,substr(`description`,1,200) " +
            "as description,price,discounted_price,image,image_2,thumbnail,display FROM tshirtshop.product limit " + Number((page - 1) * limit) + "," + Number(limit) + ";"
        Sequelize.initSequelize.query(SqlQuery)
            .then(([results, metadata]) => {
                response.json({
                    count: result[0].count,
                    row: results
                })
            })
        })
       
    }
    /* without page/limit/description length param */
    else {

        var SqlQuery = "SELECT product_id,name,substr(`description`,1,200) " +
            "as description,price,discounted_price,image,image_2,thumbnail,display FROM tshirtshop.product;"
        Sequelize.initSequelize.query(SqlQuery)
            .then(([results, metadata]) => {
                response.json({
                    count: results.length,
                    row: results
                })
            })
    }

}

/**
 * Return Product by Department ID
 */

exports.getProductByDepartmentID = (request, response) => {

    /** Retrive results with page/limit/description length params */
    if (typeof request.params.department_id !== "undefined" && typeof request.query.limit !== "undefined") {
        var department_id = request.params.department_id
        var page = typeof request.query.page !== 'undefined' ? request.query.page : 1
        var limit = request.query.limit;
        var description_length = typeof request.query.description_length !== 'undefined' ? request.query.description_length : 200

        var SqlQuery = "Select product.product_id,product.name,substr(product.description,1," + description_length + ") as description,price,discounted_price,thumbnail " +
            "from category inner join product_category on product_category.category_id = category.category_id " +
            "left join product on product_category.product_id = product.product_id " +
            "where department_id = " + department_id + " limit " + Number((page - 1) * limit) + "," + Number(limit) + ";"
        Sequelize.initSequelize.query(SqlQuery)
            .then(([results, metadata]) => {
                if (results.length > 0) {
                    response.json({
                        count: results.length,
                        row: results
                    })
                }
                else {
                    response.json(ErrorResponse.getErrorMessageObject(ErrorCode.DEPARTMENT.ID_NOT_EXIST, "Department ID"))
                }
            })

    }
    /** Retrive results without page/limit/description length params */
    else if (typeof request.params.department_id !== "undefined") {
        var department_id = request.params.department_id
        var description_length = typeof request.query.description_length !== 'undefined' ? request.query.description_length : 200
        var SqlQuery = "Select product.product_id,product.name,substr(product.description,1," + description_length + ") as description,price,discounted_price,thumbnail " +
            "from category inner join product_category on product_category.category_id = category.category_id " +
            "left join product on product_category.product_id = product.product_id " +
            "where department_id = " + department_id + ";"
        Sequelize.initSequelize.query(SqlQuery)
            .then(([results, metadata]) => {
                if (results.length > 0) {
                    response.json({
                        count: results.length,
                        row: results
                    })
                }
                else {
                    response.json(ErrorResponse.getErrorMessageObject(ErrorCode.DEPARTMENT.ID_NOT_EXIST, "Department ID"))
                }
            })

    }
    else {
        response.json(ErrorResponse.getErrorMessageObject(ErrorCode.USERS.EMPTY, "Category ID"))
    }


}

/**
 * Get Product Reviews
 */

exports.getProductReviews = (request, response) => {
    if (typeof request.params.product_id != 'undefined') {
        var productID = request.params.product_id
        Sequelize.ReviewModel.findAll({
            where: {
                product_id: productID
            }
        }).then((result) => {
            if (result.length > 0) {
                response.json(result)
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
 * Get Product by ID 
 */

exports.getProductByID = (request, response) => {
    if (typeof request.params.product_id !== "undefined") {
        Sequelize.ProductModel.findOne({
            where: {
                product_id: request.params.product_id
            }
        })
            .then((result) => {
                if (result != null) {
                    response.json(result)
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
 * Get List of products of Category 
 */

exports.getProductByCategoryID = (request, response) => {

    /** Retrive result with limit/page Params */
    if (typeof request.params.category_id !== "undefined" && typeof request.query.limit !== "undefined") {
        var category_id = request.params.category_id
        var page = typeof request.query.page !== 'undefined' ? request.query.page : 1
        var limit = request.query.limit;
        var description_length = typeof request.query.description_length !== 'undefined' ? request.query.description_length : 200
        var SqlQuery = "Select product.product_id,name,substr(`description`,1," + description_length + ") as description,price,discounted_price,thumbnail " +
            "from product_category left join product on product_category.product_id = product.product_id " +
            "where product_category.category_id = " + category_id + " limit " + Number((page - 1) * limit) + "," + Number(limit) + ";"
        Sequelize.initSequelize.query(SqlQuery)
            .then(([results, metadata]) => {
                if (results.length > 0) {
                    response.json({
                        count: results.length,
                        row: results
                    })
                }
                else {
                    response.json(ErrorResponse.getErrorMessageObject(ErrorCode.CATEGORY.ID_NOT_EXIST, "Category ID"))
                }
            })
    }
    /** Retrive result without limit/page Params */
    else if (typeof request.params.category_id !== "undefined") {
        var category_id = request.params.category_id
        var description_length = typeof request.query.description_length !== 'undefined' ? request.query.description_length : 200
        var SqlQuery = "Select product.product_id,name,substr(`description`,1," + description_length + ") as description,price,discounted_price,thumbnail " +
            "from product_category left join product on product_category.product_id = product.product_id " +
            "where product_category.category_id = " + category_id + ";"
        Sequelize.initSequelize.query(SqlQuery)
            .then(([results, metadata]) => {
                if (results.length > 0) {
                    response.json({
                        count: results.length,
                        row: results
                    })
                }
                else {
                    response.json(ErrorResponse.getErrorMessageObject(ErrorCode.CATEGORY.ID_NOT_EXIST, "Category ID"))
                }
            })

    }
    else {
        response.json(ErrorResponse.getErrorMessageObject(ErrorCode.USERS.EMPTY, "Category ID"))
    }

}

/**
 * Save Product Reviews 
 */

exports.PostProductReview = (request, response) => {
    let token = request.headers['x-access-token'] || request.headers[auth.AUTH_HEADER];
    if (token) {
        if (authToken.validateToken(token)) {
            if (typeof request.body.review != 'undefined' && typeof request.params.product_id != 'undefined' && typeof request.body.rating != 'undefined') {
                Sequelize.ProductModel.findOne({
                    where: {
                        product_id: request.params.product_id
                    }
                })
                    .then((result) => {
                        if (result != null) {
                            Sequelize.CustomerModel.findOne({
                                where: {
                                    access_token: token
                                }
                            })
                                .then((customer) => {
                                    Sequelize.ReviewModel.create({
                                        customer_id: customer.customer_id,
                                        product_id: request.params.product_id,
                                        review: request.body.review,
                                        rating: Number(request.body.rating),
                                        created_on: moment().format('YYYY-MM-DD hh:mm:ss')
                                    })
                                        .then((customer) => {
                                            response.json(customer)
                                        })
                                })

                        }
                        else {
                            response.json(ErrorResponse.getErrorMessageObject(ErrorCode.PRODUCT.ID_NOT_EXIST, "product id"))
                        }
                    })
            }
            else {
                response.json(ErrorResponse.getErrorMessageObject(ErrorCode.USERS.REQUIRED_FIELDS, "Reviews/product id / rating"))
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

/**
 * Get Product Location
 */
exports.getProductLocation = (request, response) => {

    if (typeof request.params.product_id !== 'undefined') {
        var SqlQuery = "Select category.category_id, category.name as category_name, department.department_id, department.name as department_name " +
            "from product_category " +
            "inner join category on product_category.category_id = category.category_id " +
            "inner join department on category.department_id = department.department_id " +
            "where product_id = " + request.params.product_id + ";"

        Sequelize.initSequelize.query(SqlQuery)
            .then(([result, metadata]) => {
                if (result.length > 0) {
                    response.json(result)
                }
                else {
                    response.json(ErrorResponse.getErrorMessageObject(ErrorCode.CATEGORY.ID_NOT_EXIST, "Category ID"))
                }
            })
    }
    else {
        response.json(ErrorResponse.getErrorMessageObject(ErrorCode.USERS.EMPTY, "Product ID"))
    }

}

/**
 * Get Details of product
 */

exports.getDetailsByProductID = (request, response) => {

    if (typeof request.params.product_id !== 'undefined') {

        Sequelize.ProductModel.findOne({
            where: {
                product_id: request.params.product_id

            },
            attributes: { exclude: ['thumbnail', 'display'] }
        })
            .then((result) => {

                if (result != null) {
                    response.json(result)
                }
                else {
                    response.json(ErrorResponse.getErrorMessageObject(ErrorCode.PRODUCT.ID_NOT_EXIST, "Product ID"))
                }
            })
    }
    else {
        response.json(ErrorResponse.getErrorMessageObject(ErrorCode.USERS.EMPTY, "Product ID"))
    }

}

/**
 * Search Product
 */
exports.searchProducts = (request, response) => {

    if (typeof request.query.query_string !== "undefined" && typeof request.query.limit !== "undefined") {
        var query = request.query.query_string;
        var page = typeof request.query.page !== 'undefined' ? request.query.page : 1
        var limit = request.query.limit;
        var description_length = typeof request.query.description_length !== 'undefined' ? request.query.description_length : 200
        var SqlQuery = "SELECT product_id,name,substr(`description`,1," + description_length + ") as description,price,discounted_price,image,image_2,thumbnail,display " +
            "FROM tshirtshop.product where description like '%" + query + "%' or name = '" + query + "' limit " + Number((page - 1) * limit) + ", " + Number(limit) + ";";
        Sequelize.initSequelize.query(SqlQuery)
            .then(([results, metadata]) => {
                response.json({
                    count: results.length,
                    row: results
                })
            })
    }
    else if (typeof request.query.query_string !== "undefined") {
        var query = request.query.query_string;
        var description_length = typeof request.query.description_length !== 'undefined' ? request.query.description_length : 200
        var SqlQuery = "SELECT product_id,name,substr(`description`,1," + description_length + ") as description,price,discounted_price,image,image_2,thumbnail,display " +
            "FROM tshirtshop.product where description like '%" + query + "%' or name = '" + query + "';";
        Sequelize.initSequelize.query(SqlQuery)
            .then(([results, metadata]) => {
                response.json({
                    count: results.length,
                    row: results
                })
            })
    }
    else {
        response.json(ErrorResponse.getErrorMessageObject(ErrorCode.USERS.EMPTY, "Query String"))
    }

}