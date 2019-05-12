module.exports = function(app){
    var customers = require('./controller/customer')
    var departments = require('./controller/department')
    var categories = require('./controller/category')
    var attributes = require('./controller/attributes')
    var products = require('./controller/products') 
    var tax = require('./controller/tax') 
    var shipping = require('./controller/shipping') 
    var order = require('./controller/orders') 
    var shoppingCart = require('./controller/shoppingCart')
    var stripe = require('./controller/stripe') 


    //** Department API  */
    app.get('/departments',departments.getDepartments)
    app.get('/departments/:department_id',departments.getDepartmentByID)
    
    //** Category API  */
    app.get('/categories',categories.getCategories)
    app.get('/categories/:category_id',categories.getCategoryByID)
    app.get('/categories/inProduct/:product_id',categories.getCategoriesOfProduct)
    app.get('/categories/inDepartment/:department_id',categories.getCategoriesOfDepartment)
    
    //** products API  */
    app.get('/products',products.getProducts)
    app.get('/products/search',products.searchProducts)
    app.get('/products/:product_id',products.getProductByID)
    app.get('/products/inCategory/:category_id',products.getProductByCategoryID)
    app.get('/products/inDepartment/:department_id',products.getProductByDepartmentID)
    app.get('/products/:product_id/details',products.getDetailsByProductID)
    app.get('/products/:product_id/locations',products.getProductLocation)
    app.post('/products/:product_id/reviews',products.PostProductReview)
    app.get('/products/:product_id/reviews',products.getProductReviews)

    //** Attribute API  */
    app.get('/attributes',attributes.getAttributes)
    app.get('/attributes/:attribute_id',attributes.getAttributesByID)
    app.get('/attributes/values/:attribute_value_id',attributes.getAttributeValueByID)
    app.get('/attributes/inProduct/:product_id',attributes.getAttributesWithProductID)

    //** Customers API  */
    app.post('/customers',customers.registerCustomer)
    app.post('/customer/login',customers.loginCustomer)
    app.put('/customer',customers.updateCustomer)
    app.put('/customers/address',customers.updateCustomerAddress)
    app.put('/customers/creditCard',customers.updateCustomerCreditCard)
    app.get('/customer',customers.getCustomer)

     //** Tax API  */
     app.get('/tax',tax.getAllTax)
     app.get('/tax/:tax_id',tax.getTaxbyID)

     //** Shipping API  */
     app.get('/shipping/regions',shipping.getShippingRegions)
     app.get('/shipping/regions/:shipping_region_id',shipping.getShippingRegionByID)

     //** Order API  */
     app.post('/orders',order.CreateOrder)
     app.get('/orders/inCustomer',order.getOdrderByCustomer)
     app.get('/orders/:order_id',order.getOdrderByID)
     app.get('/orders/shortDetail/:order_id',order.getOrderInfo)

     //** Order API  */
     app.get('/shoppingcart/generateUniqueId',shoppingCart.generateUniqueID)
     app.post('/shoppingcart/add',shoppingCart.addProductInCart)
     app.get('/shoppingcart/:cart_id',shoppingCart.getListOfProductByCartID)
     app.put('/shoppingcart/update/:item_id',shoppingCart.updateCartItem)
     app.delete('/shoppingcart/empty/:cart_id',shoppingCart.emptyCart)
     app.get('/shoppingcart/totalAmount/:cart_id',shoppingCart.totalAmountInCart)
     app.get('/shoppingcart/saveForLater/:item_id',shoppingCart.saveForLater)
     app.get('/shoppingcart/getSaved/:cart_id',shoppingCart.getProductSavedForLatter)
     app.delete('/shoppingcart/removeProduct/:item_id',shoppingCart.removeProductFromCart)

     //** Stripe API  */
     app.post('/stripe/charge',stripe.charge)
     app.get('/stripe/getStripeToken',stripe.getStripeToken)
     app.post('/stripe/webhooks',stripe.stripeWebhooks)
}