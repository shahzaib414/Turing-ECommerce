module.exports = (sequelize, type) => {

    return sequelize.define ('department',{
        department_id: {
            type: type.INTEGER,
            primaryKey: true,
            autoIncrement: true,
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