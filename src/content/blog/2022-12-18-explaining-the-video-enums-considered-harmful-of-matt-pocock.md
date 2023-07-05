---
title: Explaining the video "Enums Considered Harmful" of Matt Pocock
pubDate: 2022-12-18T10:15:15.974Z
tags:
  - TypeScript
category:
  - Tutorial
author: Fredy Sandoval
heroImage: /images/blog/video2.png
---
I was watching this video by Matt Pocock, but I found really hard to digest and internalize the TypeScript, so I decided to create a little guide, because I learn better when I explain things to others, so here it is.
**The TypeScript shown in the video**
```tsx
const LOG_LEVEL = {
   DEBUG: 'debug',
   WARNING: 'warning',
   ERROR: 'error',
} as const;

type ObjectValues<T> = T[keyof T];
type LogLevel = ObjectValues<typeof LOG_LEVEL>
```
---


## Destructuring...

**'typeof' will get you the types**
```tsx
type LOG_LEVEL_TYPE = typeof LOG_LEVEL;
// Hardcoded will be like this:
type LOG_LEVEL_TYPE_2 = {
    readonly DEBUG: "debug";
    readonly WARNING: "warning";
    readonly ERROR: "error";
}
```
 **'keyof' will get the keys**
```tsx
type LOG_LEVEL_KEYS = keyof LOG_LEVEL_TYPE;
// Hardcoded will be like this:
type LOG_LEVEL_KEYS_2 = "ERROR" | "WARNING" | "DEBUG"
```

**'type[i]' will get the values**
```tsx
type LOG_LEVEL_VALUES = LOG_LEVEL_TYPE["ERROR" | "WARNING" | "DEBUG"];
// or
type LOG_LEVEL_VALUES_2 = LOG_LEVEL_TYPE[LOG_LEVEL_KEYS];
// Hardcoded will be like this:
type LOG_LEVEL_VALUES_3 = "debug" | "warning" | "error"
```
**For example the variable myLog can only be the VALUES, anything else will throw an error**
```tsx
let myLog: LOG_LEVEL_VALUES;
myLog = 'debug';
myLog = 'warning';
myLog = 'error';
```
**MyLog_2 can only be the KEYS**
```tsx
let myLog_2: LOG_LEVEL_KEYS;
myLog_2 = 'DEBUG';
myLog_2 = 'ERROR';
myLog_2 = 'WARNING';
```

**The previous can also be compressed and written like this:**
```tsx
type LOG_LEVEL_VALUES_4 = typeof LOG_LEVEL[keyof typeof LOG_LEVEL];
// Hardcoded will be like this:
type LOG_LEVEL_VALUES_5 = "debug" | "warning" | "error"
```
---
## Now explaining the TypeScript will be:
```tsx
type ObjectValues<T> = T[keyof T];

// Imagine it as a function that returns the values of wherever T is.
function ObjectValues(T:any) {
    return T[Object.keys(T)[0]]
}
```

**for example:**
```tsx
type MyType = {
   myString: 'my string',
   myNumber: 23,
}

let myValue:ObjectValues<MyType>;
myValue = 'my string' // can only be the litteral string,
myValue = 23;         // or the litteral value
```
**Explaining the last part**
```tsx
type LogLevel = ObjectValues<typeof LOG_LEVEL>
// Now imagine this part like we actually execute the function and 
// we passed the types provided by "typeof"
let logLevel = ObjectValues({ myString: 'my string'})
```
[Playground Link](https://www.typescriptlang.org/play?#code/MYewdgzgLgBAMgeQOIH04FEBq64wLwwDeAUDGQCLoBCAqkgFwwDkAJgKYBGArgOZMA0pMgHUAggCUAcgElJDZgHcAhgCcwASzB9BZGOnHiE4xkzYqVIFQOIBfGEogxQkKAG5ipAPQAqMgBUATQAFdAQAMRgFdQAbaJgeNlgoAAs2GCgATwAHNJhvT2JMnPhkNCwcFECQ-HTsthAAMxLUDGw4d09PGAAJVRZQdhZImLiONOj1AGs0lPUIekK65rK2yuD0FAAmGpJdGBU2JRZwaIyYSlp5ACJ2bh4r9z2Do5OzsSlZa+U1TXvH3WexzApz0BiMjCuZgsKgetg8MB8ZAA0ugAuFhrF4ol0qkYNMMo58otiogWuU4CgUQEAMo1fGNZatCpVdAdLrSRwpNIQJQAWzSDkiKnUUDYCyKaVJKwqVOpWxqV30hnEVxgAB8YFd3jI5KqNVcLnQrh5iIiWQBtdQAXQxcQSSVxADclNEuGxCQUJYzyShMKI4DR0LSCFKmRSLYqwSr1ZrtZ89ZrDUgrla2TBLMTJaUw77-YG5dsQ9mfRbQz7ZanTV1eip+iBBraYGMYBNpji5uKlmXVn6A0GUABmBW3XgJq7fDRaMdQyzG4jRbG8jJwEA8Rjdiq9-OuBFdJcrnhOJRgdPAs7NrkwLdB4j71c1VicXhMdx3w8EJgT34v2-L+8fmcrHcedFz-HgtnXYtVllHdOhgABZMD5WAY9TxBC9cVlX8D3lD8kx-N9cOYJUjAIpDC2YOM5B-KsYD8XEsgOR11BALhHBQk8XQgEAmzSUBeUY90IDYIZjyGBRhSgUUT1bGZkg7TNvR7PN+wAFhqCUGQ3OBzXpJpNKabTKzgms6wbKJMWbWT23mRTtNzPs5QAVmHJ97hjcdVEndz9UAuc4PINh+KyEAIF+RsxgWRSEA4AArIKoEwF03QgAAePwAD4aj8XS2AyBk-ErWjpF5JQeE0NIRXsRwlBgBouDAYAoBYk8UiUWADigLg1E5J1kvddMmgUVImLMOiYDmAA6Yh6sa5rwBgGL4qapLXXdAAKPx6GPDIAEoiCEMhOu6k8cqWhLJvxCBNt280AAYrStOEPDghpLBgNgAA8+SyBdO2KRC-CWAhdjIJdqSgYUtBMJcYGgKHtEOpdJC4XkxhURhNgHQQbA8BdYCXVa3Xoc6Vv6tLAbqDLXwyIm0g-WH4e-XcjxPV5eJxcYRVFFQXThyHfkEQn+pqLGdz2PY4Pey8Jiksw+edNaPC9A84DYR02DiAhScS8nUoMpScAy2jJBABQJtK8qwDkuYYCyVRYGshQBSargXRBL6gq4UVObqhqmpa+wwCGWjnbthxhKGS8JUcRiQGYhsODOK4DONfGW1XNWNa1xa4oSunrsIGBwYF6HmEZ0u+BsXbiCAA)