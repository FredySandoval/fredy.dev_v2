---
title: Tutorial on an ExpressJS app with a free SSL certificate using Certbot
  and Nginx
pubDate: 2022-12-15T08:49:44.107Z
tags:
  - nginx
category:
  - Tutorial
author: Fredy Sandoval
heroImage: /images/blog/main_small.png
---
Tutorial on securing an ExpressJS app with a free SSL certificate using Certbot and Nginx, follow these steps:

Install Certbot and the Nginx plugin by running the following command:

```bash
sudo apt install certbot python3-certbot-nginx
```
Create a new configuration file for your domain in the /etc/nginx/sites-available directory by running the following command:

```bash
sudo touch /etc/nginx/sites-available/example.com
```
Open the example.com file in a text editor and add the following configuration. This sets up a proxy to redirect traffic from port 80 (the default HTTP port) to your Express app running on port 3000:

```conf
server {
    listen 80 default_server;
    listen [::]:80 default_server;

    server_name example.com;

    location / {
        proxy_pass http://localhost:3000;
        proxy_set_header Host $host;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    }
}
```
Make sure that your Express app is running on port 3000. You can do this by adding the following code to your app, if it's not already there:

```js
const express = require('express');

const app = express();

app.get('/', (req, res) => {
  res.send('Hello, world!');
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Listening on port ${port}...`);
});
```
Use Certbot to create a free SSL certificate for your domain by running the following command:

```bash
certbot --nginx -d yourdomain.com
```
Reload Nginx to apply the new configuration and enable HTTPS support by running the following command:

```bash
systemctl restart nginx
```
To automatically renew your SSL certificate before it expires, run the following command:

```bash
certbot renew
```
To test that the renewal process is working correctly, you can simulate a renewal by running the following command:

```bash
sudo certbot renew --dry-run
```
That's it! Your Express app is now secured with a free SSL certificate and can be accessed securely over HTTPS.