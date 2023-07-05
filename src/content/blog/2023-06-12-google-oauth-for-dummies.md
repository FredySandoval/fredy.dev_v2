---
title: Google OAuth2 for Dummies
pubDate: 2023-06-12T00:00:00.990Z
tags:
  - JavaScript
category:
  - tutorial
author: Fredy Sandoval
pinned: 0
heroImage: "https://res.cloudinary.com/practicaldev/image/fetch/s--nE-aBp4I--/c_imagga_scale,f_auto,fl_progressive,h_420,q_auto,w_1000/https://dev-to-uploads.s3.amazonaws.com/uploads/articles/74tbon9frjwao9qncvzm.png"
---
# Google OAuth2 for Dummies
---

<br/>
The Full code is at the bottom. 

<br/>

TLDR: In this tutorial we will Authenticate an Application using Google OAuth2. It loads credentials from a local JSON file, creates an OAuth2 client with those credentials, and sets up a few HTTP routes to handle the authentication process.

Questions to be answered: 
#### 1. How authenticate an app using Google OAuth2 in NodeJS? 
You use the googleapis npm package to create an OAuth2 client with your app's credentials. Generate an authorization URL and redirect users there to grant your app permissions. When they're redirected back to your app, exchange the "code" they bring for access and refresh tokens.
#### 2. How do you load credentials from a JSON file in Google APIs?
You can use the fs module's readFileSync function to read the contents of the file. Then, use JSON.parse to parse the contents into a JavaScript object.
#### 3. What are the Google API scopes?
Scopes define the permissions your app is requesting from users. This script requests permission to send Gmail messages on the user's behalf.

## PART 1

### Creating credentials
a. Go to Google Console > Credentials
[https://console.cloud.google.com/apis/credentials](https://console.cloud.google.com/apis/credentials)

![Google APIs & Serices](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/8qtypso8gndi7iri28rl.png)

b. Create a new Credential of type OAuth client ID

![Google Oauth](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/0fendnwvnx7kvx7y41gs.png)

c. Select type Desktop and give any name you want

![Google Auth](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/g9hqcnk92q2rj8hufu49.png)

d. Save the JSON file (client_secret_xxx…) in the root folder of
the project

![Google Oauth](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/n2f627a8yyb3k6gw5cs9.png)

### IMPORTANT!

You must add the email addresses of the people that will use
the application, including yours. Otherwise that person won’t
be able to use the application.

![Google Auth](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/vqkzj03aqpcv390iusc2.png)

You also must modify the JSON secret file (the file you just
downloaded "client_secret_xxx…")
At the end of the file you will find “redirect_uris”, you need to
modify it like this:


![Google Oauth](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/jf2sk1ledd52tgwbti4u.png)

## PART 2 

We're going to break down a piece of code that allows your application to interact with Google APIs using OAuth2 for authentication. This script involves several important Node.js modules like `googleapis`, `fs`, `path`, and `express`. Let's get started!

First off, install the necessary packages.
```sh
npm init -y
npm install express googleapis
```
now let's import some essential modules:
```js
const { google } = require('googleapis');
const fs = require('fs');
const path = require('path');
```
`google` is part of `googleapis`, which lets us interact with Google's services. `fs` is a built-in Node.js module to work with the file system, and `path` helps us with file paths.

Now, we define some constants:
```js
const CREDENTIALS_FOLDER  = './'; // location of credentials
const SCOPES              = ['https://www.googleapis.com/auth/gmail.send'];
```

`CREDENTIALS_FOLDER` is the location of our Google API credentials file. `SCOPES` is an array that specifies what permissions our application requests from users. Here, we're asking to send Gmail messages on behalf of the user.

The next part of the script involves loading our Google API credentials:
```js
let credentials;
try {
  const files = fs.readdirSync(CREDENTIALS_FOLDER);
  const credentialsFile = files
    .find(file => file.startsWith('client_secret_') && file.endsWith('.json'));
  const credentialsPath = path.join(__dirname, CREDENTIALS_FOLDER, credentialsFile);
  const file = fs.readFileSync(credentialsPath, 'utf8');
  credentials = JSON.parse(file);
} catch (error) {
  console.log("unable to read file, can't continue");
}
```
This script looks for a file that starts with `client_secret_` and ends with `.json` (this is your Google API credentials file). It then reads the file and parses it as JSON. If something goes wrong (like if the file doesn't exist), it logs an error message.

Next, we validate our credentials:
But why? it is very common that we or somebody loads the incorrect credentials type, Google has different credentials, and validating we have the right ones will save hours of debugging. 
```js
const REQUIRED_CREDENTIALS_PROPERTIES = [
  'client_id', 'project_id', 'auth_uri', 'auth_provider_x509_cert_url', 'token_uri', 'client_secret', 'redirect_uris'
];
REQUIRED_CREDENTIALS_PROPERTIES.forEach(prop => {
  if (!(prop in credentials.installed)) 
    throw new Error(`Property ${prop} not found in credentials`);
});
```

We have a list of all the properties that should be in our credentials object, and we make sure that each one is there. If not, we throw an error.

Now we create an OAuth2 client:
```js
const { installed: { client_id, client_secret, redirect_uris } } = credentials;
const oAuth2Client = new google.auth.OAuth2(client_id, client_secret, redirect_uris[0]);
let authUrl = oAuth2Client.generateAuthUrl({
  access_type: 'offline',
  scope: SCOPES
});
```
We pull out the necessary parts of our credentials and create an OAuth2 client. We then generate a URL `(authUrl)` where users will grant our application the permissions we requested.

Next, we set up an Express application:
```js
const express = require('express');
const app = express();
```

Express is a framework that makes it easier to handle HTTP requests and responses in Node.js.

We define three routes. The first `('/')` sends users to the `authUrl` we generated earlier:
```js
app.get('/', (req, res) => {
  res.send(`<a href="${authUrl}">Authorize</a>`);
});
```
The second (/oauth2callback) is the "callback URL". After users grant permissions, Google redirects them here with a special "code". We exchange that code for access and refresh tokens, which allow us to make authorized requests on behalf of the user:
```js
app.get('/oauth2callback', async (req, res) => {
  const { code } = req.query;
  const { tokens } = await oAuth2Client.getToken(code);
  oAuth2Client.setCredentials(tokens);
  res.redirect('/authenticated');
});
```

The third route `('/authenticated')` simply confirms that the user has been authenticated:
```js
app.get('/authenticated', (req, res) => {
  res.send('You are authenticated now!');
});
```

Next, we define two "middleware" functions to handle requests that don't match any routes and to handle errors:
```js
function notFound(req, res, next) {
  res.status(404);
  const error = new Error('Not Found - ' + req.originalUrl);
  next(error);
}
function errorHandler(err, req, res, next) {
  res.status(res.statusCode || 500);
  res.json({
    message: err.message,
    stack: err.stack
  });
}
app.use(notFound);
app.use(errorHandler);
```

These functions provide helpful error messages to users and developers.

Finally, we make our app listen on a specific port:
```js
var interfaces = require('os').networkInterfaces(), localhostIP;
for (var k in interfaces) {
    for (var k2 in interfaces[k]) {
        let ipFamily = interfaces[k][k2].family;
       if ( ipFamily === 'IPv4' || ipFamily === 4 && !interfaces[k][k2].internal) {
          localhostIP = interfaces[k][k2].address;
       }
   }
}
const port = process.env.PORT || 5000;
app.listen(port, () => {
    console.log(`Listening on http://${localhostIP}:${port}`);
});
```
This script starts our app listening on the port specified by the environment variable `PORT`, or 5000 if `PORT` isn't defined. The server's address is logged to the console when the server starts.

And that's it! You've just learned how to set up a simple OAuth2 authentication flow with Google APIs and Express. It's not so difficult when you break it down, right? Happy coding!

### Full code
```js
const { google }          = require('googleapis');
const fs                  = require('fs');
const path                = require('path');
const CREDENTIALS_FOLDER  = './';
const SCOPES              = ['https://www.googleapis.com/auth/gmail.send'];

