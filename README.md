# Overload

Allow overloading of methods using arbitrary conditions, including shorcuts for artity.

## Notes

 - Methods are overloaded in a first-in-last-called manner. Newer functions take priority. 
 - Only one function will ever be called per manner. Returning `true` from a condition stops the chain.
 - Much of the functionality you see here was implemented using Overload. Use it on itself!

# Todo

 - Access a "clean" version of the overload function (as in, the function before we extend it)

## Install

Overload uses a slightly custom version of the UMD pattern, and should work in almost any situation you put it in. It supports AMD (RequireJS, etc), CommonJS (Node) and browser globals. 

To install it in the browser, copy one of the two files in the `dist` folder to your project, and simply include it on your page.

If you're using Node, you get to install overload using npm, which is as easy as pie!

```
npm install node-overload
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

var scrooge = new Person();

scrooge.speak();
// Peasant! Learn to call me correctly!

scrooge.speak('christmas');
// Bah, humbug!

scrooge.speak('money');
// money

scrooge.speak('money', 'fame');
// I'm too busy for this!
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