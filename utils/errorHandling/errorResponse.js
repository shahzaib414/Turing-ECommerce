var errorCodes = require('./errorCodes')
exports.getErrorMessageObject = (errorCode, fieldName) => {
    switch (errorCode) {
        case errorCodes.AUTHENTICATION.EMPTY_CODE:
            return {
                "error": {
                    "status": 400,
                    "code": errorCodes.AUTHENTICATION.EMPTY_CODE,
                    "message": "Authorization code is empty",
                    "field": fieldName
                }
            }
        case errorCodes.AUTHENTICATION.UNAUTHORIZED:
            return {
                "error": {
                    "status": 400,
                    "code": errorCodes.AUTHENTICATION.UNAUTHORIZED,
                    "message": "Access Unauthorized",
                    "field": fieldName
                }
            }
        case errorCodes.PAGINATION.ORDER_NOT_MATCHED:
            return {
                "error": {
                    "status": 400,
                    "code": errorCodes.PAGINATION.ORDER_NOT_MATCHED,
                    "message": "The order is not matched 'field,(DESC|ASC)'",
                    "field": fieldName
                }
            }
        case errorCodes.PAGINATION.ORDER_NOT_ALLOWED:
            return {
                "error": {
                    "status": 400,
                    "code": errorCodes.PAGINATION.ORDER_NOT_ALLOWED,
                    "message": "The field of order is not allow sorting",
                    "field": fieldName
                }
            }
        case errorCodes.USERS.INVALID_EMAIL_PASSWORD:
            return {
                "error": {
                    "status": 400,
                    "code": errorCodes.USERS.INVALID_EMAIL_PASSWORD,
                    "message": "Email or Password is invalid",
                    "field": fieldName
                }
            }
        case errorCodes.USERS.REQUIRED_FIELDS:
            return {
                "error": {
                    "status": 400,
                    "code": errorCodes.USERS.REQUIRED_FIELDS,
                    "message": " The field(s) are/is required",
                    "field": fieldName
                }
            }
        case errorCodes.USERS.INVALID_EMAIL:
            return {
                "error": {
                    "status": 400,
                    "code": errorCodes.USERS.INVALID_EMAIL,
                    "message": "The email is invalid",
                    "field": fieldName
                }
            }
        case errorCodes.USERS.EMPTY:
            return {
                "error": {
                    "status": 400,
                    "code": errorCodes.USERS.EMPTY,
                    "message": "The Field is empty",
                    "field": fieldName
                }
            }
        case errorCodes.USERS.EMAIL_EXIST:
            return {
                "error": {
                    "status": 400,
                    "code": errorCodes.USERS.EMAIL_EXIST,
                    "message": "The email already exists",
                    "field": fieldName
                }
            }
        case errorCodes.USERS.EMAIL_NOT_EXIST:
            return {
                "error": {
                    "status": 400,
                    "code": errorCodes.USERS.EMAIL_NOT_EXIST,
                    "message": "The email doesn't exist",
                    "field": fieldName
                }
            }
        case errorCodes.USERS.INVALID_PHONE:
            return {
                "error": {
                    "status": 400,
                    "code": errorCodes.USERS.INVALID_PHONE,
                    "message": "this is an invalid phone number.",
                    "field": fieldName
                }
            }
        case errorCodes.USERS.TOO_LONG_FIELD:
            return {
                "error": {
                    "status": 400,
                    "code": errorCodes.USERS.TOO_LONG_FIELD,
                    "message": "this is too long <FIELD NAME>",
                    "field": fieldName
                }
            }
        case errorCodes.USERS.INVLAID_CREDIT_CARD:
            return {
                "error": {
                    "status": 400,
                    "code": errorCodes.USERS.INVLAID_CREDIT_CARD,
                    "message": "this is an invalid Credit Card.",
                    "field": fieldName
                }
            }
        case errorCodes.USERS.SHIPPING_REGION_ID_ER:
            return {
                "error": {
                    "status": 400,
                    "code": errorCodes.USERS.SHIPPING_REGION_ID_ER,
                    "message": "The Shipping Region ID is not number",
                    "field": fieldName
                }
            }
        case errorCodes.USERS.SHIPPING_REGION_ID_ER:
            return {
                "error": {
                    "status": 400,
                    "code": errorCodes.USERS.SHIPPING_REGION_ID_ER,
                    "message": "The Shipping Region ID is not number",
                    "field": fieldName
                }
            }
        case errorCodes.CATEGORY.ID_NOT_EXIST:
            return {
                "error": {
                    "status": 400,
                    "code": errorCodes.CATEGORY.ID_NOT_EXIST,
                    "message": "Don't exist category with this ID",
                    "field": fieldName
                }
            }
        case errorCodes.PRODUCT.ID_NOT_EXIST:
            return {
                "error": {
                    "status": 400,
                    "code": errorCodes.PRODUCT.ID_NOT_EXIST,
                    "message": "Don't exist Product with this ID",
                    "field": fieldName
                }
            }
        case errorCodes.DEPARTMENT.INVALID_ID:
            return {
                "error": {
                    "status": 400,
                    "code": errorCodes.DEPARTMENT.INVALID_ID,
                    "message": " The ID is not a number",
                    "field": fieldName
                }
            }
        case errorCodes.DEPARTMENT.ID_NOT_EXIST:
            return {
                "error": {
                    "status": 400,
                    "code": errorCodes.DEPARTMENT.ID_NOT_EXIST,
                    "message": "Don'exist department with this ID",
                    "field": fieldName
                }
            }
        case errorCodes.CUSTOMER.ID_NOT_EXIST:
            return {
                "error": {
                    "status": 400,
                    "code": errorCodes.CUSTOMER.ID_NOT_EXIST,
                    "message": "No customer exist",
                    "field": fieldName
                }
            }
        case errorCodes.ATTRIBUTE.ID_NOT_EXIST:
            return {
                "error": {
                    "status": 400,
                    "code": errorCodes.ATTRIBUTE.ID_NOT_EXIST,
                    "message": "No Attribute exist",
                    "field": fieldName
                }
            }
        case errorCodes.ATTRIBUTE_VALUE.ID_NOT_EXIST:
            return {
                "error": {
                    "status": 400,
                    "code": errorCodes.ATTRIBUTE_VALUE.ID_NOT_EXIST,
                    "message": "No Attribute Value exist",
                    "field": fieldName
                }
            }
        case errorCodes.TAX.INVALID_ID:
            return {
                "error": {
                    "status": 400,
                    "code": errorCodes.TAX.INVALID_ID,
                    "message": "ID Doesn't exist",
                    "field": fieldName
                }
            }
        case errorCodes.SHIPPING.INVALID_ID:
            return {
                "error": {
                    "status": 400,
                    "code": errorCodes.SHIPPING.INVALID_ID,
                    "message": "ID Doesn't exist",
                    "field": fieldName
                }
            }
        case errorCodes.CART.ID_NOT_EXIST:
            return {
                "error": {
                    "status": 400,
                    "code": errorCodes.CART.ID_NOT_EXIST,
                    "message": "ID Doesn't exist",
                    "field": fieldName
                }
            }
        default:
            return {
                "error": {
                    "status": 400,
                    "code": 111,
                    "message": "Sometimes demo not works :)"
                }
            }
    }
}