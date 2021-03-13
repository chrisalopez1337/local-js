# local-js
Simple local storage tools.

# Installing
# `npm i local-js`

# Basic example
```javascript
    const { setOneWithTTL, getOneWithTTL } = require('local-js');
   
    const key = 'your_key'; 
    const data = [ 'your', 'data' ];
    const ttl = 3000;
   
    setOneWithTTL(key, data, ttl); // Sets data with an expiry time

    const item = getOneWithTTL(key);
    console.log(item) // [ 'your', 'data '];
```

# Documentation
## `setOne(key, data)`
### Info: Sets a single item into localStorage, accepts nested structures.
```javascript
    const { setOne } = require('local-js');
    
    const key = 'your_key'; 
    const data = [ 'your', 'data' ];
    
    setOne(key, data);
```

## `getOne(key)`
### Info: Gets a single item from localStorage, return `null` if item does not exist.
```javascript
    const { getOne } = require('local-js');
    
    const key = 'your_key'; 
    
    getOne(key); // Returns data if key exists, null if it doesnt.
```

## `setOneWithTTL(key, data, ttl)`
### Info: Sets a single item into localStorage with an expiry time(ttl), accepts nested structures.
```javascript
    const { setOneWithTTL } = require('local-js');
    
    const key = 'your_key'; 
    const data = [ 'your', 'data' ];
    const ttl = 3000;
    
    setOneWithTTL(key, data, ttl);
```

## `getOneWithTTL(key)`
### Info: Get a single item with an expiry time, if the token is expired it will be removed and return `null`.
```javascript
    const { getOneWithTTL } = require('local-js');
    
    const key = 'your_key'; 
    
    getOneWithTTL(key); // Return data if key exists and isnt expired, else return null
```

## `setMany(array)`
### Info: Sets many items into localStorage, array of objects containing the keys, `key` and `value`.
```javascript
    const { setMany } = require('local-js');

    const array = [
                    { key: 'first_key', value: 'first_value' }, 
                    { key: 'second_key', value: [ 'second', 'value' ]},
                    ...
                  ];

    setMany(array);
```

## `getMany(array)`
### Info: Gets many items from localStorage.
```javascript
    const { getMany } = require('local-js');
    
    const array = [ 'first_key', 'second_key', ...];
    
    getMany(array); // [ 'first_value', [ 'second', 'value' ], ...];
```

## `setManyWithTTL(array)`
### Info: Sets many items into localStorage with ttl, array of objects containing the keys, `key`, `value`, `ttl`.
```javascript
    const { setManyWithTTL } = require('local-js');

    const array = [
                    { key: 'first_key', value: 'first_value', ttl: 1000 }, 
                    { key: 'second_key', value: [ 'second', 'value' ], ttl: 2000 },
                    ...
                  ];

    setManyWithTTL(array);
```

## `getManyWithTTL(array)`
### Info: Gets many items into localStorage with ttl, if the item is expired or does not exist it will be returned as null.
```javascript
    const { getManyWithTTL } = require('local-js');

    const array = [ 'first_key', 'second_key', ...];

    getManyWithTTL(array); // [ 'first_value', [ 'second', 'value' ], ...];
```

## `deleteOne(key)`
### Info: Removes a single item from localStorage.
```javascript
    const { deleteOne } = require('local-js');

    const key = 'my_key';
    deleteOne(key);
```

## `deleteAll()`
### Info: Clears all data from localStorage.
```javascript
    const { deleteAll } = require('local-js');

    deleteAll();
```

## `pruneExpired()`
### Info: Clears all keys with TTL that have expired.
```javascript
    const { pruneExpired } = require('local-js');

    pruneExpired();
```

## `getAll()`
### Info: Get all items from local storage.
```javascript
    const { getAll } = require('local-js');

    getAll(); // [ { key: 'your_key', data: [ 'your', 'data' ] }, ...];
```
