---
title: Which Programming language is faster at reading?
pubDate: 2023-01-14T08:03:41.990Z
tags:
  - Javascript
category:
  - tutorial
author: Fredy Sandoval
pinned: 1
heroImage: /images/blog/1rv78ls86k2qq1sn5org.png
---
Let’s say we have the same task written in the different programming languages, the questions is: which language is faster? In order to get an answer to this question, we will write a simple program, and write the same code on different programming languages. For our test we will be writing the same code in NodeJs, Deno, Python3, Golang, Rust and C. Then Will be bench-marking and comparing the time it took for each language to complete the task.

Let’s get started! For our test we will coding an application to read a large file then search for a specific string and output the index location of that string once found.

The Task written in JavaScript looks like this, and the same code will be written in the other languages:


![Javascript Code](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/1rv78ls86k2qq1sn5org.png)

In order to ensure each programming language is doing the exact same task we have the following restrictions:

### Constrains:

- The buffer size in all languages is 65536 bytes which is the default for NodeJS

- The file in which all programming languages search must be the same, and in this case is a 10GB binary file filled with random characters.

- The string to be searched is the word “ — boundary — “ which is at the very end, and won’t be changed.

- For the benchmarks, all Languages performed the task 100 times.

In this first case, I tested the same application on NodeJS, Deno, Python3, GO, Rust and C.

For the Bench-marks I measured them using a Linux program called “Hyperfine” which is dedicated for this purpose only. I performed all the benchmarks on a fresh install of Manjaro using a CPU: AMD Ryzen 9 5950X (32) @ 3.400GHz, while no other program was running in the background, to ensure the same result each time.

### Results (lower and stable is better)

![chart of results](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/qxf24v1cn7xwp52reqgk.png)

Deno: The first thing we notice is that Deno is the slowest and most unstable of them, I was definitely expecting this, and I believe this is one of the reasons Deno never took off and is still very unused to this day compared to others like NodeJs. Even though is written in Rust, was very slow and unstable on this task.

StreamSearch NPM Package: Applications like “Busboy” made for Express/NodeJs and others that depend on it like “Multer”, both of them depend on StreamSearch that allows searching a stream using the Boyer-Moore-Horspool algorithm, in this particular case the algorithm made the task to perform slower than the rest.

Rust: I hear all the time about how fast Rust is, but on this particular task was not particularly good, not to mention that the code was hard to write due to it’s complexity, and very unstable compare to the rest.

Node: The level of optimization that Node has received, and the large amount of documentation and it’s friendliness for the new user , makes it the most used, even though was not blazingly fast, it completed the task, and was very easy to write.

Go: On this particular case Go was superior to Rust, and was way more easy to write, well… compared to rust.

Python 3: This result was a big surprise for me, but knowing the level of optimization that python has received makes it one of the most used programming languages in the world, and the new version 3.11 claims to be even faster, I will have to test it.

C: Being the fastest of all was not a surprise, C is known for being extremely fast, but also is hard to write, and if you ask me I wouldn’t recommend to migrate to C just to improve a few seconds in performance, unless you are a big company of course.

### Additional: Testing different NodeJS versions.

![chart of results](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/hf0z1y3gmahbi56huqq9.png)

All versions performed around the same, but the latest version 18, did notably slow compared to the rest, so it may not be a good idea to upgrade to the latest version of Node, at least not yet

### Final Ranking:

![Final Ranking](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/8vqybtto4jmcygs7kldj.png)

### Final thoughts:
If I were to migrate an application to improve performance, I would definitely consider python 3.10.4 as one of my option, not just because is easy compared to Node or Go, but because is so easy to write and implement, also it’s documentation is available everywhere, even though the errors in the console are not friendly at all, and don’t tell too much about the error itself, compare to Rust, for example which the errors in the console, tells exactly whats going on, Python may be the best option and fastest option, at least for now.

If you want to check the code I wrote to perform this tests, please check my repository [github.com/FredySandoval/benchmark-indexof](https://github.com/FredySandoval/benchmark-indexof)