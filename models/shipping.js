module.exports = (sequelize, type) => {

    return sequelize.define ('shipping',{
        shipping_id: {
            type: type.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        shipping_type: {
            type: type.STRING,
            allowNull: false
        },
        shipping_cost: {
            type: type.DECIMAL(10,2),
            allowNull: false
        },
        shipping_region_id: {
            type: type.INTEGER,
            allowNull: false
        },
    },{
        freezeTableName: true
    });
};