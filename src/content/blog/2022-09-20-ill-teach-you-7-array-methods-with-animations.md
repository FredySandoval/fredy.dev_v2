---
title: I'll teach you 7 Array methods. (with animations!)
pubDate: 2022-09-20T20:35:43.072Z
tags:
  - javascript
category:
  - Tutorial
author: Fredy Sandoval
pinned: 2
heroImage: /images/blog/articlethumbnail.png
---
## map 
Creates a new array populated with the results of a provided function on every element.
```js
[1, 2, 3].map( n => n * 2 ); // [2, 4, 6]
```
![11](https://user-images.githubusercontent.com/45242501/191165459-eb59d0f8-1188-4119-8b9d-ae422150d97c.gif)

## filter
Creates a Copy of a portion of a given array, filtered down to just the elements from the given array that pass the test, keep in mind that changes of your first array will affect your copy.
```js
[1,2,3].filter( n => n !== 2 ); // [1,3]
```
![22](https://user-images.githubusercontent.com/45242501/191168509-c1c53a6a-cfdb-49c7-aa2c-336859ec19ff.gif)

## find
Stops and returns the first element in the provided array that satisfies the provided testing function, otherwise returns undefined. 
```js
[1,2,3].find( n => n == 2 ) // 2
```
![33](https://user-images.githubusercontent.com/45242501/191170544-e4fc3b96-e4bf-4fb5-8636-c81e72ac7f74.gif)

## findIndex
Returns the index of the first element that satisfies the provided testing function. Otherwise -1 is returned.
```js
[1,2,3].findIndex( n => n == 2) // 1
```
![44](https://user-images.githubusercontent.com/45242501/191172188-9446e69f-4e72-452e-b090-227da04e3824.gif)

## fill
Changes all elements in an array to a static value, from a start index (default 0) to an end index (default array.length). It returns the modified array.
```js
[1,2,3].fill('Txt', 1,2) // [1,'Txt', 3]
```
![77](https://user-images.githubusercontent.com/45242501/191353910-e16f99ac-0845-43fd-9da5-c1e2cfec7a8d.gif)

## every
Tests all elements in the array. After finished returns a Boolean value
```js
[2,2,2].every( n => n == 2 ) // true
```
![88](https://user-images.githubusercontent.com/45242501/191357036-0d78d7e4-c5b5-40a3-8faf-ce460e7acc14.gif)

## some
Tests whether at least one element in the array passes the test implemented by the provided function. 
```js
[1,2,3].some( n => n == 2) // true
```
![99](https://user-images.githubusercontent.com/45242501/191358482-ddec7b8d-82c8-4ea9-9599-e85e4fd646ab.gif)