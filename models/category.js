module.exports = (sequelize, type) => {

    return sequelize.define ('category',{
        category_id: {
            type: type.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        department_id: {
            type: type.INTEGER,
            allowNull: false
        },
        name: {
            type: type.STRING,
            allowNull: false
        },
        description: {
            type: type.STRING
        },
    },{
        freezeTableName: true
    });
};