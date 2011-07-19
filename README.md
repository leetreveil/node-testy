What is it?
__________
Super simple testing framework. No added sugar. 120 LOC.


Installation
__________
Install with npm:

npm install testy


Simplest
___________
````javascript
var testy = require('testy');

var test = new testy();
var assert = test.assert;

assert.equal(true, true);


Most complex
___________
`````javascript
var testy = require('testy');

var options = { expected : 1, name : 'Some simple test', timeout : 3000 };
var test = new testy(options);
var assert = test.assert;

assert.Equal(1, 1);
assert.deepEqual([1, 2, 3], [1, 2, 3]);

test.finish();