const chai = require('chai');
let assert = chai.assert;
const ConvertHandler = require('../controllers/convertHandler.js');

let convertHandler = new ConvertHandler();

suite('Unit Tests', function() {
  this.timeout(500);
  suite('Right initial number and unit', function() {
    suite('number', function() {
      // #1
      test('get whole number input', function() {
        assert.strictEqual(convertHandler.getNum('4km'), 4, 'should get the whole number');
        assert.strictEqual(convertHandler.getNum('4km.'), 4, 'should get the whole number while invalid unit');
      });
      // #2
      test('get decimal input', function() {
        assert.strictEqual(convertHandler.getNum('4.2km'), 4.2, 'should get the float number');
      });
      // #3
      test('get fractional input', function() {
        assert.strictEqual(convertHandler.getNum('4/5km'), 0.8, 'should get the fractional number');
      });
      // #4
      test('get fractional input with decimal', function() {
        assert.strictEqual(convertHandler.getNum('4.5/8km'), 0.5625, 'should get the fractional number with decimal');
        assert.strictEqual(convertHandler.getNum('4.2/2.1km'), 2, 'should get the fractional number with decimals');
      });
      // #5
      test('throw error when get double fraction', function() {
        assert.throws(function(){convertHandler.getNum('4.2/2/3km')}, Error, null, 'should not accept more than 1 slash');
      });
      // #6
      test('get 1 if no number input', function() {
        assert.strictEqual(convertHandler.getNum('km'), 1, 'should return 1 if no input number');
        assert.strictEqual(convertHandler.getNum('a12km'), 1, 'should return 1 if no input number');
      });
      // #7
      test('check for right error throwing', function() {
        assert.throws(function(){convertHandler.getNum('?km')}, Error, null, 'should not accept anything else than digits, dot and forward slash');
        assert.throws(function(){convertHandler.getNum('4,2km')}, Error, null, 'should not accept anything else than digits, dot and forward slash');
        assert.throws(function(){convertHandler.getNum('4..?2km')}, Error, null, 'should not accept invalid number');
        assert.throws(function(){convertHandler.getNum('4..2km')}, Error, null, 'should not accept invalid number');
        assert.throws(function(){convertHandler.getNum('4,2/2km')}, Error, null, 'should not accept invalid number as a part of fraction');
        assert.throws(function(){convertHandler.getNum('/2km')}, Error, null, 'should not accept empty fractional');
        assert.throws(function(){convertHandler.getNum('2/km')}, Error, null, 'should not accept empty fractional');
        assert.throws(function(){convertHandler.getNum('4..2/2.1km')}, Error, null, 'should not accept invalid number');
      });
    })
    suite('unit', function() {
      // #8
      test('get the initial unit', function() {
        assert.strictEqual(convertHandler.getUnit('4km'), 'km', 'should get km');
      });
      // #9
      test('throw error if invalid unit', function() {
        assert.throws(function(){convertHandler.getUnit('4kmn')}, Error, null, 'should not accept invalid unit');
        assert.throws(function(){convertHandler.getUnit('m445,5kmn')}, Error, null, 'should not accept invalid unit');
        assert.throws(function(){convertHandler.getUnit('5li')}, Error, null, 'should not accept invalid unit');
      });
      // #10
      test('correct the cases', function() {
        assert.strictEqual(convertHandler.getUnit('4Km'), 'km', 'should get km');
        assert.strictEqual(convertHandler.getUnit('4KM'), 'km', 'should get km');
        assert.strictEqual(convertHandler.getUnit('5lbs'), 'lbs', 'should get lbs');
        assert.strictEqual(convertHandler.getUnit('1mI'), 'mi', 'should get mi');
        assert.strictEqual(convertHandler.getUnit('2gAl'), 'gal', 'should get gal');
        assert.strictEqual(convertHandler.getUnit('3l'), 'L', 'should get L');
      });
      // #11
      test('potential number input', function() {
        assert.strictEqual(convertHandler.getUnit('kg'), 'kg', 'should get kg');
        assert.strictEqual(convertHandler.getUnit('4.2/2mi'), 'mi', 'should get mi');
        assert.strictEqual(convertHandler.getUnit('4..3.3lbs'), 'lbs', 'should get lbs');
        assert.strictEqual(convertHandler.getUnit('4,2/2km'), 'km', 'should get km');
        assert.strictEqual(convertHandler.getUnit('4,2/2?`1gal'), 'gal', 'should get gal');
        assert.strictEqual(convertHandler.getUnit('4,2/2/2L'), 'L', 'should get L');
      });
    });
  })

  suite('Right return unit', function() {
    // #12
    test('get the right return unit', function() {
      assert.equal(convertHandler.getReturnUnit('mi'), 'km', 'should get km');
      assert.equal(convertHandler.getReturnUnit('km'), 'mi', 'should get mi');
      assert.equal(convertHandler.getReturnUnit('lbs'), 'kg', 'should get kg');
      assert.equal(convertHandler.getReturnUnit('kg'), 'lbs', 'should get lbs');
      assert.equal(convertHandler.getReturnUnit('gal'), 'L', 'should get L');
      assert.equal(convertHandler.getReturnUnit('L'), 'gal', 'should get gal');
    });
    // #13
    test('get the right spell-out unit', function() {
      assert.equal(convertHandler.spellOutUnit('mi'), 'miles', 'should get miles');
      assert.equal(convertHandler.spellOutUnit('km'), 'kilometers', 'should get kilometers');
      assert.equal(convertHandler.spellOutUnit('lbs'), 'pounds', 'should get pounds');
      assert.equal(convertHandler.spellOutUnit('kg'), 'kilograms', 'should get kilograms');
      assert.equal(convertHandler.spellOutUnit('gal'), 'gallons', 'should get gallons');
      assert.equal(convertHandler.spellOutUnit('L'), 'liters', 'should get liters');
    });
  });

  suite('Convert', function() {
    // #14
    test('mi - km', function() {
      assert.equal(convertHandler.convert(1, 'mi'), 1.60934, '1mi');
      assert.equal(convertHandler.convert(1, 'km'), 0.62137, '1km');
      assert.equal(convertHandler.convert(5, 'mi'), 8.0467, '1mi');
      assert.equal(convertHandler.convert(5, 'km'), 3.10686, '1km');
      assert.equal(convertHandler.convert(8, 'km'), 4.97098, '1km');
    });
    // #15
    test('kg - lbs', function() {
      assert.equal(convertHandler.convert(1, 'kg'), 2.20462, '1kg');
      assert.equal(convertHandler.convert(1, 'lbs'), 0.45359, '1lbs');
      assert.equal(convertHandler.convert(43, 'kg'), 94.79885, '43kg');
      assert.equal(convertHandler.convert(43, 'lbs'), 19.50446, '43lbs');
    });
    // #16
    test('gal - L', function() {
      assert.equal(convertHandler.convert(1, 'gal'), 3.78541, '1gal');
      assert.equal(convertHandler.convert(1, 'L'), 0.26417, '1L');
      assert.equal(convertHandler.convert(14.5, 'gal'), 54.88845, '14.5gal');
      assert.equal(convertHandler.convert(14.5, 'L'), 3.8305, '14.5L');
    })
  });

  suite('Make string', function() {
    // #17
    test('string #1', function() {
      assert.equal(convertHandler.getString(1, 'gallons', 3.78541, 'liters'), '1 gallons converts to 3.78541 liters');
    });
  })

});