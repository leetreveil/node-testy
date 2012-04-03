var path = require('path'),
    util = require('util'),
    assert = require('assert'),
    events = require('events'),
    fileName = module.parent.filename;


var AssertExt = function() {
  events.EventEmitter.call(this);
  
  var assertions = [ 'fail', 'ok', 'equal', 'notEqual', 'deepEqual', 
                     'notDeepEqual', 'strictEqual', 'notStrictEqual', 
                     'throws', 'doesNotThrow', 'ifError' ];
        
  var self = this;             
  assertions.forEach(function(funcName) {
    self[funcName] = function() {
      assert[funcName].apply(null, arguments);
      self.emit('RANTEST');
    }
  });
}

util.inherits(AssertExt, events.EventEmitter);

var Testy = module.exports = function(options) {
  if (!(this instanceof Testy)) return new Testy();

  this.expected = 0;
  this.name = '';
  this.assert = new AssertExt();
  this._testsRan = 0;
  this._timer = Date.now();
  
  options = options || {};
  
  var keys = Object.keys(options);
  for (var i = 0; i < keys.length; i++) {
    var key = keys[i];
    this[key] = options[key];
  }

  var self = this;

  // when the process exits report the results
  process.on('exit', function () {
    self.report();
  });

  // everytime a test is ran update the test count
  this.assert.on('RANTEST', function() {
    self._testsRan += 1;
  });
}

Testy.prototype.report = function() {
  var self = this,
      named = this.name;
      
  var taken = Date.now() - this._timer;
   
  if (named.length > 0) named = ' [' + named + ']';
  
  passed = (self._testsRan === self.expected)
    ? color('PASS') : color('FAIL')
    
  if (this.expected === 0) {
    console.log('%s %s%s ran %s tests in %sms',
      color('PASS'), path.basename(fileName), 
      named, this._testsRan, taken);
  } else {
    console.log('%s %s%s ran %s out of %s tests in %sms',
      passed, path.basename(fileName), named, 
      this._testsRan, this.expected, taken);
  }
  
  function color(text) {
    if (text === 'PASS') {
      return '\033[32m' + text + '\033[0m';
    }
    
    if (text === 'FAIL') {
      return '\033[31m' + text + '\033[0m';
    }
  }
}