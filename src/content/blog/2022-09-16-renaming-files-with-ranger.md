---
title: Renaming lots of files? This trick will save you hours!
pubDate: 2022-09-17T19:36:55.581Z
tags:
  - productivity
  - rename
  - ranger
category:
  - tools
author: Fredy Sandoval
heroImage: /images/blog/image3.webp
---
Let's say you have 100 files that are named incorrectly, and you need to change a specific part of it's name. 

The Question would be:

### How do I rename several files at the same time?

Answer: 
You can use a command line interface tool (cli) named Ranger. This tool will allow you to use your favorite text editor, Nano or Vim, to rename files in bulk.

Here are the steps:

<u>Step 0.</u>
Ensure you have Ranger installed, if you don't know how to install it, you can check this [article](https://www.fredy.dev/tools/ranger-for-newbies-easy-edition/).

<u>Step 1.</u>

In a new terminal, call <code>ranger</code> and select all the files you want to rename with the spacebar. 

<u>Step 2.</u> 
Once the files are selected, type <code>:bulkrename</code> this will open you an editor with the names of the files in it.

<u>Step 3.</u> 
You can start editing the file names, all changes you make to the names will be applied to the actual filenames of your files, once you're done, just close and save it.

You will be prompted two times asking if you want to save and close.

<u>Visual Example:</u> 
<div style="display: flex; justify-content: center;">
<img src="https://user-images.githubusercontent.com/45242501/163793114-a932f5fa-a1fb-4801-9668-3765db9fe214.gif" width=500 alt="ranger renaming in bulk">
</div>