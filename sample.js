/**
 * Sample object for tipe functional tests and benchmarks.
 *   Each key is a named type.  Each key's value is a
 *   value of that type.
 */


// Dummy values of various types
var d = new Date()
var err = new Error()
var ar = undefined
var fn = function() {ar = arguments}
fn() // sets ar


// Each named type mapped to a value of that type
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
//  'arguments': ar,
  'object': {}
}
