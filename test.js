/**
 * tipe tests
 * *
 * To run:  node test
 */

/* jshint asi: true */

var tipe = require('./tipe')
var _assert = require('assert')
var assertCount = 0


// Dummy values of various types
var dt = new Date()
var er = new Error()
var ar
var fn = function() {ar = arguments}
fn() // sets ar


// Each named type mapped to a value of that type
// Shared by bench.js
var sample = exports.sample = {
  'undefined': undefined,
  'null': null,
  'boolean': false,
  'number': 1,
  'string': 'foo',
  'date': dt,
  'array': [],
  'regexp': /^a/,
  'error': er,
  'function': fn,
  'arguments': ar,
  'object': {}
}


// Count successful assertions
var assert = function(expr, msg) {
  _assert(expr, msg)
  assertCount++
}


// Test basic use:  tipe(null) === 'null', etc...
for (var key in sample) {
  assert(key === tipe(sample[key]),
      'Error: ' + key + ': ' + tipe(sample[key]))
}


// Extra cases just to be sure
assert('boolean' === tipe(false))
assert('number' === tipe(0))
assert('number' === tipe(-1))
assert('number' === tipe(1))
assert('number' === tipe(Number(1)))
assert('string' === tipe(String()))
assert('number' === tipe(NaN))
assert('function' === tipe(Error))
assert('error' === tipe(new SyntaxError()))


// Test boolean methods of all sample types aginst all sample values
for (var method in sample) {

  for (var valType in sample) {

    var propCaseMeth = 'is' + method.charAt(0).toUpperCase() + method.slice(1)
    var corpse = 'method: ' + method + 'value type: ' + valType
    var propCorpse = 'method: ' + propCaseMeth + 'value type: ' + valType

    if (method === valType) {  // tipe.string(sample['string'])
      if ('arguments' === method) {
        // arguments is a noop property of a function
        assert(tipe.args(sample[valType]), corpse)
      }
      else {
        assert(tipe[method](sample[valType]), corpse)
      }
      assert(tipe[propCaseMeth](sample[valType]), propCorpse)
    }

    else {  // tipe.string(sample[<'all types except string'>])
      if ('arguments' === method) {
        // arguments is a noop property of a function
        assert(!tipe.args(sample[valType]), corpse)
      }
      else {
        assert(!tipe[method](sample[valType]), corpse)
      }
      assert(!tipe[propCaseMeth](sample[valType]), propCorpse)
    }
  }
}

// Test defined
assert(tipe.defined(1))
assert(!tipe.defined())

// Test truthy
assert(tipe.truthy(1))
assert(tipe.truthy(45.6))
assert(tipe.truthy('1'))
assert(tipe.truthy('yes'))
assert(tipe.truthy('true'))
assert(tipe.truthy('TrUe'))
assert(tipe.truthy('on'))
assert(!tipe.truthy())
assert(!tipe.truthy(null))
assert(!tipe.truthy(0))
assert(!tipe.truthy(-1))  // not like javascript
assert(!tipe.truthy('0'))
assert(!tipe.truthy('-1'))
assert(!tipe.truthy('foo')) // not like javascript

// Test scalar
assert(tipe.scalar(1))
assert(tipe.scalar('hi'))
assert(tipe.scalar(true))
assert(tipe.scalar(false))
assert(tipe.scalar(null))
assert(tipe.scalar())
assert(!tipe.scalar({}))
assert(!tipe.scalar([]))
assert(!tipe.scalar(new Date()))
assert(!tipe.scalar(function(){}))

// Test user-defined tipes
function Dog() {}
var rover = new Dog()
assert(tipe.object(rover))
tipe.addTipe('Dog', 'dog')
assert(tipe.dog(rover))
assert(tipe.isDog(rover))
assert('dog' === tipe(rover))
assert(!tipe.object(rover))
assert(!tipe.dog({}))

// Cannot redefine built-in tipes
tipe.addTipe('Number', 'string')
assert(tipe.string('foo'))
assert(tipe.number(1))

console.log(assertCount + ' tipe tests pass')
