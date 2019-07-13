function getCompoent() {
  return import(/*webpackChunkName:"jquery"*/ "jquery").then(
    ({ default: $ }) => {
      return $("<div></div>").html("Hello World");
    }
  );
}
module.exports = getCompoent;
