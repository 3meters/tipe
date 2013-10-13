#tipe [![NPM version](https://badge.fury.io/js/tipe.png)](http://badge.fury.io/js/tipe)

The world's only javascript type checker
    
## Why tipe?

Javasript's native typeof is famously broken.  Many folks turn to the excellent is library for help: https://github.com/enricomarino/is.  

Not content with is?  You should probably write your own type checker.

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
Tipe aims to be as fast as any pure javascript type checker can be.  For each internal type check, tipe chooses the fastest availble V8 expression to determine the result.  Here is the bench summary output for tipe@0.1.9 vs is@0.2.6, weighing shared methods equally:  

Bench Summary:
```
benchmarking ... /tipe/bench.js
Please be patient.
{ http_parser: '1.0',
  node: '0.10.16',
  v8: '3.14.5.9',
  ares: '1.9.0-DEV',
  uv: '0.10.13',
  zlib: '1.2.3',
  modules: '11',
  openssl: '1.0.1e' }
Scores: (bigger is better)

tipe
Raw:
 > 102.7944111776447
 > 103.58565737051792
 > 104.06342913776015
 > 103.27706057596822
 > 103.58565737051792
 > 103.68893320039881
 > 103.17460317460318
 > 101.69491525423729
Average (mean) 103.233083407706

is
Raw:
 > 46.396841066140176
 > 46.48862512363996
 > 46.53465346534654
 > 45.54455445544554
 > 46.48862512363996
 > 46.53465346534654
 > 46.44268774703557
 > 46.16895874263261
Average (mean) 46.32494989865336

Winner: tipe
Compared with next highest (is), it's:
55.13% faster
2.23 times as fast
0.35 order(s) of magnitude faster
``` 

To see method-by-method comparisons for yourself, run
```
node bench
```

## Dogfood
3meters relies on the public tipe module for our aircandi web service.

## Contributing
We welcome any improvements via email, issues, or PRs.

## Copyright
Copyright (c) 2013 3meters.  All rights reserverd.

## License
MIT
