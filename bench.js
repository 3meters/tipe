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

/* jshint asi: true */  // disable jshint warning about semicolons


var bench = require('bench')    // https://github.com/isaacs/node-bench
var is = require('is')          // https://github.com/enricomarino/is
var tipe = require('./tipe')
var sample = require('./test').sample
var methods = Object.keys(sample)
var testMethod = null           // default null, set to methodName to benchmark a single method
var details = true              // default true, set to false to benchmark only a summary


// Set higher for slower, more accurate tests
exports.time = 1000       // default 1000
exports.compareCount = 8  // defalut 8


/*
 * Test is the function that bench measures.  Lib is the
 * library to test. The optional method parameter tests a
 * particular method. If no method is provided all methods
 * are evaluated proportunally.
 */
function test(lib, method) {
  var result, valType

  if (method) {
    if ('arguments' === method && tipe === lib) method = 'args'
    for (valType in sample) {
      result = lib[method](sample[valType])
    }
  }
  else {
    for (method in sample) {
      if ('arguments' === method && tipe === lib) method = 'args'
      for (valType in sample) {
        result = lib[method](sample[valType])
      }
    }
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
function compareMethods(i) {

  if (!(i--)) return compareSummary()  // done, break recursion

  var method = methods[i]
  exports.compare = {}
  exports.compare['is.' + method] = function() { test(is, method)}
  exports.compare['tipe.' + method] = function() { test(tipe, method)}

  exports.done = function(rawResults) {
    console.log(rawResults)
    compareMethods(i) // recurse
  }

  bench.runMain() // calls exports.done when finished
}


// Compare a single method
function compareMethod(method) {
  console.log('\n\nMethod: ' + method + '\n==========\n')
  exports.done = undefined
  exports.compare['is.' + method] = function() { test(is, method)}
  exports.compare['tipe.' + method] = function() { test(tipe, method)}
  bench.runMain()
}


// Compare all methods
function compareSummary() {
  console.log('\n\nSummary\n==========\n')
  exports.done = undefined  // use default bench output
  exports.compare.is   = function() { test(is)   }
  exports.compare.tipe = function() { test(tipe) }
  bench.runMain()
}


// Run
exports.compare = {}
if (details) compareMethods(methods.length)
else if (testMethod) compareMethod(testMethod)
else compareSummary()
