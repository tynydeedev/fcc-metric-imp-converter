const chaiHttp = require('chai-http');
const chai = require('chai');
let assert = chai.assert;
const server = require('../server');

chai.use(chaiHttp);

suite('Functional Tests', function() {
  // #1
  test('GET 43lbs', function() {
    chai
      .request(server)
      .get('/api/convert')
      .query({input: '43lbs'})
      .end(function(err, res) {
        assert.equal(res.status, 200);
        assert.equal(res.type, 'application/json');
        assert.equal(res.body.initNum, 43);
        assert.equal(res.body.initUnit, 'lbs');
        assert.equal(res.body.returnNum, 19.50446);
        assert.equal(res.body.returnUnit, 'kg');
        assert.equal(res.body.string, '43 pounds converts to 19.50446 kilograms');
      });
  });
  // #2
  test('GET 43m', function() {
    chai
      .request(server)
      .get('/api/convert')
      .query({input: '43m'})
      .end(function(err, res) {
        assert.equal(res.status, 200);
        assert.equal(res.text, 'invalid unit');
      })
  });
  // #3
  test('GET 4/2/2kg', function() {
    chai
      .request(server)
      .get('/api/convert')
      .query({input: '4/2/2kg'})
      .end(function(err, res) {
        assert.equal(res.status, 200);
        assert.equal(res.text, 'invalid number');
      })
  });
  // #4
  test('GET 4,2/4liters', function() {
    chai
      .request(server)
      .get('/api/convert')
      .query({input: '4,2/5kl'})
      .end(function(err, res) {
        assert.equal(res.status, 200);
        assert.equal(res.text, 'invalid number and unit');
      })
  });
  // #5
  test('GET gal', function() {
    chai
      .request(server)
      .get('/api/convert')
      .query({input: 'gal'})
      .end(function(err, res) {
        assert.equal(res.status, 200);
        assert.equal(res.body.string, '1 gallons converts to 3.78541 liters');
      })
  })
});
