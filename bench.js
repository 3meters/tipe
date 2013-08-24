/**
 * benchmark tipe vs is
 *
 * To run:  node bench
 *
 *   This is very basic, and no attempt is made to simulate
 *   a real-world distribution of typical use.  It weighs the
 *   most common methods and value types equally, which surely
 *   is not ideal, and may scew the results.
 */

var bench = require('bench')    // https://github.com/isaacs/node-bench
var is = require('is')          // https://github.com/enricomarino/is
var tipe = require('./tipe')

// Map of boolean methods to test
var methods = {
  a: 'undefined',
  b: 'null',
  c: 'boolean',
  d: 'number',
  e: 'string',
  f: 'object',
  g: 'date',
  h: 'array',
  i: 'regexp',
  j: 'function',
  k: 'error',
}

// Set up some dummy values of various types
var undef = undefined
var now = Date.now()
var args = undefined
var fn = function() {args = arguments}
var err = new Error()

var values = [
  undef,
  null,
  true,
  1,
  'foo',
  {},
  now,
  [],
  /^a/,
  fn,
  err,
  args,
]

var cValues = values.length


/*
 * Lib is the library to test.  Pass in a optional method
 * key, 'a' for undefined, 'b' for null, etc., in the compare
 * function below to test a particular method. If none is
 * provided all methods in the methods map will be evaluated
 * equally.
 */
function test(lib, method) {
  var result, value, i

  if (method) {
    i = Math.floor(Math.random() * cValues)
    value = values[Math.floor(Math.random() * cValues)]
    result = lib[methods[method]](value)
  }
  else {
    for (method in methods) {
      i = Math.floor(Math.random() * cValues)
      value = values[i]
      result = lib[methods[method]](value)
    }
  }
  return result  // to make it harder for v8 to optimize away
}

exports.compare = {
  'is':   function() { test(is) },
  'tipe': function() { test(tipe) },
}

// Bigger numbers make for slower, more accurate tests
exports.time = 1000       // default 1000
exports.compareCount = 8  // default 8

bench.runMain()