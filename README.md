# Histate: History + State Management

Histate is a small easy to use state management library that can be used in any JavaScript project to manage state across multiple tabs and to remember the the last state of the app.

## Installation

#### Using npm:

Install the package from npm.

```sh
$ npm install @opuu/histate
```

Import it in your project.

```js
import Histate from "@opuu/histate";
```

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
