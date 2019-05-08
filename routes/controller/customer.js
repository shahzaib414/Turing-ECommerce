const authToken = require('../middleware/authToken')
const auth = require('../../config/auth')
var Sequelize = require('../../models/sequelize')
var bcrypt = require('bcryptjs');
var validator = require("email-validator");
const customerModel = require('../../models/customer')
var ErrorResponse = require('../../utils/errorHandling/errorResponse')
var ErrorCode = require('../../utils/errorHandling/errorCodes')
var Op = require('sequelize').Op

exports.getCustomer = (request, response) => {


    let token = request.headers['x-access-token'] || request.headers[auth.AUTH_HEADER];

    if (token) {
        if (authToken.validateToken(token)) {
            Sequelize.CustomerModel.findOne({
                where: {
                    access_token: token
                }
            }).then((SequelizeResponse) => {
                if (SequelizeResponse != null) {
                    response.json(SequelizeResponse.dataValues)
                }
                else {
                    response.json(ErrorResponse.getErrorMessageObject(ErrorCode.CUSTOMER.ID_NOT_EXIST,"Customer ID"))
                }
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
exports.registerCustomer = (request, response) => {
    if (typeof request.body.email !== 'undefined' && typeof request.body.name !== 'undefined' && typeof request.body.password !== 'undefined' && typeof request.body.shipping_region_id !== 'undefined') {
        if (!validator.validate(request.body.email)) {
            response.json(ErrorResponse.getErrorMessageObject(ErrorCode.USERS.INVALID_EMAIL,"Email"))
        }
        Sequelize.CustomerModel.findOne({
            where: {
                email: request.body.email
            }
        }).then((SequelizeResponse) => {
            if (SequelizeResponse != null && SequelizeResponse.email !== null) {
                response.json(ErrorResponse.getErrorMessageObject(ErrorCode.USERS.EMAIL_EXIST,"Email"))
            }
            else {
                var password = request.body.password
                bcrypt.genSalt(10, function (err, salt) {
                    bcrypt.hash(password, salt, function (err, hash) {
                        request.body.password = hash
                        Sequelize.CustomerModel.create(customerModel.buildCustomerObject(request)).then((result) => {
                            response.json({
                                "customer": {
                                    "schema": result
                                },
                                "accessToken": "Bearer " + authToken.createToken(request.body.email),
                                "expires_in": "24h"
                            })
                        });
                    });
                });



            }
        })
    }
    else {
        response.json(ErrorResponse.getErrorMessageObject(ErrorCode.USERS.REQUIRED_FIELDS,"Email/Name/Password/Shipping ID"))
    }
}
exports.loginCustomer = (request, response) => {
    var data = {}
    if (typeof request.body.email !== 'undefined' && typeof request.body.password !== 'undefined') {
        data.email = request.body.email
        data.password = request.body.password
        Sequelize.CustomerModel.findOne({
            where: {
                email: request.body.email
            }
        }).then((SequelizeResponse) => {
            if (SequelizeResponse != null) {
                bcrypt.compare(data.password, SequelizeResponse.dataValues.password, function (err, res) {
                    if (err) {

                    }
                    if (res) {
                        var genToken = "Bearer " + authToken.createToken(data.email)
                        Sequelize.CustomerModel.update({
                            accessToken: genToken
                        },
                            {
                                where: {
                                    email: {
                                        [Op.eq]: request.body.email
                                    }
                                }
                            }
                        ).then((result)=> {
                            response.json({
                                "customer": {
                                    "schema": SequelizeResponse.dataValues
                                },
                                "accessToken": genToken,
                                "expires_in": "24h"
                            })
                        })

                        
                    }
                    else {
                        response.json(ErrorResponse.getErrorMessageObject(ErrorCode.USERS.INVALID_EMAIL_PASSWORD,"Email/Password"))
                    }
                });
            }
            else {
                response.json(ErrorResponse.getErrorMessageObject(ErrorCode.USERS.EMAIL_NOT_EXIST,"Email"))
            }
        })
            .catch((error) => {
                console.log(error)
            })
    }
    else {
        response.json(ErrorResponse.getErrorMessageObject(ErrorCode.USERS.REQUIRED_FIELDS,"Email/Password"))

    }
}

exports.updateCustomer = (request, response) => {
    let token = request.headers['x-access-token'] || request.headers[auth.AUTH_HEADER];
    if (token) {
        if (authToken.validateToken(token)) {
            if (typeof request.body.email !== 'undefined' && typeof request.body.name !== 'undefined') {
                Sequelize.CustomerModel.update(
                    customerModel.UpdateCustomerObject(request)
                    , {
                        where: {
                            name: {
                                [Op.eq]: request.body.name
                            },
                            email: {
                                [Op.eq]: request.body.email
                            }
                        }
                    }
                )
                    .then(() => {
                        Sequelize.CustomerModel.findOne({
                            where: {
                                access_token: token
                            }
                        }).then((SequelizeResponse) => {
                            if (SequelizeResponse != null) {
                                response.json(SequelizeResponse.dataValues)
                            }
                            else {
                                response.json(ErrorResponse.getErrorMessageObject(ErrorCode.CUSTOMER.ID_NOT_EXIST,"Customer ID"))
                            }
                        })
                    })
            }
            else {
                response.json(ErrorResponse.getErrorMessageObject(ErrorCode.USERS.REQUIRED_FIELDS,"Email/Name"))
            }
        }
        else {
            response.json(ErrorResponse.getErrorMessageObject(ErrorCode.AUTHENTICATION.UNAUTHORIZED,"Auth Token"))
        }
    } else {

        response.json(ErrorResponse.getErrorMessageObject(ErrorCode.AUTHENTICATION.EMPTY_CODE,"AUth Token"))
    }
}
exports.updateCustomerAddress = (request, response) => {
    let token = request.headers['x-access-token'] || request.headers[auth.AUTH_HEADER];
    if (token) {
        if (authToken.validateToken(token)) {
            if (typeof request.body.address_1 != 'undefined' && typeof request.body.city != 'undefined' && typeof request.body.region != 'undefined'
                && typeof request.body.postal_code != 'undefined' && typeof request.body.country != 'undefined' && typeof request.body.shipping_region_id) {
                Sequelize.CustomerModel.update(
                    customerModel.UpdateCustomerObject(request)
                    , {
                        where: {
                            access_token: {
                                [Op.eq]: token
                            }
                        }
                    }
                )
                    .then(() => {
                        Sequelize.CustomerModel.findOne({
                            where: {
                                access_token: token
                            }
                        }).then((SequelizeResponse) => {
                            if (SequelizeResponse != null) {
                                response.json(SequelizeResponse.dataValues)
                            }
                            else {
                                response.json(ErrorResponse.getErrorMessageObject(ErrorCode.CUSTOMER.ID_NOT_EXIST,"Customer ID"))
                            }
                        })
                    })
            }
            else {
                response.json(ErrorResponse.getErrorMessageObject(ErrorCode.USERS.REQUIRED_FIELDS,"Postal Code/Country/Shipping Region ID"))
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

exports.updateCustomerCreditCard = (request, response) => {
    let token = request.headers['x-access-token'] || request.headers[auth.AUTH_HEADER];
    if (token) {
        if (authToken.validateToken(token)) {
            if (typeof request.body.credit_card !== 'undefined') {
                Sequelize.CustomerModel.update(
                    customerModel.UpdateCustomerObject(request)
                    , {
                        where: {
                            access_token: {
                                [Op.eq]: token
                            }
                        }
                    }
                ).then(() => {
                    Sequelize.CustomerModel.findOne({
                        where: {
                            access_token: token
                        }
                    }).then((SequelizeResponse) => {
                        if (SequelizeResponse != null) {
                            response.json(SequelizeResponse.dataValues)
                        }
                        else {
                            response.json(ErrorResponse.getErrorMessageObject(ErrorCode.CUSTOMER.ID_NOT_EXIST,"Customer ID"))
                        }
                    })
                })
            }
            else {
                response.json(ErrorResponse.getErrorMessageObject(ErrorCode.USERS.REQUIRED_FIELDS,"Credit Card"))
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
exports.getAuthToken = (request, response) => {
    var token = authToken.createToken(email)
    response.json({
        "token": token
    })
}