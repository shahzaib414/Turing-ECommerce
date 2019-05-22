let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../index');
let should = chai.should();
chai.use(chaiHttp);
chai.use(require('chai-things'));
var expect = chai.expect;

/**
 *  Test PUT routes for Customers
 */

describe('/PUT Update Customer Address', () => {
    var customer = {
        address_1: "Address 1",
        city : "Islamabad",
        region : "region",
        postal_code: "44000",
        country : "Pakistan",
        shipping_region_id : "1"
    }
    var token = "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InNoYWh6YWliNDE0QGVtYWlsLmNvbSIsImlhdCI6MTU1ODUzMDUzMSwiZXhwIjoxNTU4NjE2OTMxfQ.ssG6LmvoNiiYWMaEFq475iQ9IjvXibGRWQdu6e19FsA"
    it('it should Update Customer Address', (done) => {
      chai.request(server)
          .put('/customers/address')
          .set('user-key', token)
          .send(customer)
          .end((err, res) => {
                res.should.have.status(200)
                res.body.should.be.a('object');
                res.body.should.have.property('customer_id')
                res.body.should.have.property('name')
                res.body.should.have.property('email')
                res.body.should.have.property('address_1')
                res.body.should.have.property('address_2')
                res.body.should.have.property('city')
                res.body.should.have.property('region')
                res.body.should.have.property('country')
                res.body.should.have.property('postal_code')
                res.body.should.have.property('shipping_region_id')
                res.body.should.have.property('day_phone')
                res.body.should.have.property('eve_phone')
                res.body.should.have.property('mob_phone')
                res.body.should.have.property('credit_card')

            done();
          });
    });
});

describe('/PUT Update Customer Credit Card', () => {
    var customer = {
       credit_card : "3523543565478564"
    }
    var token = "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InNoYWh6YWliNDE0QGVtYWlsLmNvbSIsImlhdCI6MTU1ODUzMDUzMSwiZXhwIjoxNTU4NjE2OTMxfQ.ssG6LmvoNiiYWMaEFq475iQ9IjvXibGRWQdu6e19FsA"
    it('it should Customer Credit Card', (done) => {
      chai.request(server)
          .put('/customers/creditCard')
          .set('user-key', token)
          .send(customer)
          .end((err, res) => {
                res.should.have.status(200)
                res.body.should.be.a('object');
                res.body.should.have.property('customer_id')
                res.body.should.have.property('name')
                res.body.should.have.property('email')
                res.body.should.have.property('address_1')
                res.body.should.have.property('address_2')
                res.body.should.have.property('city')
                res.body.should.have.property('region')
                res.body.should.have.property('country')
                res.body.should.have.property('postal_code')
                res.body.should.have.property('shipping_region_id')
                res.body.should.have.property('day_phone')
                res.body.should.have.property('eve_phone')
                res.body.should.have.property('mob_phone')
                res.body.should.have.property('credit_card')

            done();
          });
    });
});

describe('/PUT Customers', () => {
    var customer = {
        name : "shahzaib",
        email : 'shahzaib415@email.com',
    }
    var token = "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InNoYWh6YWliNDE0QGVtYWlsLmNvbSIsImlhdCI6MTU1ODUzMDUzMSwiZXhwIjoxNTU4NjE2OTMxfQ.ssG6LmvoNiiYWMaEFq475iQ9IjvXibGRWQdu6e19FsA"
    it('it should update customer', (done) => {
      chai.request(server)
          .put('/customer')
          .set('user-key', token)
          .send(customer)
          .end((err, res) => {
                res.should.have.status(200)
                res.body.should.be.a('object');
                res.body.should.have.property('customer_id')
                res.body.should.have.property('name'); 
                res.body.should.have.property('email')
                res.body.should.have.property('address_1')
                res.body.should.have.property('address_2'); 
                res.body.should.have.property('city'); 
                res.body.should.have.property('region'); 
                res.body.should.have.property('postal_code'); 
                res.body.should.have.property('country'); 
                res.body.should.have.property('shipping_region_id'); 
                res.body.should.have.property('day_phone'); 
                res.body.should.have.property('eve_phone'); 
                res.body.should.have.property('mob_phone'); 
                res.body.should.have.property('credit_card'); 
            done();
          });
    });
});

/**
 * Test Get routes for Customer
 */

