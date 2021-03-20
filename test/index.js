import Histate from "../dist/histate.js";

let store = new Histate({
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
document.querySelector(".output").innerHTML = store.methods.getText();

document.querySelector("input").addEventListener("input", function () {
  store.methods.setText(this.value);
  document.querySelector(".output").innerHTML = this.value;
});
