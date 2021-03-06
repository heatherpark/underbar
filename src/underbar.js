(function() {
  'use strict';

  window._ = {};

  // Returns whatever value is passed as the argument. This function doesn't
  // seem very useful, but remember it--if a function needs to provide an
  // iterator when the user does not pass one in, this will be handy.
  _.identity = function(val) {
    return val;
  };

  /**
   * COLLECTIONS
   * ===========
   *
   * In this section, we'll have a look at functions that operate on collections
   * of values; in JavaScript, a 'collection' is something that can contain a
   * number of values--either an array or an object.
   *
   *
   * IMPORTANT NOTE!
   * ===========
   *
   * The .first function is implemented for you, to help guide you toward success
   * in your work on the following functions. Whenever you see a portion of the
   * assignment pre-completed, be sure to read and understand it fully before
   * you proceed. Skipping this step will lead to considerably more difficulty
   * implementing the sections you are responsible for.
   */

  // Return an array of the first n elements of an array. If n is undefined,
  // return just the first element.
  _.first = function(array, n) {
    return n === undefined ? array[0] : array.slice(0, n);
  };

  // Like first, but for the last elements. If n is undefined, return just the
  // last element.
  _.last = function(array, n) {
    if (n === undefined) {
      return array[array.length - 1];
    } else if (n === 0) {
      return [];
    } else {
      return array.slice(-n);
    }
  };

  // Call iterator(value, key, collection) for each element of collection.
  // Accepts both arrays and objects.
  //
  // Note: _.each does not have a return value, but rather simply runs the
  // iterator function over each item in the input collection.
  _.each = function(collection, iterator) {
    // check if "collection" is an array.
    if (Array.isArray(collection)) {
      // loop through each array item.
      for (var i = 0; i < collection.length; i++) {
        // invoke "iterator" on item, passing to it the appropriate arguments (value, key, collection).
        iterator(collection[i], i, collection);
      }
    // do same when "collection" is not an array, but an object.
    } else {
      for (var key in collection) {
        iterator(collection[key], key, collection);
      }
    }
  };

  // Returns the index at which value can be found in the array, or -1 if value
  // is not present in the array.
  _.indexOf = function(array, target){
    // TIP: Here's an example of a function that needs to iterate, which we've
    // implemented for you. Instead of using a standard `for` loop, though,
    // it uses the iteration helper `each`, which you will need to write.
    var result = -1;

    _.each(array, function(item, index) {
      if (item === target && result === -1) {
        result = index;
      }
    });

    return result;
  };

  // Return all elements of an array that pass a truth test.
  _.filter = function(collection, test) {
    // array to be populated with items that pass truth test.
    var filtered = [];

    // loop over each item and invoke "test" function.
    _.each(collection, function(item, index, collection) {
      // if "test" function returns true, push item to "filtered" array.
      if (test(item)) {
        filtered.push(item);
      }
    });

    return filtered;
  };

  // Return all elements of an array that don't pass a truth test.
  _.reject = function(collection, test) {

    // run filter() over collection
    return _.filter(collection, function(item) {
      // create an array of items that don't pass the truth test.
      return !test(item);
    });

  };

  // Produce a duplicate-free version of the array.
  _.uniq = function(array) {
    // create empty array that will later hold an array of unique items
    var uniqueArr = [];

    // iterate over each item in array
    _.each(array, function(item, index) {
      // indexOf only returns the index of the first instance of an item in an array.
      // thus, the current item's index can be compared to its indexOf result.
      // if they match, that item can be pushed to uniqueArr
      // any subsequent instances' indices won't be equal to indexOf and will not be pushed to uniqueArr.
      if (_.indexOf(array, item) === index) {
        uniqueArr.push(item);
      }
    });

    return uniqueArr;
  };


  // Return the results of applying an iterator to each element.
  _.map = function(collection, iterator) {
    var mapped = [];

    _.each(collection, function(item) {
      mapped.push(iterator(item));
    });

    return mapped;
  };

  /*
   * TIP: map is really handy when you want to transform an array of
   * values into a new array of values. _.pluck() is solved for you
   * as an example of this.
   */

  // Takes an array of objects and returns and array of the values of
  // a certain property in it. E.g. take an array of people and return
  // an array of just their ages
  _.pluck = function(collection, key) {
    // TIP: map is really handy when you want to transform an array of
    // values into a new array of values. _.pluck() is solved for you
    // as an example of this.
    return _.map(collection, function(item){
      return item[key];
    });
  };

  // Reduces an array or object to a single value by repetitively calling
  // iterator(accumulator, item) for each item. accumulator should be
  // the return value of the previous iterator call.
  //
  // You can pass in a starting value for the accumulator as the third argument
  // to reduce. If no starting value is passed, the first element is used as
  // the accumulator, and is never passed to the iterator. In other words, in
  // the case where a starting value is not passed, the iterator is not invoked
  // until the second element, with the first element as its second argument.
  //
  // Example:
  //   var numbers = [1,2,3];
  //   var sum = _.reduce(numbers, function(total, number){
  //     return total + number;
  //   }, 0); // should be 6
  //
  //   var identity = _.reduce([5], function(total, number){
  //     return total + number * number;
  //   }); // should be 5, regardless of the iterator function passed in
  //          No accumulator is given so the first element is used.
  _.reduce = function(collection, iterator, accumulator) {
    // if no argument is passed to "accumulator" parameter,
    // "accumulatorUndefined" will evaluate to true.
    var accumulatorUndefined = accumulator === undefined;

    // loop through each item in "collection".
    _.each(collection, function(item) {
      // if "accumulator" is undefined,
      // or "accumulatorUndefined" evaluates to true...
      if (accumulatorUndefined) {
        // set the value of "accumulator" to the first item in "collection".
        accumulator = _.first(collection);
        // set "accumulatorUndefined" to false.
        // this will allow the loop to continue through all items.
        accumulatorUndefined = false;
      } else {
        // pass the current "accumulator" value and current item in loop as arguments to iterator().
        // run iterator() on each item and set its returned value as the new value of "accumulator".
        accumulator = iterator(accumulator, item);
      }
    });

    return accumulator;
  };

  // Determine if the array or object contains a given value (using `===`).
  _.contains = function(collection, target) {
    // TIP: Many iteration problems can be most easily expressed in
    // terms of reduce(). Here's a freebie to demonstrate!
    return _.reduce(collection, function(wasFound, item) {
      if (wasFound) {
        return true;
      }
      return item === target;
    }, false);
  };


  // Determine whether all of the elements match a truth test.
  _.every = function(collection, iterator) {
    iterator = iterator || _.identity;

    // every() will return the returned value of reduce().
    // the default "accumulator" value will be set to true.
    // for every item in "collection", return the Boolean value of invoking the iterator on the item and
    // have that be the new value for "accumulator".
    // that value will then be passed to "doesMatch".
    // in the event that a value of false is passed to "doesMatch", reduce() immediately returns false.
    // otherwise, it will loop all the way through "collection" and ultimately return true.
    return _.reduce(collection, function(doesMatch, item) {
      if (!doesMatch) {
        return false;
      }

      return !!iterator(item);
    }, true);
  };

  // Determine whether any of the elements pass a truth test. If no iterator is
  // provided, provide a default one
  _.some = function(collection, iterator) {
    iterator = iterator || _.identity;

    // some() will return true when the first item that passes the truth test is found.

    // every() will test for the inverse of what "iterator" is testing.
    // thus, when every() lands on an item that does, in fact, pass "iterator"'s truth test,
    // every() will return false.
    // however, some() will return the inverse of every()'s returned value.
    return !(_.every(collection, function(item) {
      return !iterator(item);
    }));
  };


  /**
   * OBJECTS
   * =======
   *
   * In this section, we'll look at a couple of helpers for merging objects.
   */

  // Extend a given object with all the properties of the passed in
  // object(s).
  //
  // Example:
  //   var obj1 = {key1: "something"};
  //   _.extend(obj1, {
  //     key2: "something new",
  //     key3: "something else new"
  //   }, {
  //     bla: "even more stuff"
  //   }); // obj1 now contains key1, key2, key3 and bla
  _.extend = function(obj) {
    // use slice() method on array prototype to slice arguments from second item onward.
    var objects = Array.prototype.slice.call(arguments, 1);

    // loop through "objects".
    _.each(objects, function(object) {
      // within each object in "objects", loop through all properties.
      _.each(object, function(value, key) {
        // add property and value to "obj".
        obj[key] = value;
      });
    });

    return obj;
  };

  // Like extend, but doesn't ever overwrite a key that already
  // exists in obj
  _.defaults = function(obj) {
    var objects = Array.prototype.slice.call(arguments, 1);

    _.each(objects, function(object) {
      _.each(object, function(value, key) {
        if (!obj.hasOwnProperty(key)) {
          obj[key] = value;
        }
      });
    });

    return obj;
  };


  /**
   * FUNCTIONS
   * =========
   *
   * Now we're getting into function decorators, which take in any function
   * and return out a new version of the function that works somewhat differently
   */

  // Return a function that can be called at most one time. Subsequent calls
  // should return the previously returned value.
  _.once = function(func) {
    // TIP: These variables are stored in a "closure scope" (worth researching),
    // so that they'll remain available to the newly-generated function every
    // time it's called.
    var alreadyCalled = false;
    var result;

    // TIP: We'll return a new function that delegates to the old one, but only
    // if it hasn't been called before.
    return function() {
      if (!alreadyCalled) {
        // TIP: .apply(this, arguments) is the standard way to pass on all of the
        // infromation from one function call to another.
        result = func.apply(this, arguments);
        alreadyCalled = true;
      }
      // The new function always returns the originally computed result.
      return result;
    };
  };

  // Memorize an expensive function's results by storing them. You may assume
  // that the function only takes primitives as arguments.
  // memoize could be renamed to oncePerUniqueArgumentList; memoize does the
  // same thing as once, but based on many sets of unique arguments.
  //
  // _.memoize should return a function that, when called, will check if it has
  // already computed the result for the given argument and return that value
  // instead if possible.
  _.memoize = function(func) {

    var cache = {},
        argSlice = Array.prototype.slice,
        args;

    return function() {

      Array.isArray(arguments[0]) ? args = "[" + argSlice.call(arguments) + "]" : args = argSlice.call(arguments);
      cache[args] = cache[args] || func.apply(this, arguments);
      return cache[args];

    };

  };

  // Delays a function for the given number of milliseconds, and then calls
  // it with the arguments supplied.
  //
  // The arguments for the original function are passed after the wait
  // parameter. For example _.delay(someFunction, 500, 'a', 'b') will
  // call someFunction('a', 'b') after 500ms
  _.delay = function(func, wait) {
    var args = Array.prototype.slice.call(arguments, 2);

    setTimeout(function() {
      // because args needs to be passed to func and is in array format,
      // we want to use the "apply" method.
      // however, "apply" immediately invokes the function, which isn't
      // favorable in setTimeout, so we want to pass setTimeout a function
      // that returns the func function with the appropriate arguments applied.
      return func.apply(this, args);
    }, wait);
  };


  /**
   * ADVANCED COLLECTION OPERATIONS
   * ==============================
   */

  // Randomizes the order of an array's contents.
  //
  // TIP: This function's test suite will ask that you not modify the original
  // input array. For a tip on how to make a copy of an array, see:
  // http://mdn.io/Array.prototype.slice

  // the shuffle method will use the Fisher-Yates algorithm for an
  // unbiased, randomized shuffle of array contents
  _.shuffle = function(array) {
    // make copy of array using slice method
    var arrayCopy = array.slice();

    // loop over all items in arrayCopy, starting from last item.
    for (var i = arrayCopy.length - 1; i >= 0; i--) {
      // for each item, generate random number between 0 (inclusive) and the current loop's index (inclusive).
      var randomIndex = Math.floor(Math.random() * i);
      // this randomly selected number will be the new index of the current item.
      var randomIndexItem = arrayCopy[randomIndex];

      // essentially, we're swapping positions of the current
      // item and the item at the randomly selected position.
      arrayCopy[randomIndex] = arrayCopy[i];
      arrayCopy[i] = randomIndexItem;
    }

    return arrayCopy;
  };


  /**
   * ADVANCED
   * =================
   *
   * Note: This is the end of the pre-course curriculum. Feel free to continue,
   * but nothing beyond here is required.
   */

  // Calls the method named by functionOrKey on each value in the list.
  // Note: You will need to learn a bit about .apply to complete this.
  _.invoke = function(collection, functionOrKey, args) {
    // check if "functionOrKey" is function or method.
    // if a method is passed, its type will evaluate to a string.
    var isFunction = typeof(functionOrKey) === "function";

    // map will return a new array of transformed items.
    return _.map(collection, function(item) {
      // if "functionOrKey" is a function, it will be used as is.
      // if it is a method, it will be searched for on the item's prototype.
      var iterator = isFunction ? functionOrKey : item[functionOrKey];
      // use apply() on the iterator to set the 'this' value, which is each respective item.
      return iterator.apply(item, args);
    });
  };

  // Sort the object's values by a criterion produced by an iterator.
  // If iterator is a string, sort objects by that property with the name
  // of that string. For example, _.sortBy(people, 'name') should sort
  // an array of people by their name.
  _.sortBy = function(collection, iterator) {
    if (typeof(iterator) === "string") {
      return collection.sort(function(a, b) {
        return a[iterator] - b[iterator];
      });
    } else {
      return collection.sort(function(a, b) {
        return iterator(a) - iterator(b);
      });
    }
  };

  // Zip together two or more arrays with elements of the same index
  // going together.
  //
  // Example:
  // _.zip(['a','b','c','d'], [1,2,3]) returns [['a',1], ['b',2], ['c',3], ['d',undefined]]
  _.zip = function() {
    var arrays = Array.prototype.slice.call(arguments);

    arrays.sort(function(a, b) {
      return b.length - a.length;
    });

    var longestArray = _.first(arrays);
    var output = [];

    _.each(longestArray, function(item, outputIndex) {
      output.push([]);
      _.each(arrays, function(array, arrayIndex) {
        output[outputIndex].push(array[outputIndex]);
      });
    });

    return output;
  };

  // Takes a multidimensional array and converts it to a one-dimensional array.
  // The new array should contain all elements of the multidimensional array.
  //
  // Hint: Use Array.isArray to check if something is an array
  _.flatten = function(nestedArray, result) {
    result = result || [];

    _.each(nestedArray, function(item) {
      Array.isArray(item) ? _.flatten(item, result) : result.push(item);
    });

    return result;
  };

  // Takes an arbitrary number of arrays and produces an array that contains
  // every item shared between all the passed-in arrays.
  _.intersection = function() {
    var arrays = Array.prototype.slice.call(arguments).sort(function(a, b) { return b.length - a.length; });
    var longestArray = _.first(arrays);
    arrays = arrays.slice(1);
    var output = [];

    _.each(longestArray, function(target) {
      _.each(arrays, function(array) {
        if (_.indexOf(array, target) !== -1) {
          output.push(target);
        }
      });
    });

    return output;
  };

  // Take the difference between one array and a number of other arrays.
  // Only the elements present in just the first array will remain.
  _.difference = function(array) {
    var output = [];

    var overlaps = _.intersection.apply(this, arguments);

    _.each(array, function(item) {
      if (_.indexOf(overlaps, item) === -1) {
        output.push(item);
      }
    });

    return output;
  };

  // Returns a function, that, when invoked, will only be triggered at most once
  // during a given window of time.  See the Underbar readme for extra details
  // on this function.
  //
  // Note: This is difficult! It may take a while to implement.
  _.throttle = function(func, wait) {
  };
}());
