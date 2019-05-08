module.exports = (sequelize, type) => {

    return sequelize.define ('order_detail',{
        item_id: {
            type: type.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        order_id: {
            type: type.INTEGER,
            allowNull: false
        },
        product_id: {
            type: type.INTEGER,
            allowNull: false
        },
        attributes: {
            type: type.STRING,
            allowNull:false
        },
        product_name: {
            type: type.STRING,
            allowNull:false
        },
        quantity : {
            type: type.INTEGER,
            allowNull: false
        },
        unit_cost : {
            type: type.DECIMAL(10,2),
            allowNull: false
        },
    },{
        freezeTableName: true
    });
};