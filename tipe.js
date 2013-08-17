/**
 *  tipe.js
 *
 *  Simple javascript typeof replacement with sane handling
 *  of semi-primitives and easily configurable list of known
 *  constructors. Provides .string(v), .number(v), etc. for
 *  all tipes as convenience methods.
 *
 *  Copyright (c) 2013 3meters
 *  MIT Licensed
 */


// Main
function tipe(v) {

  var result, className

  // Give typeof first crack
  result = tipeMap[typeof(v)]
  if (result) return result

  // Optimized checkers
  if (null === v) return 'null'
  if (Array.isArray(v)) return 'array'

  // Check for custom classes
  if (v.constructor) {
    result = tipeMap[v.constructor.name]
    if (result) return result
  }

  // We have some kind of object, but what kind?
  className = Object.prototype.toString.call(v).slice(8, -1)

  return tipeMap[className] || 'object'
}


// Map of value types to their tipes
var tipeMap = {
  'undefined': 'undefined',
  'boolean': 'boolean',
  'number': 'number',
  'string': 'string',
  'function': 'function',
  'Arguments': 'arguments',
  'Number': 'number',
  'String': 'string',
  'RegExp': 'regexp',
  'Array': 'array',
  'Date': 'date',
  'Error': 'error',
}


// Handy for determining pass-by-value versus pass-by-reference
tipe.scalar = tipe.isScalar = function(v) {
  return (
    tipe.string(v)
    || tipe.number(v)
    || tipe.boolean(v)
    || tipe.null(v)
    || tipe.undefined(v)
    || !(v instanceof Object)
  )
}


// True for positive numbers, strings castable to positive numbers,
// or the strings 'true' or 'yes'.  Handy for booleans set from
// query strings
tipe.truthy = tipe.isTruthy = function(v) {
  if ('number' === typeof(v)) return (v > 0)  // negative numbers are false
  if ('string' !== typeof(v)) return (v)      // fall back to javascript
  v = v.toLowerCase()
  if ('true' === v || 'yes' === v) return true
  if (parseInt(v) > 0) return true
  return false
}


// Pure sugar
tipe.defined = tipe.isDefined = function(v) {
  return (undefined !== v)
}


// Add a user-specfied tipe to the tipeMap
// The className must be the name of the constructor
tipe.add = function(className, tipeName) {
  if ('Object' === className || tipeMap[className]) return // ddt
  tipeMap[className] = tipeName
  addMethod(tipeName)
}


// Sweeten with tipe.string(v), tipe.isString(v), tipe.poodle(v), etc.
function addMethod(tipeName) {
  var upperCaseTipeName = tipeName.charAt(0).toUpperCase() + tipeName.slice(1)
  tipe['is' + upperCaseTipeName] = function(v) {
    return tipe(v) === tipeName
  }
  tipe[tipeName] = function(v) {
    return tipe(v) === tipeName
  }
}


// Add submethods on require
(function() {
  for (var key in tipeMap) {
    addMethod(tipeMap[key])
  }
  addMethod('null')
  addMethod('object')
})()


// Export
module.exports = tipe
