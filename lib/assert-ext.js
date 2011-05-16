var assert = require('assert'),
    util = require('util'),
    events = require('events');

var AssertExt = module.exports = function() {
  events.EventEmitter.call(this);
  
  var assertions = [ 'ok', 'equal', 'notEqual', 'deepEqual', 'notDeepEqual', 'strictEqual', 
                     'notStrictEqual', 'throws', 'doesNotThrow', 'ifError'];
        
  var self = this;             
  assertions.forEach(function(funcName) {
    self[funcName] = function() {
      assert[funcName].apply(null, arguments);
      self.emit('ranTest');
    }
  });
}

util.inherits(AssertExt, events.EventEmitter);