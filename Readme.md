## Tipe

The world's fastest javascript type checker for V8

[![NPM version](https://badge.fury.io/js/tipe.png)](http://badge.fury.io/js/tipe)
[![Build Status](https://secure.travis-ci.org/3meters/tipe.png)](http://travis-ci.org/3meters/tipe)

## Why tipe?

Javasript's native typeof is famously broken. Many folks turn to the excellent is library for help: https://github.com/enricomarino/is.

Not content with is?  You should probably write your own type checker. Still not content?  Tipe has been hand-tuned to provide the fastest internal test possible for any type expression on the V8 Javascript engine.  This makes it particularly well suited for highly-scalable node.js applications.

## Install with nodejs
```js
    npm install tipe
```

## Basic use
Tipe includes a base method, tipe(value) which always returns a string, like typeof, for all valid identifiers, including custom tipes. This is useful in switch statements.  
```js
var tipe = require('tipe')
tipe()              // 'undefined'
tipe(null)          // 'null'
tipe('foo')         // 'string'
tipe(false)         // 'boolean'
tipe(1)             // 'number'
tipe({})            // 'object'
tipe([])            // 'array'
tipe(new Error())   // 'error'
var args, fn
fn = function(){args = arguments}
tipe(fn)            // 'function'
tipe(args)          // 'arguments'
```

## Boolean test methods for each type
For each tipe there are two boolean test methods: tipe.tipename(value), and tipe.isTipename(value).  Some prefer the shorter version, others perfer methods names that are not reserved words.  
```js
tipe.boolean(false)       // true
tipe.isBoolean(false)     // true
tipe.error(new Error())   // true
tipe.isError(new Error()) // true
```
etc...  These appear automatically for custom types as well.  

## Custom Types
Tipe lets you add your own custom types for any constructor. They work like any other type.  
```js
function Dog(){}
var fido = new Dog()
tipe(fido)              // 'object'
tipe.dog(fido)          // runtime exception: tipe has no method 'dog'
tipe.addTipe('Dog', 'dog')
tipe(fido)              // 'dog'
tipe.dog(fido)          // true
tipe.isDog(fido)        // true
```

## Performance
Tipe aims to be as fast as any pure javascript type checker can be.  For each internal type check, tipe chooses the fastest availble V8 expression to determine the result. To see method-by-method comparisons for yourself, run:
```
node bench
```
Here is the bench summary output for tipe@0.1.11 vs is@2.2.0, weighing shared methods equally:

benchmarking /Users/gs/tipe/bench.js
Please be patient.
{ http_parser: '1.0',
  node: '0.10.33',
  v8: '3.14.5.9',
  ares: '1.9.0-DEV',
  uv: '0.10.29',
  zlib: '1.2.3',
  modules: '11',
  openssl: '1.0.1j' }
Scores: (bigger is better)

tipe
Raw:
 > 118.17279046673286
 > 119.16583912611718
 > 119.04761904761905
 > 118.64406779661017
 > 118.64406779661017
 > 118.64406779661017
 > 119.16583912611718
 > 118.88111888111888
Average (mean) 118.79567625469195

is
Raw:
 > 56.60377358490566
 > 57.142857142857146
 > 56.82951146560319
 > 57.19921104536489
 > 56.71641791044776
 > 56.71641791044776
 > 56.54761904761905
 > 57.142857142857146
Average (mean) 56.86233315626283

Winner: tipe
Compared with next highest (is), it's:
52.13% faster
2.09 times as fast
0.32 order(s) of magnitude faster
QUITE A BIT FASTER


## Dogfood
3meters relies on the public tipe module for our aircandi web service.

## Contributing
We welcome any improvements via email, issues, or PRs.

## Copyright
Copyright (c) 2013 3meters.  All rights reserverd.

## License
MIT
