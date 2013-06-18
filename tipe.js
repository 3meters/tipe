/**
 *  tipe.js
 *
 *  Simple javascript typeof replacement with sane handling
 *  of semi-primitives with easily configurable list of known
 *  classes. Provides isString(v), isNumber(v), for all tipes
 *  as convenience methods.
 */


// Main
function tipe(v) {
  var typeofSane, className

  // Give typeof first crack
  typeofSane = tipeMap[typeof v]
  if (typeofSane) return typeofSane

  // See what Object.toString thinks: it returns '[object Constructor]'
  className = Object.prototype.toString.call(v)
  className = className.slice(0, className.length - 1).slice(8)

  return tipeMap[className]
    || (v ? 'object' : 'null')
}


// Map of value types to their tipes
var tipeMap = {
  'undefined': 'undefined',
  'number': 'number',
  'boolean': 'boolean',
  'string': 'string',
  'function': 'function',
  'RegExp': 'regexp',
  'Array': 'array',
  'Date': 'date',
  'Error': 'error',
}


// Add a user-specfied class to the tipeMap.
// Class constructor must implement toString()
tipe.add = function(className, tipeName) {
  if ('Object' === className || tipeMap[className]) return // ddt
  tipeMap[className] = tipeName
  addIsMethod(tipeName)
}


// Sweeten with tipe.isString(v), tipe.isPoodle(v), etc.
function addIsMethod(tipeName) {
  var properCaseTipeName = tipeName.charAt(0).toUpperCase() + tipeName.slice(1)
  tipe['is' + properCaseTipeName] = function(v) {
    return tipe(v) === tipeName
  }
}


// Add sugar
for (var key in tipeMap) {
  addIsMethod(tipeMap[key])
}


module.exports = tipe
