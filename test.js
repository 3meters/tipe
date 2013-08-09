/**
 * tipe tests
 */

var tipe = require('./tipe.js')
var assert = require('assert')
var undef

// Basic use
assert('undefined' === tipe())
assert('undefined' === tipe(undef))
assert('null' === tipe(null))
assert('boolean' === tipe(true))
assert('boolean' === tipe(false))
assert('number' === tipe(0))
assert('number' === tipe(-1))
assert('number' === tipe(1))
assert('number' === tipe(new Number(1)))
assert('number' === tipe(NaN))
assert('string' === tipe('s'))
assert('object' === tipe({}))
assert('date' === tipe(new Date()))
assert('array' === tipe([]))
assert('regexp' === tipe(/./))
assert('function' === tipe(function foo(){}))
assert('function' === tipe(Error))
assert('error' === tipe(new Error()))
assert('error' === tipe(new SyntaxError()))

// Truthy
assert(tipe.isTruthy(1))
assert(tipe.isTruthy(45.6))
assert(tipe.isTruthy('1'))
assert(tipe.isTruthy('yes'))
assert(tipe.isTruthy('true'))
assert(tipe.isTruthy('TrUe'))
assert(!tipe.isTruthy())
assert(!tipe.isTruthy(null))
assert(!tipe.isTruthy(0))
assert(!tipe.isTruthy(-1))  // not like javascript
assert(!tipe.isTruthy('0'))
assert(!tipe.isTruthy('-1'))
assert(!tipe.isTruthy('foo')) // not like javascript

// Sugar
assert(tipe.isUndefined())
assert(tipe.isUndefined(undef))
assert(tipe.isDefined(1))
assert(tipe.isDefined(null))
assert(!tipe.isDefined())
assert(!tipe.isDefined({}.foo))
assert(tipe.isNull(null))
assert(!tipe.isNull(undef))
assert(tipe.isBoolean(true))
assert(tipe.isBoolean(false))
assert(!tipe.isBoolean(0))
assert(!tipe.isBoolean(1))
assert(tipe.isRegexp(/./))
assert(tipe.isError(new Error()))
assert(tipe.isArray([]))
assert(tipe.isObject({}))
assert.throws(function() {tipe.bogusMethod()})

// Scalar
assert(tipe.isScalar(1))
assert(tipe.isScalar('hi'))
assert(tipe.isScalar(true))
assert(tipe.isScalar(false))
assert(tipe.isScalar(null))
assert(tipe.isScalar())
assert(!tipe.isScalar({}))
assert(!tipe.isScalar([]))
assert(!tipe.isScalar(function(){}))


// User-defined tipes
function Dog() {}
var rover = new Dog()
assert(tipe.isObject(rover))
tipe.add('Dog', 'dog')
assert('dog' === tipe(rover))
assert(!tipe.isObject(rover))
assert(!tipe.isDog({}))
assert(tipe.isDog(rover))

console.log('tests pass')
