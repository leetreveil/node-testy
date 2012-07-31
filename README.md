[![Build Status](https://secure.travis-ci.org/leetreveil/node-testy.png)](http://travis-ci.org/leetreveil/node-testy)

# testy

Super simple testing script. No added sugar. ≈100 LOC.


## Install

Install with npm:

``` bash
npm install testy
```

## Usage

### Example A

Designed to be as simple as possible - no functions, just the test.

``` javascript
var test  = require('testy')();
var assert = test.assert;
assert.equal(true, true);
```

![example-a-screenshot!](https://github.com/leetreveil/node-testy/raw/master/example-a.png)


### Example B

Set the expected property for async testing.

```` javascript
var test  = require('testy')();
var assert = test.assert;

test.expected = 2;

setTimeout(function() {
  assert.equal(1, 1);
  assert.deepEqual([1, 2, 3], [1, 2, 3]);
}, 2000);
```

![example-b-screenshot!](https://github.com/leetreveil/node-testy/raw/master/example-b.png)



### Example C

Run multiple tests within a file.

``` javascript
var testy = require('testy');

var testA = new testy('testA');
var assertA = testA.assert;
testA.expected = 1;
assertA.strictEqual(1, 1);

var testB = new testy('testB');
var assertB = testB.assert;
testB.expected = 1;
assertB.strictEqual(1, 1);
```

![example-c-screenshot!](https://github.com/leetreveil/node-testy/raw/master/example-c.png)