module.exports = (sequelize, type) => {

    return sequelize.define ('review',{
        review_id: {
            type: type.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        customer_id: {
            type: type.INTEGER,
            allowNull :false
        },
        product_id: {
            type: type.INTEGER,
            allowNull :false
        },
        review: {
            type: type.STRING,
            allowNull: false
        },
        rating: {
            type: type.SMALLINT
        },
        created_on: {
            type: 'TIMESTAMP',
            defaultValue: type.literal('CURRENT_TIMESTAMP'),
            allowNull: false
        },
    },{
        freezeTableName: true
    });
};