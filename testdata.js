/**
 * tipe test data for functional tests and benchmark
 */


// Dummy values of various types
var d = new Date()
var err = new Error()
var ar = undefined
var fn = function() {ar = arguments}
fn() // sets ar


// Each tipe mapped to a sample value of that tipe
module.exports = {
  'undefined': undefined,
  'null': null,
  'boolean': false,
  'number': 1,
  'string': 'foo',
  'date': d,
  'array': [],
  'regexp': /^a/,
  'error': err,
  'function': fn,
  'arguments': ar,
  'object': {}
}
