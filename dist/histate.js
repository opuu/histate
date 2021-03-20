function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

/**
 * Easy State Management
 */
var Histate = /*#__PURE__*/function () {
  /**
   * Create new store
   * @param {Object} Obj configure the store
   * @param {String} Obj.name name of the store.
   * @param {Boolean} Obj.saveState save the state in localStorage.
   * @param {Object} Obj.state get the current state from store.
   * @param {Function} Obj.watch watch the state change. Use `this` keyword inside the function to see old and new states.
   * @param {Object} Obj.methods define object of methods to make custom getters and setters.
   */
  function Histate(Obj) {
    _classCallCheck(this, Histate);

    this.saveState = Obj.saveState;
    this.name = Obj.name;
    this.watch = Obj.watch;
    this.methods = Obj.methods.call(this); // if the store is not created yet create one and set default state

    if (this.state === null) {
      this.state = Obj.state ? Obj.state : null;
    }
  }
  /**
   * Get the state
   */


  _createClass(Histate, [{
    key: "state",
    get: function get() {
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
    ,
    set: function set(state) {
      if (_typeof(state) !== "object") {
        console.error("State must be an object.");
      } else {
        var newObj = state;
        var oldState = this.state;

        var newState = _objectSpread(_objectSpread({}, oldState), newObj);

        if (this.saveState) {
          window.localStorage.setItem(this.name, JSON.stringify(newState));
        } else {
          window.sessionStorage.setItem(this.name, JSON.stringify(newState));
        }

        var data = {
          oldState: oldState,
          newState: newState,
          newData: newObj
        };
        this.watch.call(data);
      }
    }
    /**
     * Get the state
     * @returns the state
     */

  }, {
    key: "getState",
    value: function getState() {
      return this.state;
    }
    /**
     * Set or mutate the state
     * @param {Object} obj new data as an object
     */

  }, {
    key: "setState",
    value: function setState(obj) {
      return this.state = obj;
    }
  }]);

  return Histate;
}();

export { Histate as default };