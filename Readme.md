#tipe

  Simple, fast, extensible javascript type checker.

  See "is" for a popular, reliable, battle-tested type-checker:  https://github.com/enricomarino/is

  Still reading?  Why use tipe? Short answer, you probably shouldn't; you should write you own.  A type checker is not worth a module dependency.  Feel free to copy any code or ideas you find usefull. We certainly did.  
  
  Still reading?  Tipe provides a base method, tipe(identifier) that returns a string for all valid identifiers, making it a valid replacement for the javascripts native typeof.  It fixes all the obvious bugs in typeof.  This is useful if you want to write switch statements based on the type of identifiers.
  
  Tipe adds one feature we find useful: you can add your own custom tipes for any constructor.
  
  Tipe may be faster than is, although Here are 
  
  
  
  
  We rely on tipe for a closed-source public web service backing a mobile application.  

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
