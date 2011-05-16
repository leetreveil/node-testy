var path = require('path'),
    assert = require('./assert-ext'),
    fileName = module.parent.filename;
    

var Testy = module.exports = function() {
  if (!(this instanceof Testy)) return new Testy(path);
  this.expected = 0;
  this.testsRan = 0;
  this.assert = new assert();
  
  var self = this;
  this.assert.on('ranTest', function() {
    self.ranTests(1);
  });

  this.ranTests(0); //do a check now (incase no tests are ran)
}

Testy.prototype.finish = function() {
  clearTimeout(this.timeout);
  this.report();
}

Testy.prototype.ranTests = function(number) {
  this.testsRan += number;
  this.timer =  this.timer || Date.now();
  clearTimeout(this.timeout);
  
  var self = this;
  this.timeout = setTimeout(function() {
    self.report();
  }, 500);
}

Testy.prototype.report = function() {
  function color(text) {
    return (this.testsRan === this.expected) 
      ? '\033[32m' + text + '\033[0m' //green
      : '\033[31m' + text + '\033[0m'; //red
  }
  
  var end = Date.now() - this.timer;
  
  console.log('%s ran %s out of %s tests in %sms', 
    path.basename(fileName), 
    color(this.testsRan), color(this.expected), end);
}