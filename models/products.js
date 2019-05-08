module.exports = (sequelize, type) => {

    return sequelize.define ('product',{
        product_id: {
            type: type.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        name: {
            type: type.STRING,
            allowNull: false
        },
        description: {
            type: type.STRING,
            allowNull: false
        },
        price: {
            type: type.DECIMAL(10,2),
            allowNull: false
        },
        discounted_price: {
            type: type.DECIMAL(10,2),
            allowNull: false
        },
        image: {
            type: type.STRING
        },
        image_2: {
            type: type.STRING
        },
        thumbnail: {
            type: type.STRING
        },
        display: {
            type: type.SMALLINT
        },
    },{
        freezeTableName: true
    });
};