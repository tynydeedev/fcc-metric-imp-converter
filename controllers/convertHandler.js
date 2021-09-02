function ConvertHandler() {
  
  this.getNum = function(input) {
    let result;
    // Separate the first number-like from the input
    let number = input.split(/[a-z]/i).filter(e => e != '')[0];
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
    let result;
    
    return result;
  };
  
  this.getReturnUnit = function(initUnit) {
    let result;
    
    return result;
  };

  this.spellOutUnit = function(unit) {
    let result;
    
    return result;
  };
  
  this.convert = function(initNum, initUnit) {
    const galToL = 3.78541;
    const lbsToKg = 0.453592;
    const miToKm = 1.60934;
    let result;
    
    return result;
  };
  
  this.getString = function(initNum, initUnit, returnNum, returnUnit) {
    let result;
    
    return result;
  };
  
}

module.exports = ConvertHandler;
