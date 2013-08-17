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
