module.exports = (sequelize, type) => {

    return sequelize.define ('shipping_region',{
        shipping_region_id: {
            type: type.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        shipping_region: {
            type: type.STRING,
            allowNull: false
        }
    },{
        freezeTableName: true
    });
};