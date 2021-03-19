/**
 * Easy State Management
 */
class Store {
  /**
   * Create new store
   * @param {Object} Obj configure the store
   * @param {String} Obj.name name of the store.
   * @param {Boolean} Obj.saveState save the state in localStorage.
   * @param {Object} Obj.state get the current state from store.
   * @param {Function} Obj.watch watch the state change. Use `this` keyword inside the function to see old and new states.
   * @param {Object} Obj.methods define object of methods to make custom getters and setters.
   */
  constructor(Obj) {
    this.saveState = Obj.saveState;
    this.name = Obj.name;
    this.watch = Obj.watch;
    this.methods = Obj.methods.call(this);

    // if the store is not created yet create one and set default state
    if (this.state === null) {
      this.state = Obj.state ? Obj.state : null;
    }
  }

  /**
   * Get the state
   */
  get state() {
    if (this.saveState) {
      return JSON.parse(window.localStorage.getItem(this.name));
    } else {
      return JSON.parse(window.sessionStorage.getItem(this.name));
    }
  }

  /**
   * Set or mutate the state
   * @param {Object} state the state as an object
   */
  set state(state) {
    if (typeof state !== "object") {
      console.error("State must be an object.");
    } else {
      let newObj = state;
      let oldState = this.state;
      let newState = { ...oldState, ...newObj };
      if (this.saveState) {
        window.localStorage.setItem(this.name, JSON.stringify(newState));
      } else {
        window.sessionStorage.setItem(this.name, JSON.stringify(newState));
      }
      let data = {
        oldState: oldState,
        newState: newState,
        newData: newObj,
      };
      this.watch.call(data);
    }
  }

  /**
   * Get the state
   * @returns the state
   */
  getState() {
    return this.state;
  }

  /**
   * Set or mutate the state
   * @param {Object} obj new data as an object
   */
  setState(obj) {
    return (this.state = obj);
  }
}

let store = new Store({
  name: "new-store",
  saveState: true,
  state: {
    name: "User",
  },
  methods() {
    return {
      getText: () => {
        return this.state.text;
      },
      setText: (e) => {
        return this.setState({ text: e });
      },
    };
  },
  watch() {
    console.log(this.newData.text);
  },
});

document.querySelector("input").value = store.methods.getText();
document.querySelector("input").addEventListener("input", function () {
  store.methods.setText(this.value);
});
