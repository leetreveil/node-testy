var path   = require('path');
var util   = require('util');
var assert = require('assert');
var events = require('events');


var testies = [];

process.once('exit', function (code) {
  var totalExpectedTests = 0;
  var totalTestsRan = 0;

  for (var i in testies)
  {
    testies[i].report();
    totalExpectedTests += testies[i].expected;
    totalTestsRan += testies[i]._testsRan;
  }

  if (totalExpectedTests === 0) process.exit(0);
  process.exit((totalTestsRan === totalExpectedTests) ? 0 : 1);
})

var Testy = module.exports = function (name) {
  if (!(this instanceof Testy)) return new Testy();

  testies.push(this);

  this.expected  = 0;
  this.name      = name || '';
  this.assert    = new AssertExt(this);
  this._testsRan = 0;
  this._timer    = Date.now();
}

Testy.prototype.report = function () {
  var self     = this;
  var filename = module.parent.filename;
  var named    = this.name;
      
  var taken = Date.now() - this._timer;
   
  if (named.length > 0) named = ' [' + named + ']';
  
  var passed = (self._testsRan === self.expected)
    ? color('PASS') : color('FAIL')
    
  if (this.expected === 0) {
    console.log('%s %s%s ran %s tests in %sms',
      color('PASS'), path.basename(filename), 
      named, this._testsRan, taken);
  } else {
    console.log('%s %s%s ran %s out of %s tests in %sms',
      passed, path.basename(filename), named, 
      this._testsRan, this.expected, taken);
  }
  
  function color (text) {
    if (text === 'PASS') {
      return '\033[32m' + text + '\033[0m';
    }
    
    if (text === 'FAIL') {
      return '\033[31m' + text + '\033[0m';
    }
  }
}

var AssertExt = function (parent) {
  var assertions = [ 'fail', 'ok', 'equal', 'notEqual', 'deepEqual', 
                     'notDeepEqual', 'strictEqual', 'notStrictEqual', 
                     'throws', 'doesNotThrow', 'ifError' ];
        
  var self = this;             
  assertions.forEach(function (funcName) {
    self[funcName] = function () {
      assert[funcName].apply(null, arguments);
      parent._testsRan += 1;
    }
  })
}