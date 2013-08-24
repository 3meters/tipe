/**
 * tipe benchmarks vs is
 */

var tipe = require('./tipe')
var is = require('is')

var r = tipe.null(null)
var r = tipe.undefined(null)
var r = is.null(null)
var r = is.undefined(null)
