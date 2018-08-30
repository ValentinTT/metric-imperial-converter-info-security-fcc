/*
*
*
*       Complete the API routing below
*
*
*/

'use strict';

const expect = require('chai').expect;
const ConvertHandler = require('../controllers/convertHandler.js');

module.exports = function (app) {
  
  const convertHandler = new ConvertHandler();

  app.route('/api/convert')
    .get(function (req, res){
      let input = req.query.input;
      let initNum = convertHandler.getNum(input);
      let initUnit = convertHandler.getUnit(input);
      if(initUnit === 'Error') {
        if(initNum === 'Error')
          res.send('invalid number and unit');
        else
          res.send('invalid unit');
      } else if(initNum === 'Error') {
          res.send('invalid number');
      }
      let returnNum = convertHandler.convert(initNum, initUnit);
      let returnUnit = convertHandler.getReturnUnit(initUnit);
      let toString = convertHandler.getString(initNum, initUnit, returnNum, returnUnit);
    
      res.json({
        initNum, 
        initUnit, 
        returnNum, 
        returnUnit, 
        string: toString
      });
    });
    
};
