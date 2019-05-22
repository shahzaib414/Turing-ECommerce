let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../index');
let should = chai.should();
chai.use(chaiHttp);
chai.use(require('chai-things'));
var expect = chai.expect;

/**
 * Test GET routes for attributes
 */

describe('/GET Attributes', () => {
    it('it should GET all Attributes', (done) => {
      chai.request(server)
          .get('/attributes')
          .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('array').to.have.all.deep.keys('attribute_id','name');             
            done();
          });
    });
});

describe('/GET Attributes by ID', () => {
    it('it should GET a Attribute by ID ', (done) => {
      chai.request(server)
          .get('/attributes/1')
          .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('object')
                res.body.should.have.property('attribute_id')
                res.body.should.have.property('attribute_id').eql(1)
                res.body.should.have.property('name')
            done();
          });
    });
});

describe('/GET Values Attribues from Attribute', () => {
    it('it should GET a Values Attribues by Attribute ID ', (done) => {
      chai.request(server)
          .get('/attributes/values/2')
          .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('array').to.have.all.deep.keys('attribute_value_id','attribute_id','value'); 
            done();
          });
    });
});

describe('/GET Attribues with Product ID', () => {
    it('it should GET Attribues with Product ID ', (done) => {
      chai.request(server)
          .get('/attributes/inProduct/2')
          .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('array').to.have.all.deep.keys('attribute_value_id','name','value'); 
            done();
          });
    });
});