let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../index');
let should = chai.should();
chai.use(chaiHttp);
chai.use(require('chai-things'));
var expect = chai.expect;

/**
 * Test GET routes for Shopping Cart
 */

describe('/GET Unique ID for Shopping Cart', () => {
   it('it should Unique ID for Shopping Cart', (done) => {
      chai.request(server)
          .get('/shoppingcart/generateUniqueId')
          .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('object')
                res.body.should.have.property('cart_id')
            done();
          });
    });
});

describe('/GET Calculate Total Amount', () => {
    it('it should Unique ID for Shopping Cart', (done) => {
       chai.request(server)
           .get('/shoppingcart/totalAmount/lTnReRAvOh')
           .end((err, res) => {
                 res.should.have.status(200);
                 res.body.should.be.a('array')
                 res.body.should.have.property('total_amount')
             done();
           });
     });
 });

describe('/GET List of products in Shopping Cart', () => {
    it('it should GET List of products in Shopping Cart', (done) => {
       chai.request(server)
           .get('/shoppingcart/lTnReRAvOh')
           .end((err, res) => {
                 res.should.have.status(200);
                 res.body.should.be.a('array').to.have.all.deep.keys('item_id','attributes','product_id','name','image','price','quantity','subtotal');
             done();
           });
     });
 });

/**
 * Test POST routes for Shopping Cart
 */

describe('/POST Add a product in Cart', () => {
    var product = {
        cart_id : 'lTnReRAvOh',
        product_id : 1,
        attributes : "Product Attributes"
    }
    
    it('it should Add a product in Cart', (done) => {
       chai.request(server)
           .post('/shoppingcart/add')
           .send(product)
           .end((err, res) => {
                 res.should.have.status(200);
                 res.body.should.be.a('array').to.have.all.deep.keys('item_id','attributes','product_id','name','image','price','quantity','subtotal');
             done();
           });
     });
 });

 /**
  * Test PUT routes for Shopping Cart
  */
 describe('/PUT Update Cart by Item', () => {
    var cart = {
        item_id : 1,
        quantity : 2
    }
    it('it should Add a product in Cart', (done) => {
       chai.request(server)
           .put('/shoppingcart/update/26')
           .send(cart)
           .end((err, res) => {
                 res.should.have.status(200);
                 res.body.should.be.a('array').to.have.all.deep.keys('item_id','attributes','product_id','name','image','price','quantity','subtotal');
             done();
           });
     });
 });

 /**
  * Test DELETE routes for Shopping Cart
  */
 describe('/DELETE Empty Cart', () => {
    it('it should DELETE products from Cart', (done) => {
       chai.request(server)
           .delete('/shoppingcart/empty/lTnReRAvOh')
           .end((err, res) => {
                 res.should.have.status(200);
                 res.body.should.be.a('array')
             done();
           });
     });
 });
