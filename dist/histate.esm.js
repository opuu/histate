/**
 * Histate: History + State
 *
 * A simple state management system that works on multiple tabs and can remember last state on next visit.
 * @author opuu <info@broadbrander.com>
 * @package Histate
 * @version 1.0.0
 * @license MIT
 */

export default class Histate {
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
    this.watch = Obj.watch ? Obj.watch : false;
    this.methods = Obj.methods ? Obj.methods.call(this) : null;

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
    // if input is not object show error
    if (typeof state !== "object") {
      console.error("State must be an object.");
    } else {
      // new input
      let newObj = state;
      // old state
      let oldState = this.state;
      // new state
      let newState = { ...oldState, ...newObj };
      // mutate the store
      if (this.saveState) {
        window.localStorage.setItem(this.name, JSON.stringify(newState));
      } else {
        window.sessionStorage.setItem(this.name, JSON.stringify(newState));
      }
      // new value for `this` keyword in watcher
      let data = {
        oldState: oldState,
        newState: newState,
        newData: newObj,
      };
      // call the watcher on every single change (if defined)
      if (this.watch) {
        this.watch.call(data);
      }
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
