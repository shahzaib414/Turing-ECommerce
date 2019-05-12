module.exports = (sequelize, type) => {

    return sequelize.define('shopping_cart', {
        item_id: {
            type: type.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        cart_id: {
            type: type.STRING,
            allowNull: false
        },
        product_id: {
            type: type.INTEGER,
            allowNull: false
        },
        attributes: {
            type: type.STRING,
            allowNull: false
        },
        quantity: {
            type: type.INTEGER,
            allowNull: false
        },
        buy_now : {
            type: type.TINYINT(1),
            allowNull: false
        },
        added_on : {
            type: 'TIMESTAMP',
            defaultValue: type.literal('CURRENT_TIMESTAMP'),
            allowNull: false
        }
    }, {
            freezeTableName: true
        });
};