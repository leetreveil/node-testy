var path = require('path'),
    assert = require('./assert-ext'),
    fileName = module.parent.filename;
    

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
  
  this.assert = new assert();
  
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
  var self = this;
  function color(text) {
    return (self._testsRan === self.expected) 
      ? '\033[32m' + text + '\033[0m' //green
      : '\033[31m' + text + '\033[0m'; //red
  }
  
  var named = this.name;
  if (named.length > 0) named = ' [' + named + ']';
  
  var end = Date.now() - this._timer;
  
  console.log('%s%s ran %s out of %s tests in %sms', 
    path.basename(fileName), named, 
    color(this._testsRan), color(this.expected), end);
}