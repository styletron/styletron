// // @flow
//
// import injectStylePrefixed from "../inject-style-prefixed";
// import test from "tape";
//
// test("test injection prefixed", function(t) {
//   const decls = [];
//   const spy = {
//     addBlock: function(decl) {
//       decls.push(decl);
//       return decls.length;
//     }
//   };
//   const classString = injectStylePrefixed(spy, {
//     display: "flex",
//     height: ["min-content", "100%"],
//     transition: "height 1s",
//     ":hover": {
//       backgroundColor: "linear-gradient(to bottom, red, green)"
//     },
//     "@media (max-width: 500px)": {
//       flexGrow: 1
//     }
//   });
//   t.equal(classString, "1 2 3 4 5");
//   t.deepEqual(decls, [
//     {
//       block:
//         "display:-webkit-box;display:-moz-box;display:-ms-flexbox;display:-webkit-flex;display:flex",
//       media: "",
//       pseudo: ""
//     },
//     {
//       block:
//         "height:-webkit-min-content;height:-moz-min-content;height:min-content;height:100%",
//       media: "",
//       pseudo: ""
//     },
//     {
//       block:
//         "transition:height 1s;-webkit-transition:height 1s;-moz-transition:height 1s",
//       media: "",
//       pseudo: ""
//     },
//     {
//       block:
//         "background-color:-webkit-linear-gradient(to bottom, red, green);background-color:-moz-linear-gradient(to bottom, red, green);background-color:linear-gradient(to bottom, red, green)",
//       media: "",
//       pseudo: ":hover"
//     },
//     {
//       block: "-webkit-flex-grow:1;flex-grow:1",
//       media: "(max-width: 500px)",
//       pseudo: ""
//     }
//   ]);
//   t.end();
// });
//
// test("test prefixed cache", function(t) {
//   const decls = [];
//   const spy = {
//     addBlock: function(decl) {
//       decls.push(decl);
//       return decls.length;
//     }
//   };
//   const cache = {flexGrow: {"1": "color:red"}};
//   injectStylePrefixed(
//     spy,
//     {
//       display: "flex",
//       flexGrow: 1
//     },
//     "",
//     "",
//     cache
//   );
//   t.deepEqual(cache, {
//     display: {
//       flex:
//         "display:-webkit-box;display:-moz-box;display:-ms-flexbox;display:-webkit-flex;display:flex"
//     },
//     flexGrow: {"1": "color:red"}
//   });
//   t.deepEqual(decls, [
//     {
//       block:
//         "display:-webkit-box;display:-moz-box;display:-ms-flexbox;display:-webkit-flex;display:flex",
//       media: "",
//       pseudo: ""
//     },
//     {block: "color:red", media: "", pseudo: ""}
//   ]);
//   t.end();
// });