describe('/GET Customers', () => {
    var token = "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InNoYWh6YWliNDE0QGVtYWlsLmNvbSIsImlhdCI6MTU1ODUzMDUzMSwiZXhwIjoxNTU4NjE2OTMxfQ.ssG6LmvoNiiYWMaEFq475iQ9IjvXibGRWQdu6e19FsA"
    it('it should get Customer details', (done) => {
      chai.request(server)
          .get('/customer')
          .set('user-key', token)
          .end((err, res) => {
                res.should.have.status(200)
                res.body.should.be.a('object');
                res.body.should.have.property('customer_id')
                res.body.should.have.property('name'); 
                res.body.should.have.property('email')
                res.body.should.have.property('address_1')
                res.body.should.have.property('address_2'); 
                res.body.should.have.property('city'); 
                res.body.should.have.property('region'); 
                res.body.should.have.property('postal_code'); 
                res.body.should.have.property('country'); 
                res.body.should.have.property('shipping_region_id'); 
                res.body.should.have.property('day_phone'); 
                res.body.should.have.property('eve_phone'); 
                res.body.should.have.property('mob_phone'); 
                res.body.should.have.property('credit_card'); 
            done();
          });
    });
});

/**
 * Test POST routes for Customer
 */

describe('/POST Customers', () => {
    var customer = {
        name : "Azfar",
        email: "azfar@gmail.com",
        password : "password123",
        shipping_region_id : 12
    }
    var token = "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InNoYWh6YWliNDE0QGVtYWlsLmNvbSIsImlhdCI6MTU1ODUzMDUzMSwiZXhwIjoxNTU4NjE2OTMxfQ.ssG6LmvoNiiYWMaEFq475iQ9IjvXibGRWQdu6e19FsA"
    it('it should Post Data to register customer', (done) => {
      chai.request(server)
          .post('/customers')
          .set('user-key', token)
          .send(customer)
          .end((err, res) => {
                res.should.have.status(200)
                res.body.should.be.a('object');
                res.body.should.have.property('customer')
                .to.have.nested.property('schema.customer_id'); 
                res.body.should.have.property('customer')
                .to.have.nested.property('schema.name'); 
                res.body.should.have.property('customer')
                .to.have.nested.property('schema.email')
                res.body.should.have.property('customer')
                .to.have.nested.property('schema.address_1')
                res.body.should.have.property('customer')
                .to.have.nested.property('schema.address_2'); 
                res.body.should.have.property('customer')
                .to.have.nested.property('schema.city'); 
                res.body.should.have.property('customer')
                .to.have.nested.property('schema.region'); 
                res.body.should.have.property('customer')
                .to.have.nested.property('schema.postal_code'); 
                res.body.should.have.property('customer')
                .to.have.nested.property('schema.country'); 
                res.body.should.have.property('customer')
                .to.have.nested.property('schema.shipping_region_id'); 
                res.body.should.have.property('customer')
                .to.have.nested.property('schema.day_phone'); 
                res.body.should.have.property('customer')
                .to.have.nested.property('schema.eve_phone'); 
                res.body.should.have.property('customer')
                .to.have.nested.property('schema.mob_phone'); 
                res.body.should.have.property('customer')
                .to.have.nested.property('schema.credit_card');  

            done();
          });
    });
});

describe('/POST Sign in Customer', () => {
    var customer = {
        email: "shahzaib414@email.com",
        password : "123456"
    }
    var token = "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InNoYWh6YWliNDE0QGVtYWlsLmNvbSIsImlhdCI6MTU1ODUzMDUzMSwiZXhwIjoxNTU4NjE2OTMxfQ.ssG6LmvoNiiYWMaEFq475iQ9IjvXibGRWQdu6e19FsA"
    it('it should Sign in customer', (done) => {
      chai.request(server)
          .post('/customer/login')
          .set('user-key', token)
          .send(customer)
          .end((err, res) => {
                res.should.have.status(200)
                res.body.should.be.a('object');
                res.body.should.have.property('customer')
                .to.have.nested.property('schema.customer_id'); 
                res.body.should.have.property('customer')
                .to.have.nested.property('schema.name'); 
                res.body.should.have.property('customer')
                .to.have.nested.property('schema.email')
                res.body.should.have.property('customer')
                .to.have.nested.property('schema.address_1')
                res.body.should.have.property('customer')
                .to.have.nested.property('schema.address_2'); 
                res.body.should.have.property('customer')
                .to.have.nested.property('schema.city'); 
                res.body.should.have.property('customer')
                .to.have.nested.property('schema.region'); 
                res.body.should.have.property('customer')
                .to.have.nested.property('schema.postal_code'); 
                res.body.should.have.property('customer')
                .to.have.nested.property('schema.country'); 
                res.body.should.have.property('customer')
                .to.have.nested.property('schema.shipping_region_id'); 
                res.body.should.have.property('customer')
                .to.have.nested.property('schema.day_phone'); 
                res.body.should.have.property('customer')
                .to.have.nested.property('schema.eve_phone'); 
                res.body.should.have.property('customer')
                .to.have.nested.property('schema.mob_phone'); 
                res.body.should.have.property('customer')
                .to.have.nested.property('schema.credit_card');  

            done();
          });
    });
});

