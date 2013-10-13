#tipe

The world's only javascript type checker
    
## Why tipe?

Most folks use the is library to check types: https://github.com/enricomarino/is.

Not content with is?  You should probably write your own type checker.

Still not content?  Read on...

## Tipe features

tipe is a drop-in replacement for javascript's native typeof, returning a string for all passed-in values, with three impotant differences:  First: tipe is right when typeof is wrong, second: you can extend tipe to describe any type you care about, third: tipe is extremely fast, more than twice as fast as is.

As cheese, tipe includes .\<type\> and .\<isType\> boolean test methods for all types, including custom types that you define. 

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
Tipe aims to be as fast as any pure javascript type checker can be.  For each internal type check, tipe chooses the fastest availble V8 expression to determine the result.  To see for yourself run "node bench" to measure tipe performance vs is.

## Dogfood
3meters relies on the public tipe module for our aircandi web service.

## Contributing
We welcome any improvements via email, issues, or PRs.

## Copyright
Copyright (c) 2013 3meters.  All rights reserverd.

## License
MIT
