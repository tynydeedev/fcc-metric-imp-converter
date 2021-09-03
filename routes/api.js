'use strict';

const expect = require('chai').expect;
const ConvertHandler = require('../controllers/convertHandler.js');

module.exports = function (app) {
  
  let convertHandler = new ConvertHandler();

  app.get('/api', (req, res) => {
    res.json({msg: 'please use /api/convert with query "input" to use service'});
  });

  app.get('/api/convert', (req, res) => {
    console.log(req.query);
    const query = req.query;
    // If no query
    if(Object.keys(query).length === 0) return res.json({msg: 'please use query "input" to use conversion'});
    // Only use the input query
    const input = req.query.input;
    if (!input) return res.json({msg: 'please use query "input" to use conversion'});
    if (Array.isArray(input)) return res.json({msg: 'please use only one input'});

    // Error handler
    try {
      convertHandler.getNum(input);
      convertHandler.getUnit(input);
    }
    catch(err) {
      let error = 1;
      if (err.message === 'invalid unit') {
        return res.send('invalid unit');
      }
      try {
        convertHandler.getUnit(input);
      }
      catch(e) {
        return res.send('invalid number and unit');
      }
      return res.send(err.message);
    }

    // Create data from valid input
    const initNum = convertHandler.getNum(input);
    const initUnit = convertHandler.getUnit(input);
    const fullInitUnit = convertHandler.spellOutUnit(initUnit);
    const returnNum = convertHandler.convert(initNum, initUnit);
    const returnUnit = convertHandler.getReturnUnit(initUnit);
    const fullReturnUnit = convertHandler.spellOutUnit(returnUnit);
    const returnString = convertHandler.getString(initNum, fullInitUnit, returnNum, fullReturnUnit);

    res.json({
      initNum: initNum,
      initUnit: initUnit,
      returnNum: returnNum,
      returnUnit: returnUnit,
      string: returnString
    });
  })

};
