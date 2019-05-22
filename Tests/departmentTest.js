process.env.NODE_ENV = 'test';
/**
 * Dev-Dependencies
 */
let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../index');
let should = chai.should();

chai.use(chaiHttp);

/**
 * Test Get routes for Department 
 */

describe('/GET Departments', () => {
    it('it should GET all departments', (done) => {
      chai.request(server)
          .get('/departments')
          .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('array');
                res.body.length.should.above(0);
            done();
          });
    });
});

describe('/GET Departments by department ID', () => {
    it('it should GET a Department by ID', (done) => {
      chai.request(server)
          .get('/departments/1')
          .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('object');
                res.body.should.have.property('name');
                res.body.should.have.property('description')
                res.body.should.have.property('department_id').eql(1);
            done();
          });
    });
});