---
title: "TypeScript: A beginner's guide with emojis 🤗"
pubDate: 2022-12-07T22:05:44.608Z
tags:
  - TypeScript
category:
  - Tutorial
author: Fredy Sandoval
pinned: 3
heroImage: /images/blog/devto.png
---
Is basically telling what type something is.

For example let say we have a box,
and we want to tell people to only put eggs in the box.
```js
let myBox; // 📦
```
In real life we would put a sticker in the box saying "only eggs 
please 📄", in TypeScript we do the same, we add a "type" saying what something is and only accepts.
```js
  Variable           Type            value
┌────┴─────┐     ┌────┴─────┐      ┌───┴───┐
let myBox_📦  :  onlyEggs_📄   =   "🥚🥚🥚";
               ↑                ↑
               Separator        Assignment operator
```

There are 3 basic types in TypeScript
```js
let isDone: boolean = false;              // 😀 or 😟

let lines: number   = 42;                 // 0️⃣1️⃣2️⃣3️⃣4️⃣5️⃣...

let name: string    = "John";             // 📃
```

When it's impossible to know, there is the "Any" type
```js
let notSure: any = 4;                     // 🤷‍♂️ Not sure

notSure = "I'm a string";                 // I can change it later
 
notSure = false;                         // maybe a boolean
```

There are typed arrays
```js
let list: number[] = [1, 2, 3];

// or with emojis:
        Only chickens please!
              ┌─┴─┐ 
let chickens: 🐔[] = [🐣,🐤,🐥,🐓];
```
Alternatively you can use Array<Type> which It's same as Type[]
```js
let list: Array<number> = [1, 2, 3];

// or with emojis
let listOfChickens: Array<🐔> = [🐣,🐤,🐥,🐓];
```

Enumerations also known as enums:
```js
enum Square { Red, Green, Blue };         // 🟥, 🟩, 🟦

// This can be understood better by seeing what Enumerations 
// are compiled to in JavaScript:
Square = { 
           0       :   'Red', 
           1       :   'Green', 
           2       :   'Blue', 
           Red     :    0, 
           Green   :    1, 
           Blue    :    2,
          };

// Now that you know is just an object, 
// you can access it by name or number.
console.log( Square.Green );              //  🟩
console.log( Square[2] );                 //  🟥 

// or in a more complex way
let c: Square = Square.Blue;
console.log( Square[c] );                 //  🟦
```
