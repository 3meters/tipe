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
  return tipeMap[typeof v]
    || tipeMap[Object.prototype.toString.call(v)]
    || (v ? 'object' : 'null')
}


// Base map of values to their tipes
var tipeMap = {
  'undefined': 'undefined',
  'number': 'number',
  'boolean': 'boolean',
  'string': 'string',
  '[object Function]': 'function',
  '[object RegExp]': 'regexp',
  '[object Array]': 'array',
  '[object Date]': 'date',
  '[object Error]': 'error',
}


// Add a user-specfied class to the tipeMap
// Class constructor must implement toString()
tipe.add = function(className, tipeName) {
  tipeMap['[object ' + className + ']'] = tipeName
  addIsMethod(tipeName)
}


// Add tipe.isFoo() methods: tipe.isString(v), tipe.isPoodle(v)
function addIsMethod(tipeName) {
  var properCaseTipeName = tipeName.charAt(0).toUpperCase() + tipeName.slice(1)
  tipe['is' + properCaseTipeName] = function(v) {
    return tipe(v) === t  // wtf t?
  }
}


// Add the is methods
tipeMap.forEach(function(t) {
  addIsMethod(tipeMap[t])
})


module.exports = tipe
