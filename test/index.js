import Histate from "../dist/histate.min.js";

let store = new Histate({
  name: "new-store",
  saveState: true,
  state: {
    text: "Histate is Awesome!",
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
    document.querySelector(
      "#output"
    ).innerHTML = `/* State changed */ \n${JSON.stringify(this, null, 2)}`;
  },
});

document.querySelector("#text").value = store.methods.getText();
document.querySelector("#output").innerHTML = `/* State */  \n${JSON.stringify(
  store.state,
  null,
  2
)}`;

document.querySelector("#text").addEventListener("input", function () {
  store.methods.setText(this.value);
});
