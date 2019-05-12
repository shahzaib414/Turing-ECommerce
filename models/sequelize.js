var sequelize = require('sequelize')
var dbConfig = require('../config/db')
const db = {}
const initSequelize = new sequelize(dbConfig.DB_NAME, dbConfig.DB_USER, dbConfig.DB_PASSWORD, {
    host: dbConfig.HOST_NAME,
    dialect: 'mysql',
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    },
    define: {
        timestamps: false
    }

});
db.sequelize = sequelize
db.initSequelize = initSequelize
db.DepartmentModel = require('../models/department')(initSequelize,sequelize)
db.CustomerModel = require('../models/customer')(initSequelize,sequelize)
db.CategoryModel = require('../models/category')(initSequelize,sequelize)
db.Product_CategoryModel = require('../models/product_category')(initSequelize,sequelize)
db.AttributesModel = require('../models/attributes')(initSequelize,sequelize)
db.Attributes_ValueModel = require('../models/attribute_value')(initSequelize,sequelize)
db.Product_AttributeModel = require('../models/product_attribute')(initSequelize,sequelize)
db.ProductModel =  require('../models/products')(initSequelize,sequelize)
db.ReviewModel  =require('../models/review')(initSequelize,sequelize)
db.TaxModel = require('../models/tax')(initSequelize,sequelize)
db.ShippingModel = require('../models/shipping')(initSequelize,sequelize)
db.ShippingRegionModel = require('../models/shippingRegions')(initSequelize,sequelize)
db.OrdersModel = require('../models/orders')(initSequelize,sequelize)
db.OrderDetailsModel = require('../models/orderDetails')(initSequelize,sequelize)
db.ShoppingCartModel = require('./shopping_cart')(initSequelize,sequelize)
module.exports = db
