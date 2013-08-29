/**
 * tipe tests
 *
 * To run:  node test
 */

var tipe = require('./tipe')
var sample = require('./testdata')
var assert = require('assert')
var undef
var log = console.log

log('Sample tipes:')
log(sample)

// Basic use of string tipes
for (var t in sample) {
  assert(t === tipe(sample[t]),
      'Error: ' + t + ': ' + tipe(sample[t]))
}

// Extra cases
assert('boolean' === tipe(false))
assert('number' === tipe(0))
assert('number' === tipe(-1))
assert('number' === tipe(1))
assert('number' === tipe(new Number(1)))
assert('number' === tipe(NaN))
assert('function' === tipe(Error))
assert('error' === tipe(new SyntaxError()))

// Boolean methods:
for (var t in sample) {
  for (var v in sample) {
    if (v === t) {
      assert(tipe[t](sample[v]), 'tipe: ' + t + ' value: ' + v)
    }
    else {
      assert(!tipe[t](sample[v]), 'tipe: ' + t + ' value: ' + v)
    }
  }
}

// Truthy
assert(tipe.truthy(1))
assert(tipe.truthy(45.6))
assert(tipe.truthy('1'))
assert(tipe.truthy('yes'))
assert(tipe.truthy('true'))
assert(tipe.truthy('TrUe'))
assert(!tipe.truthy())
assert(!tipe.truthy(null))
assert(!tipe.truthy(0))
assert(!tipe.truthy(-1))  // not like javascript
assert(!tipe.truthy('0'))
assert(!tipe.truthy('-1'))
assert(!tipe.truthy('foo')) // not like javascript

// Tipe methods
assert(tipe.undefined())
assert(tipe.undefined(undef))
assert(tipe.defined(1))
assert(tipe.defined(null))
assert(!tipe.defined())
assert(!tipe.defined({}.foo))
assert(tipe.null(null))
assert(!tipe.null(undef))
assert(tipe.boolean(true))
assert(tipe.boolean(false))
assert(!tipe.boolean(0))
assert(!tipe.boolean(1))
assert(tipe.regexp(/./))
assert(tipe.error(new Error()))
assert(tipe.array([]))
assert(tipe.object({}))
assert(tipe.isArguments((function() {return arguments})()))
assert.throws(function() {tipe.bogusMethod()})

// Scalar
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

// User-defined tipes
function Dog() {}
var rover = new Dog()
assert(tipe.object(rover))
tipe.add('Dog', 'dog')
assert(tipe.dog(rover))
assert('dog' === tipe(rover))
assert(!tipe.object(rover))
assert(!tipe.dog({}))

// Is-methods
assert(tipe.isNumber(1))
assert(tipe.isTruthy(1))
assert(tipe.isScalar(1))
assert(tipe.isDefined(1))
assert(tipe.isObject({}))
assert(tipe.isDog(rover))

console.log('tipe tests pass')
