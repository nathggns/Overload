# Overload

Allow overloading of methods using arbitrary conditions, including shorcuts for artity.

## Notes

 - Methods are overloaded in a first-in-last-called manner. Newer functions take priority.
 - Only one function will ever be called per method. Returning `true` from a condition stops the chain.
 - Much of the functionality you see here was implemented using Overload. Use it on itself!
 - Overload will polyfill `Function.prototype.bind` (using `overload._bind`).

## Install

Overload uses a slightly custom version of the UMD pattern, and should work in almost any situation you put it in. It supports AMD (RequireJS, etc), CommonJS (Node) and browser globals.

To install it in the browser, copy one of the two files in the `dist` folder to your project, and simply include it on your page.

If you're using Node, you get to install overload using npm, which is as easy as pie!

```
npm install node-overload
```

You can also install overload using [bower](https://github.com/bower/bower).

```
bower install overload
```

## Usage

```js
// Define our object
var Person = function() {}

// Set the default method. You could also do this
// just by setting it manually.
overload.add(Person.prototype, 'speak', true, function() {
    console.log('Peasant! Learn to call me correctly!')
});

// If we've only been passed one argument, say it
// You can also do this by omitting the number. It'll
// then take the amount of arguments the function takes
// and use that number instead
overload.add(Person.prototype, 'speak', 1, function(speech) {
    console.log(speech);
});

// If we are passed an arguments saying "christmas", trigger
// an anti-fesive message
overload.add(Person.prototype, 'speak', function(method, args) {
    return Array.prototype.indexOf.call(args, 'christmas') !== -1;
}, function() {
    console.log('Bah, humbug!');
});


// If we've been passed too many arguments, complain
overload.add(Person.prototype, 'speak', function(method, args) {
    return args.length > 1;
}, function() {
    console.log('I\'m too busy for this!');
});

// We can also do type shortcuts
var Present = function() {};
var Coin = function() {};

overload.add(Person.prototype, 'speak', [Present], function() {
    console.log('Bah, humbug!'); 
});

overload.add(Person.prototype, 'speak', [Coin], function() {
    console.log('Ooh, money!');
});

var scrooge = new Person();

scrooge.speak();
// Peasant! Learn to call me correctly!

scrooge.speak('christmas');
// Bah, humbug!

scrooge.speak('Ooh, money');
// Ooh, money

scrooge.speak('money', 'fame');
// I'm too busy for this!

scrooge.speak(new Present());
// Bah, humbug

scrooge.speak(new Coin());
// Ooh, money!
```

### Arity

One of the best uses for this would be to use it to have different functions for different "artities". You can do this quite easily with overload.

```js
var Bike = function() {};

Bike.prototype.drive = function() {
    console.log('Wahoo!');
};

overload.add(Bike.prototype, 'drive', function(person1, person2) {
    console.log('Too many people!');
});

var bike = new Bike();

bike.drive();
// Wahoo!

bike.drive('one', 'two');
// Too many people!
```

You can also do ranges of arity, so you can say if the method is passed two or more arguments, call a certain version of the method. This is done via the `overload.arity` method.

The syntax is like so:

```js
var two_or_more = overload.arity(2);
var one_or_less = overload.arity(0, 1);

overload.add(obj, 'method', one_or_less, function() {
    // ...
});

overload.add(obj, 'method', two_or_more, function() {
    // ...
});
```

### Types

As well as a being able to pass an array of types instead of a condition function, as demonstrated in "Usage", you can also generate a condition function from a type-array, like so.

```js
var func = overload.types(['string']);

overload.add(obj, 'method', func, function(str) {
    // str is string
});
```

**Warning:** As JS has type-specific objects, you'll be able to look for them use the `String` constructor. However, using a `String` constructor in the type array will not accept a string created using the string literals, i.e `"string"`. 

### Getting a clean version of Overload

For whatever reason, you might want to extend your own shortcuts onto a clean version of Overload (the initial function before we overload it with shortcuts).

You can do this quite easily with the following.

```
var clean = overload.clean();
```