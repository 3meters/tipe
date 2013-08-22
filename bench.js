/**
 * tipe benchmarks vs is
 */

var tipe = require('./tipe')
var is = require('is')
var bench = require('bench')

function test(lib, method) {
  var type = lib
  var result
  var methods = {
    a: type.undefined(),
    b: type.null(null),
    c: type.boolean(true),
    d: type.boolean(false),
    e: type.number(0),
    f: type.number(-1),
    g: type.number(1),
    h: type.number(1.5),
    i: type.number(new Number(1)),
    j: type.number(NaN),
    k: type.string(''),
    l: type.string('s'),
    m: type.string('S'),
    n: type.object({}),
    o: type.date(new Date()),
    p: type.array([]),
    q: type.regexp(/./),
    r: type.function(function foo(){}),
    s: type.error(Error),
    t: type.error(new Error()),
    u: type.error(new SyntaxError()),
  }

  if (method) methods[method]
  else {
    for (method in methods) {
      methods[method]
    }
  }
}

exports.compare = {
  'tipe': function() { test(tipe) },
  'is':   function() { test(is) },
}

bench.runMain()
