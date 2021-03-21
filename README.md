# Histate: History + State Management

<!-- [![npm version](https://img.shields.io/npm/v/@broadbrander/ajaj.svg?style=flat-square)](https://www.npmjs.org/package/@broadbrander/ajaj)
[![](https://data.jsdelivr.com/v1/package/npm/@broadbrander/ajaj/badge)](https://www.jsdelivr.com/package/npm/@broadbrander/ajaj)
[![build status](https://img.shields.io/travis/broadbrander/ajaj/master.svg?style=flat-square)](https://travis-ci.org/broadbrander/ajaj)
[![npm downloads](https://img.shields.io/npm/dm/@broadbrander/ajaj.svg?style=flat-square)](http://npm-stat.com/charts.html?package=@broadbrander/ajaj) -->

Histate is a small easy to use state management library that can be used in any JavaScript project to manage state across multiple tabs and to remember the the last state of the app.

## Installation

#### Using npm:

Install the package from npm.

```sh
$ npm install @opuu/histate
```

Import it in your project.

```js
import ajaj from "@opuu/histate";
```

<!-- #### Using jsDelivr CDN:

Add this script tag in your html document.

```html
<script src="https://cdn.jsdelivr.net/npm/@broadbrander/ajaj@0.2.1/dist/ajaj.min.js"></script>
```

#### Using unpkg CDN:

Add this script tag in your html document.

```html
<script src="https://unpkg.com/@broadbrander/ajaj@0.2.1/dist/ajaj.min.js"></script>
``` -->

## Usage

Using Histate is easy!

### Create new store

```js
let store = new Histate({
  // Name of the store
  name: "forms",

  // If saveState is true states will be stored for future sessions. if false it will be deleted when session expires
  saveState: true,

  // Initial state (optional)
  state: {
    firstname: "",
    lastname: "",
    username: "",
    email: "",
  },

  // Methods to play with state (optional)
  methods() {
    return {
      getName: () => {
        return this.state.firstname + " " + this.state.firstname;
      },
      setUsername: (un) => {
        return this.setState({ username: un });
      },
      // define more methods
    };
  },

  // Watch for state change (optional)
  watch() {
    console.log(this);

    // output:

    // {
    //     oldState: {
    //         firstname: "",
    //         lastname: "",
    //         username: "",
    //         email: "",
    //     },
    //     newState: {
    //         firstname: "",
    //         lastname: "",
    //         username: "Opuu",
    //         email: "",
    //     },
    //     newData: {
    //         username: "Opuu"
    //     }
    // }
  },
});
```

### Set State

```js
store.setState({ username: "Opuu" });
```

### Get State

```js
store.getState();
// or
store.state.username;
```

### Calling Methods

```js
store.methods.setUsername("Opuu");
```

## License

MIT
