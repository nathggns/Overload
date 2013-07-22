# Overload

Allow overloading of methods using arbitrary conditions, including shorcuts for artity.

## Notes

 - Methods are overloaded in a first-in-last-called manner. Newer functions take priority. 
 - Only one function will ever be called per manner. Returning `true` from a condition stops the chain.
 - Much of the functionality you see here was implemented using Overload. Use it on itself! 

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