const chai = require('chai');
let assert = chai.assert;
const ConvertHandler = require('../controllers/convertHandler.js');

let convertHandler = new ConvertHandler();

suite('Unit Tests', function() {
  this.timeout(500);
  suite('Right number and input', function() {
    test('get the initial number', function() {
      assert.strictEqual(convertHandler.getNum('4km'), 4, 'should get the whole number');
      assert.strictEqual(convertHandler.getNum('4km.'), 4, 'should get the whole number while invalid unit');
      assert.strictEqual(convertHandler.getNum('4.2km'), 4.2, 'should get the float number');
      assert.throws(function(){convertHandler.getNum('4..2km')}, Error, null, 'should not accept invalid number');
      assert.throws(function(){convertHandler.getNum('?km')}, Error, null, 'should not accept invalid number');
      assert.throws(function(){convertHandler.getNum('4..?2km')}, Error, null, 'should not accept invalid number');
      assert.throws(function(){convertHandler.getNum('4,2km')}, Error, null, 'should not accept comma');
      assert.strictEqual(convertHandler.getNum('4/5km'), 0.8, 'should get the fractional number');
      assert.strictEqual(convertHandler.getNum('4.5/8km'), 0.5625, 'should get the fractional number with decimal');
      assert.throws(function(){convertHandler.getNum('4,2/2km')}, Error, null, 'should not accept comma');
      assert.strictEqual(convertHandler.getNum('4.2/2.1km'), 2, 'should get the fractional number with decimals');
      assert.throws(function(){convertHandler.getNum('4.2/2/3km')}, Error, null, 'should not accept more than 1 slash');
      assert.strictEqual(convertHandler.getNum('km'), 1, 'should return 1 if no input number');
    });

  })

});