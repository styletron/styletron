// @flow

// import Styletron from "../core.js";
// import test from "tape";

// class StyletronTest extends Styletron {
//   constructor(...args) {
//     super(...args);
//   }
//   addBlock(...args) {
//     return this.styleCache.addBlock(...args);
//   }
//   getCache() {
//     return this.styleCache.cache;
//   }
//   getCount() {
//     return this.styleCache.classGenerator.uniqueCount;
//   }
//   getBlock(...args) {
//     return this.styleCache.getBlock(...args);
//   }
// }

// test("test raw injection", t => {
//   const instance = new StyletronTest();
//   t.equal(instance.getCount(), 0, "starts with 0 declarations");
//   const block1 = "color:red";
//   const decl1 = {block: block1};
//   instance.addBlock(decl1);
//   t.equal(instance.getCache()[block1], "a");
//   t.equal(instance.getBlock(decl1), "a");
//   t.equal(instance.getCount(), 1, "unique count incremented");
//   instance.addBlock(decl1);
//   t.equal(
//     instance.getCount(),
//     1,
//     "unique count not incremented after repeat injection"
//   );
//   const block2 = "color:green";
//   instance.addBlock({block: block2});
//   t.equal(instance.getCache()[block2], "b");
//   instance.addBlock({
//     block: block2,
//     media: "(max-width: 800px)"
//   });
//   t.equal(instance.getCache().media["(max-width: 800px)"][block2], "c");
//   instance.addBlock({
//     block: block2,
//     media: "(max-width: 800px)",
//     pseudo: ":hover"
//   });
//   t.equal(
//     instance.getCache().media["(max-width: 800px)"].pseudo[":hover"][block2],
//     "d"
//   );
//   instance.addBlock({
//     block: block2,
//     pseudo: ":hover"
//   });
//   t.equal(instance.getCache().pseudo[":hover"][block2], "e");
//   t.equal(instance.getCount(), 5, "ends with 4 unique declarations");
//   t.end();
// });

// test("test constructor", t => {
//   const instance = new Styletron();
//   t.equal(
//     instance.styleCache.classGenerator.prefix,
//     "",
//     "prefix defaults to empty string"
//   );
//   t.end();
// });

// test("test injection with prefix", t => {
//   const instance = new StyletronTest({classPrefix: "qq"});
//   t.equal(
//     instance.styleCache.classGenerator.prefix,
//     "qq",
//     "prefix is set on instance"
//   );
//   t.equal(instance.getCount(), 0, "starts with 0 declarations");
//   const block1 = "color:red";
//   const decl1 = {block: block1};
//   instance.addBlock(decl1);
//   t.equal(instance.getCache()[block1], "qqa");
//   t.equal(instance.getBlock(decl1), "qqa");
//   t.equal(instance.getCount(), 1, "unique count incremented");
//   t.end();
// });
