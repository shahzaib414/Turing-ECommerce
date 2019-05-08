module.exports = (sequelize, type) => {

    return sequelize.define ('orders',{
        order_id: {
            type: type.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        total_amount : {
            type: type.DECIMAL(10,2),
            allowNull: false
        },
        created_on: {
            type: 'TIMESTAMP',
            defaultValue: type.literal('CURRENT_TIMESTAMP'),
            allowNull: false
        },
        shipped_on: {
            type: 'TIMESTAMP',
            defaultValue: type.literal('CURRENT_TIMESTAMP')
        },
        status: {
            type: type.INTEGER,
            allowNull : false
        },
        comments: {
            type: type.STRING
        },
        customer_id : {
            type: type.INTEGER
        },
        auth_code: {
            type: type.STRING
        },
        reference: {
            type: type.STRING
        },
        shipping_id: {
            type: type.INTEGER
        },
        tax_id: {
            type: type.INTEGER
        },
        cart_id: {
            type: type.INTEGER,
            allowNull: false
        }
    },{
        freezeTableName: true
    });
};