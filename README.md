<p align="center"><img src="/logo.png?raw=true" alt="AppStorage Logo"/></p>

# AppStorage

[![npm](https://img.shields.io/npm/v/appstorage.svg)](https://www.npmjs.com/package/appstorage)
[![npm](https://img.shields.io/npm/l/appstorage.svg)](https://github.com/faressoft/appstorage/blob/master/LICENSE)

> LocalStorage for Node.js, auto syncing for objects with JSON files using the Proxy API

# Table of Contents  

* [Installation](#installation)
* [Usage](#usage)
* [License](#license)

## Installation

```
npm install --save appstoragejs
```

## Introduction

Use the ES6 [Proxy](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Proxy) API to set traps to recursively watch changes on an object and sync it automatically with a `JSON` file within the current event loop phase using `fs.writeFileSync`.

* `Good for` CLI tools, storing configs, user preferences, cached data, states, etc.
* `Bad for` production applications, scalable or high-performance applications, web servers, etc.

## Usage

* The data are synced automatically with `data.json` on every change within the current event loop phase.
* The data are read automatically from `data.json` when the app starts.
* Nothing to worry about just deal with the object as any normal object.

```js
var AppStorage = require('appstoragejs');

// Create a new AppStorage
var appStorage = new AppStorage('data.json');

// Just do anything with your object !
appStorage.name = 'Bob';
appStorage.age = 13;
appStorage.records = [1,2,3,4];
```

You can define your AppStorage object as a `global` object to be used anywhere within your app.

```js
global.appStorage = appStorage;
```

# License

This project is under the MIT license.
