const authToken = require('../routes/middleware/authToken')

module.exports = (sequelize, type) => {
    return sequelize.define('customer', {
        customer_id: {
            type: type.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        name: {
            type: type.STRING,
            allowNull: false
        },
        email: {
            type: type.STRING,
            allowNull: false,
            unique: true
        },
        password: {
            type: type.STRING,
            allowNull: false
        },
        credit_card: {
            type: type.STRING
        },
        address_1: {
            type: type.STRING
        },
        address_2: {
            type: type.STRING
        },
        city: {
            type: type.STRING
        },
        region: {
            type: type.STRING
        },
        postal_code: {
            type: type.STRING
        },
        country: {
            type: type.STRING
        },
        shipping_region_id: {
            type: type.INTEGER,
            allowNull: false
        },
        day_phone: {
            type: type.STRING
        },
        eve_phone: {
            type: type.STRING
        },
        mob_phone: {
            type: type.STRING
        },
        access_token : {
            type: type.STRING
        }

    }, {
            freezeTableName: true
        });
};

function buildCustomerObject(request) {
    var data = {}
    data.email = typeof request.body.email !== 'undefined' ? request.body.email : ''
    data.name = typeof request.body.name !== 'undefined' ? request.body.name : ''
    data.password = typeof request.body.password !== 'undefined' ? request.body.password : ''
    data.shipping_region_id = typeof request.body.shipping_region_id !== 'undefined' ? request.body.shipping_region_id : ''
    data.credit_card = typeof request.body.credit_card !== 'undefined' ? request.body.credit_card : ''
    data.address_1 = typeof request.body.address_1 !== 'undefined' ? request.body.address_1 : ''
    data.address_2 = typeof request.body.address_2 !== 'undefined' ? request.body.address_2 : ''
    data.city = typeof request.body.city !== 'undefined' ? request.body.city : ''
    data.region = typeof request.body.region !== 'undefined' ? request.body.region : ''
    data.postal_code = typeof request.body.postal_code !== 'undefined' ? request.body.postal_code : ''
    data.country = typeof request.body.country !== 'undefined' ? request.body.country : ''
    data.day_phone = typeof request.body.day_phone !== 'undefined' ? request.body.day_phone : ''
    data.eve_phone = typeof request.body.eve_phone !== 'undefined' ? request.body.eve_phone : ''
    data.mob_phone = typeof request.body.mob_phone !== 'undefined' ? request.body.mob_phone : ''
    data.access_token = "Bearer " + authToken.createToken(data.email)
    return data
} 

function UpdateCustomerObject(request)  {
    var data = {}
    typeof request.body.email !== 'undefined' ? data.email = request.body.email : ''
    typeof request.body.name !== 'undefined' ? data.name = request.body.name : ''
    typeof request.body.password !== 'undefined' ? data.password = request.body.password : ''
    typeof request.body.day_phone !== 'undefined' ? data.day_phone =  request.body.day_phone : ''
    typeof request.body.eve_phone !== 'undefined' ? data.eve_phone =  request.body.eve_phone : ''
    typeof request.body.mob_phone !== 'undefined' ? data.mob_phone =  request.body.mob_phone : ''
    typeof request.body.shipping_region_id !== 'undefined' ? data.shipping_region_id = request.body.shipping_region_id : ''
    typeof request.body.credit_card !== 'undefined' ?data.credit_card =  request.body.credit_card : ''
    typeof request.body.address_1 !== 'undefined' ? data.address_1 =  request.body.address_1 : ''
    typeof request.body.address_2 !== 'undefined' ? data.address_2 =  request.body.address_2 : ''
    typeof request.body.city !== 'undefined' ? data.city =  request.body.city : ''
    typeof request.body.region !== 'undefined' ? data.region = request.body.region : ''
    typeof request.body.postal_code !== 'undefined' ? data.postal_code =  request.body.postal_code : ''
    typeof request.body.country !== 'undefined' ? data.country =  request.body.country : ''
    
    return data
} 
module.exports.buildCustomerObject = buildCustomerObject
module.exports.UpdateCustomerObject = UpdateCustomerObject