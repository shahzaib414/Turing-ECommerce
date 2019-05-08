module.exports = (sequelize, type) => {

    return sequelize.define ('attribute',{
        attribute_id: {
            type: type.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        name: {
            type: type.STRING,
            allowNull: false
        }
    },{
        freezeTableName: true
    });
};