/**
 * benchmark tipe vs is
 *
 * To run:  node bench
 *
 *   This is a very crude benchmark. No attempt is made to simulate
 *   a real-world distribution of typical use.  It weighs the
 *   most common methods and value types equally, which surely
 *   is wrong and scews the results, possibly significantly.
 *
 *   Improvements welcome.
 */


var bench = require('bench')    // https://github.com/isaacs/node-bench
var is = require('is')          // https://github.com/enricomarino/is
var tipe = require('./tipe')
var sample = require('./test').sample
var details = false              // benchmark each method separately


// Set higher for slower, more accurate tests
exports.time = 1000       // default 1000
exports.compareCount = 8  // defalut 8


// Methods to test
var methods = [
  'undefined',
  'null',
  'boolean',
  'number',
  'string',
  'object',
  'date',
  'array',
  'regexp',
  'function',
  'error',
]


// Dummy values of various types
var undef = undefined
var date = new Date()
var args = undefined
var fn = function() {args = arguments}
var err = new Error()


// Values is a array of values that will be randomly fired at the
// benchmarked libraies. It should be the result of an application-
// specific function.
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


/*
 * Test is the function that bench measures.  Lib is the
 * library to test. The optional index parameter tests a
 * particular method. If no index is provided all methods
 * are evaluated proportunally.
 */
function test(lib, index) {
  var result

  function randValue() {
    return values[Math.floor(Math.random() * values.length)]
  }

  if (index) {
    result = lib[methods[index]](randValue())
  }
  else {
    methods.forEach(function(method) {
      result = lib[method](randValue())
    })
  }

  return result  // make it harder for v8 to optimize away
}


/*
 * Async serial compare of each method, counting down. Normally
 * the function signiture would be (err, i), but Isaacs has broken
 * his own cardinal rule, and made bench swallow errors here:
 * (https://github.com/isaacs/node-bench/blob/master/lib/bench.js#L35)
 * perhaps to minimize benchmark moving parts.
 */
function compareMethod(i) {

  if (!(i--)) return compareSummary()  // done, break recursion

  exports.compare = {}
  exports.compare['is.' + methods[i]] = function() { test(is, i)}
  exports.compare['tipe.' + methods[i]] = function() { test(tipe, i)}

  exports.done = function(results) {
    console.log(results)
    compareMethod(i) // recurse
  }

  bench.runMain() // calls exports.done when finished
}


// Compare all methods
function compareSummary() {
  console.log('\n\nSummary\n==========\n')
  exports.done = undefined  // use default bench output
  exports.compare = {}
  exports.compare.is   = function() { test(is, 6)   }
  exports.compare.tipe = function() { test(tipe, 6) }
  bench.runMain()
}


// Run
if (details) compareMethod(methods.length)
else compareSummary()
