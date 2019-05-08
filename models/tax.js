module.exports = (sequelize, type) => {

    return sequelize.define ('tax',{
        tax_id: {
            type: type.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        tax_type: {
            type: type.STRING,
            allowNull: false
        },
        tax_percentage: {
            type: type.DECIMAL(10,2),
            allowNull: false
        },
    },{
        freezeTableName: true
    });
};