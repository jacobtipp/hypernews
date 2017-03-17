# browserify-livereload

This is a small livereload [browserify](http://browserify.org/) plugin. It is aimed for those who don't want to waste time with gulp plugins or pre-packaged development servers.

<a href="https://nodei.co/npm/browserify-livereload/"><img src="https://nodei.co/npm/browserify-livereload.png?downloads=true&downloadRank=true&stars=true"></a>

Quick example
-------------

```shell
git clone https://github.com/traducer/browserify-livereload.git
cd browserify-livereload/example
npm i && npm run dev
```

open your browser to [http://localhost:8080](http://localhost:8080) and start messing with the src files


Installation
------------
```shell
$ npm install --save-dev browserify-livereload watchify
```
because this plugin doesn't watch for files, use [watchify](https://github.com/substack/watchify) to handle rebundling, the plugin will do the rest.

Usage
-----

##### Command Line
```shell
$ watchify -p [ browserify-livereload --host 127.0.0.1 --port 1337 ] index.js -o bundle.js
```

##### API
```js
const path = require('path')
const browserify = require('browserify')
const livereload = require('browserify-livereload')

const b = browserify({
    entries: 'index.js',
    cache: {},
    packageCache: {},
    debug: true
})

b.plugin(livereload, {
    host: 'localhost',
    port: 1337,
    outfile: path.join(__dirname, 'src', 'bundle.js') /* this option is required if using API mode */
})
```

How it Works
-----------
The plugin checks for an outfile option if you're programatically building your bundle. if running browserify/watchify from the command line you do not need to add an outfile option as it is already added.
The plugin starts up a socket.io server on creation, when the end event from the bundle pipeline is triggered, the plugin will prepend a script to the bundle using node streams. The socket.io file is an immeditely invoked function expression that injects the socket.io-client script to the head of the document. This way if any errors occur in your code, the socket.io events will fire independently. 

Do not use this in production, this is for development purposes only. Be sure to bundle your application for production without this plugin. 
