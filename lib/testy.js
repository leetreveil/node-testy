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

  this.timeout = 500;
  this.expected = 0;
  this.name = '';
  
  options = options || {};
  
  var keys = Object.keys(options);
  for (var i = 0; i < keys.length; i++) {
    var key = keys[i];
    this[key] = options[key];
  }
  
  this._testsRan = 0;
  
  this.assert = new AssertExt();
  
  var self = this;
  this.assert.on('RANTEST', function() {
    self.ranTests(1);
  });

  this.ranTests(0); //do a check now (incase no tests are ran)
}

Testy.prototype.finish = function() {
  clearTimeout(this._timeout);
  this.report();
}

Testy.prototype.ranTests = function(number) {
  this._testsRan += number;
  this._timer =  this._timer || Date.now();
  clearTimeout(this._timeout);
  
  var self = this;
  this._timeout = setTimeout(function() {
    self.report();
  }, this.timeout);
}

Testy.prototype.report = function() {
  var self = this,
      named = this.name;
      
  var end = Date.now() - this._timer;
   
  if (named.length > 0) named = ' [' + named + ']';
  
  passed = (self._testsRan === self.expected)
    ? color('PASS') : color('FAIL')
    
  if (this.expected === 0) {
    console.log('%s %s%s ran %s tests in %sms',
      color('PASS'), path.basename(fileName), 
      named, this._testsRan, end);
  } else {
    console.log('%s %s%s ran %s out of %s tests in %sms',
      passed, path.basename(fileName), named, 
      this._testsRan, this.expected, end);
  }
  
  function color(text) {
    if (process.platform === 'win32') {
      return text;
    }

    if (text === 'PASS') {
      return '\033[31m' + text + '\033[0m';
    }
    
    if (text === 'FAIL') {
      return '\033[32m' + text + '\033[0m';
    }
  }
}