/* GLOBAL VARIABLES*/
let credentials;


// ----------  OAUTH2 CLIENT ----------------
// Load client secrets into "credentials"
try {
  const files = fs.readdirSync(CREDENTIALS_FOLDER);
  const credentialsFile = files
    .find(file => file.startsWith('client_secret_') && file.endsWith('.json'));

  if (!credentialsFile) throw new Error('credentials file not found');

  // const credentialsPath = CREDENTIALS_FOLDER + credentialsFile;
  const credentialsPath = path.join(__dirname, CREDENTIALS_FOLDER, credentialsFile);
  const file = fs.readFileSync(credentialsPath, 'utf8');
  credentials = JSON.parse(file);
} catch (error) {
  console.log("unable to read file, can't continue");
}

// VALIDATE CREDENTIALS 
const REQUIRED_CREDENTIALS_PROPERTIES = [
  'client_id',
  'project_id',
  'auth_uri',
  'auth_provider_x509_cert_url',
  'token_uri',
  'client_secret',
  'redirect_uris'
];

// Ensure all required properties exist
if (!credentials || !credentials.installed) {
  throw new Error('credentials or installed not found in credentials');
}

REQUIRED_CREDENTIALS_PROPERTIES.forEach(prop => {
  if (!(prop in credentials.installed)) 
    throw new Error(`Property ${prop} not found in credentials`);
});

const { installed: { client_id, client_secret, redirect_uris } } = credentials;
const oAuth2Client = new google.auth.OAuth2(client_id, client_secret, redirect_uris[0]);

let authUrl = oAuth2Client.generateAuthUrl({
  access_type: 'offline',
  scope: SCOPES
});

// ----------  EXPRESS APPLICATION  ----------------
const express = require('express');
const app     = express();

app.get('/', (req, res) => {
  res.send(`<a href="${authUrl}">Authorize</a>`);
});

app.get('/oauth2callback', async (req, res) => {
  const { code } = req.query;
    const { tokens } = await oAuth2Client.getToken(code);
    oAuth2Client.setCredentials(tokens);
    res.redirect('/authenticated');
});

app.get('/authenticated', (req, res) => {
  res.send('You are authenticated now!');
});
// ----------  EXPRESS FALLBACKS  ----------------
function notFound(req, res, next) {
  res.status(404);
  const error = new Error('Not Found - ' + req.originalUrl);
  next(error);
}
function errorHandler(err, req, res, next) {
  res.status(res.statusCode || 500);
  res.json({
    message: err.message,
    stack: err.stack
  });
}
app.use(notFound);
app.use(errorHandler);

// gets the localhost IP address
var interfaces = require('os').networkInterfaces(), localhostIP;
for (var k in interfaces) {
    for (var k2 in interfaces[k]) {
        let ipFamily = interfaces[k][k2].family;
       if ( ipFamily === 'IPv4' || ipFamily === 4 && !interfaces[k][k2].internal) {
          localhostIP = interfaces[k][k2].address;
       }
   }
}

const port = process.env.PORT || 5000;

app.listen(port, () => {
    console.log(`Listening on http://${localhostIP}:${port}`);
});
```