/**
 * tipe tests
 * *
 * To run:  node test
 */

var tipe = require('./tipe')
var sample = require('./sample')
var assert = require('assert')
var log = console.log

log('Sample tipes:')
log(sample)

// Test basic use:  tipe(null) === 'null', etc...
for (var t in sample) {
  assert(t === tipe(sample[t]),
      'Error: ' + t + ': ' + tipe(sample[t]))
}

// Extra cases just to be sure
assert('boolean' === tipe(false))
assert('number' === tipe(0))
assert('number' === tipe(-1))
assert('number' === tipe(1))
assert('number' === tipe(new Number(1)))
assert('number' === tipe(NaN))
assert('function' === tipe(Error))
assert('error' === tipe(new SyntaxError()))

// Test boolean methods of all sample types aginst all sample values
for (var t in sample) {
  for (var v in sample) {
    var corpse = 'type: ' + t + ' value: ' + v
    if (t === v) {
      assert(tipe[t](sample[v]), corpse)
    }
    else {
      assert(!tipe[t](sample[v]), corpse)
    }
  }
}

// Test truthy
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
tipe.add('Dog', 'dog')
assert(tipe.dog(rover))
assert('dog' === tipe(rover))
assert(!tipe.object(rover))
assert(!tipe.dog({}))

console.log('tipe tests pass')
