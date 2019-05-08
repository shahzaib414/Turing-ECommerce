module.exports = (sequelize, type) => {

    return sequelize.define ('product_attribute',{
        product_id: {
            type: type.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        attribute_value_id: {
            type: type.INTEGER
        }
    },{
        freezeTableName: true
    });
};