module.exports = (sequelize, type) => {

    return sequelize.define ('attribute_value',{
        attribute_value_id: {
            type: type.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        attribute_id: {
            type: type.INTEGER
        },
        value: {
            type: type.STRING,
            allowNull: false
        }
    },{
        freezeTableName: true
    });
};