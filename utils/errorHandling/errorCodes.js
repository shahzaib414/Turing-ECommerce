module.exports = Object.freeze({
    AUTHENTICATION: Object.freeze({
        EMPTY_CODE: 'AUT_01',
        UNAUTHORIZED: 'AUT_02'
    }),
    PAGINATION: Object.freeze({
        ORDER_NOT_MATCHED: 'PAG_01',
        ORDER_NOT_ALLOWED: 'PAG_02'
    }),
    USERS: Object.freeze({
        INVALID_EMAIL_PASSWORD: 'USR_01',
        REQUIRED_FIELDS: 'USR_02',
        INVALID_EMAIL: 'USR_03',
        EMAIL_EXIST: 'USR_04',
        EMAIL_NOT_EXIST: 'USR_05',
        INVALID_PHONE: 'USR_06',
        TOO_LONG_FIELD: 'USR_07',
        INVLAID_CREDIT_CARD: 'USR_08',
        SHIPPING_REGION_ID_ER: 'USR_09',
        EMPTY: 'USR_10'
    }),
    CATEGORY: Object.freeze({
        ID_NOT_EXIST: 'CAT_01'
    })
    ,
    ATTRIBUTE: Object.freeze({
        ID_NOT_EXIST: 'ATT_01'
    }),
    ATTRIBUTE_VALUE: Object.freeze({
        ID_NOT_EXIST: 'ATTV_01'
    }),
    PRODUCT: Object.freeze({
        ID_NOT_EXIST: 'PROD_01'
    }),
    CUSTOMER: Object.freeze({
        ID_NOT_EXIST: 'CUS_01'
    }),
    DEPARTMENT: Object.freeze({
        INVALID_ID: 'DEP_01',
        ID_NOT_EXIST: 'DEP_02'
    }),
    TAX: Object.freeze({
        INVALID_ID: 'TAX_01'
    }),
    SHIPPING: Object.freeze({
        INVALID_ID: 'SHIP_01'
    })
});