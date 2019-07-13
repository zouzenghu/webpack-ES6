require("./test.scss");
const getElement = require("./element.js");
if (module.hot) {
  module.hot.accept();
}
document.addEventListener("click", () => {
  getElement().then(el => {
    document.body.appendChild(el[0]);
  });
});
console.log(this);
