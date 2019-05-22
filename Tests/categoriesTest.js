/**
 * Dev-Dependencies
 */
let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../index');
let should = chai.should();
chai.use(chaiHttp);
chai.use(require('chai-things'));

/**
 * Test GET routes for Categories
 */

describe('/GET Categories', () => {
    it('it should GET all Categories', (done) => {
      chai.request(server)
          .get('/categories')
          .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('object');
                res.body.rows.should.all.have.property('category_id')
                res.body.rows.should.all.have.property('department_id')
                res.body.rows.should.all.have.property('name')
                res.body.rows.should.all.have.property('description')
                res.body.should.have.property('rows')
                res.body.should.have.property('count')
             
            done();
          });
    });
});

describe('/GET Categories', () => {
    it('it should GET a Category by Category ID', (done) => {
      chai.request(server)
          .get('/categories/1')
          .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('object');
                res.body.should.have.property('category_id')
                res.body.should.have.property('category_id').eql(1)
                res.body.should.have.property('department_id')
                res.body.should.have.property('name')
                res.body.should.have.property('description')
                
                
             
            done();
          });
    });
});

describe('/GET Categories of Product', () => {
    it('it should GET a Category by Product ID', (done) => {
      chai.request(server)
          .get('/categories/inProduct/1')
          .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('object');
                res.body.should.have.property('category_id')
                res.body.should.have.property('department_id')
                res.body.should.have.property('name')
                res.body.should.have.property('description')
                
                
             
            done();
          });
    });
});

describe('/GET Categories of Department', () => {
    it('it should GET a Category by Department ID', (done) => {
      chai.request(server)
          .get('/categories/inDepartment/1')
          .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('object');
                res.body.should.have.property('category_id')
                res.body.should.have.property('department_id')
                res.body.should.have.property('department_id').eql(1)
                res.body.should.have.property('name')
                res.body.should.have.property('description')
                
                
             
            done();
          });
    });
});