---
title: My story of how I built my side project - MicroDBs -
pubDate: 2022-11-18T02:57:16.576Z
tags:
  - javascript
  - productivity
category:
  - Tutorial
author: Fredy Sandoval
heroImage: /images/blog/microdbs-frontpage.png
---
One of the dilemmas I always have when building something is the database, but the biggest one is "what if I want to store something really small? or I might delete it later or use it very little" like a score tracker or a views counter or a little Likes button. Is it worth it? to deploy an entire database just to store a few records.




## Basic Idea
![database description](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/scvjb0keex13z448hazu.png)

* Prepare the service to handle thousands collections.
* Allow Users to create a collections.
* Users can delete and modify the existing collection.
* Users can Insert, Find, and update documents.



## Building the Frontend

The sketch the layout in Figma
![Figma layout](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/xzx5495qebb45r0441pb.PNG)

Creating the graphics in Blender
![Blender Graphics](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/v15n6rejoobq4rvg0ssb.png)



## Building the Backend

Solving the project logic in pseudocode
```
METHOD "POST" 
ROUTE PATH "/createcollection"
1. Check if HTTP request is valid
2. Check if collection already exists
3. Store the collection as independent file
4. Store the collection id in an index

METHOD "DELETE"
ROUTE PATH "/delete"
1. Check if HTTP request is valid.
2. Check if collection exists and load it in memory.
3. Validate if user has permission to delete.
4. Delete the collection and delete entry in index.

METHOD "GET"
ROUTE PATH "/find"
1. Check if HTTP request is valid
2. Check if collection exists and load it in memory.
3. Validate if user has permission to read.
4. Respond to request in JSON

METHOD "POST"
ROUTE PATH "/insert"
1. Check if HTTP request is valid
2. Check if collection exists and load it in memory.
3. Validate if user has permission to insert.
4. Validate schema of new document and insert it if ok.
5. Respond status ok

METHOD "PATCH"
ROUTE PATH "/update"
1. Check if HTTP request is valid
2. Check if collection exists and load it in memory.
3. Validate if user has permission to update.
4. find document in collection
5. Validate schema of new document and insert it if ok.
6. Respond status ok

```


Node packages
```js
 "dependencies": {
    "ajv": "^8.11.0",
    "bcryptjs": "^2.4.3",
    "cors": "^2.8.5",
    "express": "^4.18.1",
    "express-rate-limit": "^6.4.0",
    "ip-matching": "^2.1.2",
    "ip-range-check": "^0.2.0",
    "is-cidr": "^4.0.2",
    "joi": "^17.6.0",
    "lodash-es": "^4.17.21",
    "lowdb": "^3.0.0",
    "nanoid": "^4.0.0"
  },
  "devDependencies": {
    "axios": "^0.27.2",
    "jest": "^28.1.3",
    "nodemon": "^2.0.19"
  }
```
Continuous Integration using GitHub


```yml
name: Deploy to GCP server

defaults:
  run:
    shell: bash -ieo pipefail {0}

on: [workflow_dispatch]

jobs:
  build:
    runs-on: self-hosted
    
    steps:
    - uses: actions/checkout@v3
    - name: Install dependencies
      run: npm install
    - run: pm2 restart all
```

Testing using JEST


```js
it('Create basic collection', async () => {
    const res = await axios.post(`${baseUrl}/createcollection`);
    expect(res.status).toBe(200);
    expect(res).toHaveProperty('data');
});
```

## FINAL RESULT

![MicroDBs](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/m6m0owytcn8gip2owqnp.PNG)

### Follow me on Twitter 👇 [![Twitter](https://img.shields.io/twitter/url.svg?label=Follow%20%40fsandovaldev&style=social&url=https%3A%2F%2Ftwitter.com%2Ffsandovaldev)](https://twitter.com/fsandovaldev)