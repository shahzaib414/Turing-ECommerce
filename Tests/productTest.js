let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../index');
let should = chai.should();
chai.use(chaiHttp);
chai.use(require('chai-things'));
var expect = chai.expect;

/**
 *  Test GET routes for Products
 */

describe('/GET Products', () => {
    it('it should GET all Prodcuts', (done) => {
      chai.request(server)
          .get('/products')
          .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('object');
                res.body.should.have.property('count')
                res.body.should.have.property('row') 
                res.body.row.should.all.have.property('product_id')
                res.body.row.should.all.have.property('name'); 
                res.body.row.should.all.have.property('description')
                res.body.row.should.all.have.property('price')
                res.body.row.should.all.have.property('discounted_price'); 
                res.body.row.should.all.have.property('image'); 
                res.body.row.should.all.have.property('image_2'); 
                res.body.row.should.all.have.property('thumbnail');
                res.body.row.should.all.have.property('display');  
            done();
          });
    });
});


describe('/GET Search Products', () => {
    it('it should GET Search Products', (done) => {
      chai.request(server)
          .get('/products/search?query_string=Italia')
          .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('object');
                res.body.should.have.property('count')
                res.body.should.have.property('row') 
                res.body.row.should.all.have.property('product_id')
                res.body.row.should.all.have.property('name'); 
                res.body.row.should.all.have.property('description')
                res.body.row.should.all.have.property('price')
                res.body.row.should.all.have.property('discounted_price'); 
                res.body.row.should.all.have.property('image'); 
                res.body.row.should.all.have.property('image_2'); 
                res.body.row.should.all.have.property('thumbnail');
                res.body.row.should.all.have.property('display');  
            done();
          });
    });
});

describe('/GET Get Products by ID', () => {
    it('it should GET Products by ID', (done) => {
      chai.request(server)
          .get('/products/1')
          .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('object');
                res.body.should.have.property('product_id')
                res.body.should.have.property('name'); 
                res.body.should.have.property('description')
                res.body.should.have.property('price')
                res.body.should.have.property('discounted_price'); 
                res.body.should.have.property('image'); 
                res.body.should.have.property('image_2'); 
                res.body.should.have.property('thumbnail');
                res.body.should.have.property('display');  
            done();
          });
    });
});

describe('/GET Get list of Products on Department', () => {
    it('it should GET list of Products on Department', (done) => {
      chai.request(server)
          .get('/products/inDepartment/1')
          .end((err, res) => {
            res.should.have.status(200);
                res.body.should.be.a('object');
                res.body.should.have.property('count')
                res.body.should.have.property('row') 
                res.body.row.should.all.have.property('product_id')
                res.body.row.should.all.have.property('name'); 
                res.body.row.should.all.have.property('description')
                res.body.row.should.all.have.property('price')
                res.body.row.should.all.have.property('discounted_price'); 
                res.body.row.should.all.have.property('thumbnail');
            done();
          });
    });
});

describe('/GET Get list of Products on Categories', () => {
    it('it should GET list of Products on Categories', (done) => {
      chai.request(server)
          .get('/products/inCategory/1')
          .end((err, res) => {
            res.should.have.status(200);
                res.body.should.be.a('object');
                res.body.should.have.property('count')
                res.body.should.have.property('row') 
                res.body.row.should.all.have.property('product_id')
                res.body.row.should.all.have.property('name'); 
                res.body.row.should.all.have.property('description')
                res.body.row.should.all.have.property('price')
                res.body.row.should.all.have.property('discounted_price'); 
                res.body.row.should.all.have.property('thumbnail');
            done();
          });
    });
});

describe('/GET Get Details of a Product', () => {
    it('it should GET Details of a Product', (done) => {
      chai.request(server)
          .get('/products/1/details')
          .end((err, res) => {
            res.should.have.status(200)
            res.body.should.be.a('object');
            res.body.should.have.property('product_id')
            res.body.should.have.property('name'); 
            res.body.should.have.property('description')
            res.body.should.have.property('price')
            res.body.should.have.property('discounted_price'); 
            res.body.should.have.property('image'); 
            res.body.should.have.property('image_2'); 
    
        done();
          });
    });
});


describe('/GET Get Details of a Product', () => {
    it('it should GET Details of a Product', (done) => {
      chai.request(server)
          .get('/products/1/details')
          .end((err, res) => {
            res.should.have.status(200)
            res.body.should.be.a('object');
            res.body.should.have.property('product_id')
            res.body.should.have.property('name'); 
            res.body.should.have.property('description')
            res.body.should.have.property('price')
            res.body.should.have.property('discounted_price'); 
            res.body.should.have.property('image'); 
            res.body.should.have.property('image_2'); 
        done();
          });
    });
});

describe('/GET Get Location of a Product', () => {
    it('it should GET Location of a Product', (done) => {
      chai.request(server)
          .get('/products/1/locations')
          .end((err, res) => {
            res.should.have.status(200);
            res.body.should.be.a('array').to.have.all.deep.keys('category_id','category_name','department_id','department_name');


        done();
          });
    });
});
describe('/GET Get Reviews of a Product', () => {
    it('it should GET Reviews of a Product', (done) => {
      chai.request(server)
          .get('/products/1/reviews')
          .end((err, res) => {
            res.should.have.status(200)
            res.body.should.be.a('array').to.have.all.deep.keys('customer_id','product_id','review','rating','created_on','review_id');


        done();
          });
    });
});

/**
 *  Test GET routes for Products
 */
describe('/POST Post Reviews of a Product', () => {
    var PostData = {
        review: "This is test review of Product",
        rating : 5
    }
    var token = "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InNoYWh6YWliNDE0QGVtYWlsLmNvbSIsImlhdCI6MTU1ODUzMDUzMSwiZXhwIjoxNTU4NjE2OTMxfQ.ssG6LmvoNiiYWMaEFq475iQ9IjvXibGRWQdu6e19FsA"
    it('it should POST Reviews of a Product', (done) => {
      chai.request(server)
          .post('/products/1/reviews')
          .set('user-key', token)
          .send(PostData)
          .end((err, res) => {
            res.should.have.status(200)
            res.body.should.be.a('object');
            res.body.should.have.property('review_id')
            res.body.should.have.property('customer_id')
            res.body.should.have.property('product_id')
            res.body.should.have.property('review')
            res.body.should.have.property('created_on')
        done();
          });
    });
});