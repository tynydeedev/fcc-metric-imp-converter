function ConvertHandler() {
  
  this.getNum = function(input) {
    let result;
    // Separate the first number-like from the input
    let number = input.split(/[a-z]/i)[0];
    // If there is no number-like input, make it 1
    (!number) ? number = '1' : number;
    // Only allow digit, dot and forward slash
    const regex = /[^\d\.\/]/;
    const test = regex.test(number);
    if (test) throw new Error('invalid number');
    // Check if there are forward slash
    const slashCheck = /\//.test(number);
    if (slashCheck) {
      const numberOfSlash = number.match(/\//g).length;
      if (numberOfSlash === 1) {
        number = number.split('/').map(num => Number(num));
        if (!number[0] || !number[1]) throw new Error('invalid number');
        result = number[0] / number[1];
      } else {
        throw new Error('invalid number');
      }
    } else {
      if (!Number(number)) throw new Error('invalid number');
      result = Number(number);
    }
    return result;
  };
  
  this.getUnit = function(input) {
    // List of valid unit
    const validUnit = ['km', 'mi', 'lbs', 'kg', 'gal', 'l'];
    // Separate the first number-like from the input
    const number = input.split(/[a-z]/i)[0];
    const letter = input.slice(number.length).toLowerCase();
    // Check if valid Unit
    if (validUnit.indexOf(letter) === -1) {
      throw new Error('invalid unit');
    };    
    return (letter === 'l') ? 'L' : letter;;
  };
  
  this.getReturnUnit = function(initUnit) {
    const list = {
      km: 'mi',
      mi: 'km',
      lbs: 'kg',
      kg: 'lbs',
      gal: 'L',
      L: 'gal'
    }
    
    return list[initUnit];
  };

  this.spellOutUnit = function(unit) {
    const list = {
      km: 'kilometers',
      mi: 'miles',
      lbs: 'pounds',
      kg: 'kilograms',
      gal: 'gallons',
      L: 'liters'
    }
    
    return list[unit];
  };
  
  this.convert = function(initNum, initUnit) {
    const galToL = 3.78541;
    const lbsToKg = 0.453592;
    const miToKm = 1.60934;
    switch (initUnit) {
      case 'km':
        return Math.round((initNum / miToKm) * 100000) / 100000;
      case 'mi':
        return Math.round(initNum * miToKm * 100000) / 100000;
      case 'kg':
        return Math.round((initNum / lbsToKg) * 100000) / 100000;
      case 'lbs':
        return Math.round(initNum * lbsToKg * 100000) / 100000;
      case 'L':
        return Math.round((initNum / galToL) * 100000) / 100000;
      case 'gal':
        return Math.round(initNum * galToL * 100000) / 100000;
    }
  };
  
  this.getString = function(initNum, initUnit, returnNum, returnUnit) {    
    return `${initNum} ${initUnit} converts to ${returnNum} ${returnUnit}`;
  };
  
}

module.exports = ConvertHandler;