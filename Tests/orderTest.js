let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../index');
let should = chai.should();
chai.use(chaiHttp);
chai.use(require('chai-things'));
var expect = chai.expect;

/**
 * Test POST route for Orders
 */
describe('/POST Create Orders', () => {
    var orderObject = {
        cart_id : 'lTnReRAvOh',
        shipping_id : 1,
        tax_id : 1
    }
    var token = "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InNoYWh6YWliNDE0QGVtYWlsLmNvbSIsImlhdCI6MTU1ODUzMDUzMSwiZXhwIjoxNTU4NjE2OTMxfQ.ssG6LmvoNiiYWMaEFq475iQ9IjvXibGRWQdu6e19FsA"
    
    it('it should Create Order ', (done) => {
      chai.request(server)
          .post('/orders')
          .set('user-key', token)
          .send(orderObject)
          .end((err, res) => {
                res.should.have.status(200);
                console.log(res.body)
                res.body.should.be.a('object')
                res.body.should.have.property('order_id')
            done();
          });
    });
});

/**
 * Test GET route for Orders
 */

describe('/GET Order info ', () => {
    
    var token = "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InNoYWh6YWliNDE0QGVtYWlsLmNvbSIsImlhdCI6MTU1ODUzMDUzMSwiZXhwIjoxNTU4NjE2OTMxfQ.ssG6LmvoNiiYWMaEFq475iQ9IjvXibGRWQdu6e19FsA"
    
    it('it should Get Order info ', (done) => {
      chai.request(server)
          .get('/orders/43')
          .set('user-key', token)
          .end((err, res) => {
                res.should.have.status(200);
                console.log(res.body)
                res.body.should.be.a('array').to.have.all.deep.keys('order_id','product_id','attributes','product_name','quantity','unit_cost','subtotal')
            done();
          });
    });
});

describe('/GET Orders by Customer ', () => {
    
    var token = "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InNoYWh6YWliNDE0QGVtYWlsLmNvbSIsImlhdCI6MTU1ODUzMDUzMSwiZXhwIjoxNTU4NjE2OTMxfQ.ssG6LmvoNiiYWMaEFq475iQ9IjvXibGRWQdu6e19FsA"
    
    it('it Orders by Customer', (done) => {
      chai.request(server)
          .get('/orders/inCustomer')
          .set('user-key', token)
          .end((err, res) => {
                res.should.have.status(200);
                console.log(res.body)
                res.body.should.be.a('array').to.have.all.deep.keys('order_id','total_amount','created_on','shipped_on','status','comments','customer_id','auth_code','reference','shipping_id','tax_id','cart_id')
            done();
          });
    });
});

describe('/GET Short info about Order', () => {
    
    var token = "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InNoYWh6YWliNDE0QGVtYWlsLmNvbSIsImlhdCI6MTU1ODUzMDUzMSwiZXhwIjoxNTU4NjE2OTMxfQ.ssG6LmvoNiiYWMaEFq475iQ9IjvXibGRWQdu6e19FsA"
    
    it('it should Get Short info about Order', (done) => {
      chai.request(server)
          .get('/orders/shortDetail/43')
          .set('user-key', token)
          .end((err, res) => {
                res.should.have.status(200);
                console.log(res.body)
                res.body.should.be.a('object')//.to.have.all.deep.keys('order_id','total_amount','created_on','shipped_on','status','name')
                res.body.should.have.property('order_id')
                res.body.should.have.property('total_amount')
                res.body.should.have.property('created_on')
                res.body.should.have.property('shipped_on')
                res.body.should.have.property('status')

                done();
          });
    });
});