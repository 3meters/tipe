#tipe

  Simple, fast, extensible javascript type checker.

  If you want a popular, hardended type-checker you should probably look at is:  https://github.com/enricomarino/is

  You should not install this module.  It is not worth the weight of a dependency.  You should write your own.  Feel free to copy-paste any source find useful.

  If for some reason you want a type-checking module, and you don't like is, be assured that we dogfood the master branch in production.

  Tipe provides two tiny features that is does not: you can add custom types for any constructor, and the base method, tipe(foo) always returns an accurate string for the type of foo, even if foo is of type "poodle".  It lacks many features that is provides, including equality tests and mathematical comparitors.

## Install with nodejs

    npm install tipe

## Basic use

```js
var tipe = require('tipe')
tipe()              // 'undefined'
tipe(null)          // 'null'
tipe(false)         // 'boolean'
tipe(1)             // 'number'
tipe({})            // 'object'
tipe([])            // 'array'
tipe(new Error())   // 'error'
...
```

## Methods
Each type has a base method that returns a boolean
```js
tipe.boolean(false)      // true
tipe.error(new Error())  // true
```
etc...


## Extensible Types
Add your own custom tipes for constructors:

```js
function Dog(){}
var fido = new Dog()
tipe(fido)              // 'object'
tipe.add('Dog', 'dog')
tipe(fido)              // 'dog'
tipe.dog(fido)          // true
```

## Truthy
Truthy aims to descern truth from messy query strings

```js
tipe.truthy(1)        // true
tipe.truthy(-1)       // false  (true in javascript)
tipe.truthy('1')      // true
tipe.truthy('0')      // false (true in javascript)
tipe.truthy('-5')     // false (true in javascript)
tipe.truthy('yes')    // true
tipe.truthy('true')   // true
tipe.truthy('foo')    // false (true in javascript)
```

## Scalar
Scalar distinguishes between values that will be passed-by-value from those that will be passed-by-reference
```js
tipe.scalar(1)        // true
tipe.scalar({})       // false
tipe.scalar([])       // false


## Copyright
  Copyright (c) 2013 3meters.  All rights reserverd.

## License
  MIT
