#tipe

  Simple, fast, extensible javascript type checker.

  See "is" for a popular, reliable, battle-tested type-checker:  https://github.com/enricomarino/is
  
  Tipe aims to be fast, and may be faster than is in some cases.  Run "node bench" to see.
  
  Tipe includes a base method, tipe(value) which returns a string, usefull for switch statements.  
  
  Tipe supports custom types for any constructor.
  
  We rely on this public module in a large-scale web service via ordinary npm.  We welcome any improvements.  
  
  -Enjoy
  
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
Each type has two boolean tests methods, the type name itself, and an is method: is<Typename> for those who prefer method names that don't conflict with reserved words.

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
tipe.addTipe('Dog', 'dog')
tipe(fido)              // 'dog'
tipe.dog(fido)          // true
tipe.isDog(fido)        // true
```


## Copyright
  Copyright (c) 2013 3meters.  All rights reserverd.

## License
  MIT
