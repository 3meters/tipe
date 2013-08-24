#tipe

  Simple, fast, extensible javascript type checker.

  If you want a popular, hardended type-checker you should probably look at is:  https://github.com/enricomarino/is

  Tipe provides two features missing from is.  First, the base method tipe(foo) always returns a string for any valid identifier, just like typeof, making it easy to use in switch statements.  Second, you can add your own custom tipes for any constructor. However, tipe lacks many features that is provides, including equality tests and mathematical comparitors.

  In some use cases tipe may be faster than is.  Run node bench for a simple test.  This is experimental and may be full of holes.  Feel free to add more or better tests and or benchmarks.

  Enjoy!

## Install with nodejs

    npm install tipe

## Basic use

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
...
```

## Methods
Each type has two boolean tests methods, the type name it self, and is<Typename> for purists who object to method names that are also reserved words

```js
tipe.boolean(false)       // true
tipe.isBoolean(false)     // true
tipe.error(new Error())   // true
tipe.isError(new Error()) // true
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
tipe.isDog(fido)        // true
```


## Copyright
  Copyright (c) 2013 3meters.  All rights reserverd.

## License
  MIT
