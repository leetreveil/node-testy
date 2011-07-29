# testy

Super simple testing script. No added sugar. 100~ LOC.


## Install

Install with npm:

``` bash
npm install testy
```

## Usage

### Simple

``` javascript
var testy = require('testy');

var test = new testy();
var assert = test.assert;

assert.equal(true, true);
```


### Most complex

```` javascript
var testy = require('testy');

var options = { expected : 2, name : 'Some simple test', timeout : 3000 };
var test = new testy(options);
var assert = test.assert;

assert.Equal(1, 1);
assert.deepEqual([1, 2, 3], [1, 2, 3]);

test.finish();
```