#tipe

  Simple, fast, extensible javascript type checker.

  If you want a popular, hardended type-checker you should probably look at is:  https://github.com/enricomarino/is

  You probably should not use this module.  It is not worth the weight of a dependency.  You should write your own.  Feel free to copy-paste any source find useful.

  Tipe provides two tiny features that is does not: you can add custom types for any constructor, and the base method, tipe(foo) always returns an accurate string for the type of foo, even if foo is of type "poodle".  It lacks many features that is provides, including equality tests and mathematical comparitors.

  If for some reason you like tipe and want to accept the dependency, be assured that we dogfood the master branch in production and endevor to respond to all problems quickly.

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


## Copyright
  Copyright (c) 2013 3meters.  All rights reserverd.

## License
  MIT
