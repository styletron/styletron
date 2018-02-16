// // @flow strict
//
// import test from "tape";
// import Enzyme from "enzyme";
// import Adapter from "enzyme-adapter-react-16";
// import * as React from "react";
//
// import {styled, withWrapper, withStyle, Provider} from "../index.js";
//
// Enzyme.configure({adapter: new Adapter()});
//
// test("Provider", t => {
//   t.plan(1);
//   const styletron = {};
//
//   const MockComponent = (props, context) => {
//     t.equal(
//       context.styletron,
//       styletron,
//       "styletron instance override provided"
//     );
//     return <div />;
//   };
//   MockComponent.contextTypes = {styletron: () => {}};
//
//   Enzyme.mount(
//     <Provider value={styletron}>
//       <MockComponent />
//     </Provider>
//   );
// });
//
// test("$as works", t => {
//   t.plan(2);
//   const Widget = styled("div", {});
//   const MockComponent = props => {
//     t.equal(props.className, "foo", "styled class is passed");
//     return <div />;
//   };
//   Enzyme.mount(<Widget $as={MockComponent} />, {
//     context: {
//       styletron: {
//         renderStyle: () => {
//           return "foo";
//         }
//       }
//     }
//   });
//   const wrapper = Enzyme.mount(<Widget $as="span" />, {
//     context: {
//       styletron: {
//         renderStyle: () => {}
//       }
//     }
//   });
//   t.equal(wrapper.find("span").length, 1, "span rendered");
//   t.end();
// });
//
// test("$-prefixed props not passed", t => {
//   t.plan(1);
//
//   class InnerComponent extends React.Component<{className: string}> {
//     render() {
//       t.deepEqual(
//         this.props,
//         {
//           className: "styleclass",
//           "data-bar": "bar"
//         },
//         "props match expected"
//       );
//       return <button>InnerComponent</button>;
//     }
//   }
//
//   const Widget = styled(InnerComponent, {color: "red"});
//
//   Enzyme.mount(<Widget $foo="foo" $baz="baz" data-bar="bar" />, {
//     context: {
//       styletron: {
//         renderStyle: () => {
//           return "styleclass";
//         }
//       }
//     }
//   });
// });
//
// test("$ref", t => {
//   t.plan(1);
//
//   const Widget = styled("button", {color: "red"});
//   class TestComponent extends React.Component<{}> {
//     widgetInner: ?HTMLButtonElement;
//     componentDidMount() {
//       t.ok(this.widgetInner instanceof HTMLButtonElement, "is button");
//     }
//
//     render() {
//       return (
//         <Provider value={{renderStyle: () => {}}}>
//           <Widget
//             $ref={c => {
//               this.widgetInner = c;
//             }}
//           />
//         </Provider>
//       );
//     }
//   }
//   Enzyme.mount(<TestComponent />);
// });
//
// test("withWrapper", t => {
//   t.plan(6);
//   const Widget = styled("button", {color: "red"});
//   const WrappedWidget = withWrapper(Widget, StyledElement => props => {
//     t.deepEqual(props, {foo: "bar"}, "props passed");
//     return (
//       <section>
//         <StyledElement {...props} />
//       </section>
//     );
//   });
//   const wrapper1 = Enzyme.mount(
//     <Provider
//       value={{
//         renderStyle: style => {
//           t.deepEqual(style, {color: "red"});
//         }
//       }}
//     >
//       <WrappedWidget foo="bar" />
//     </Provider>
//   );
//   t.equal(wrapper1.find("section").length, 1, "wrapper rendered");
//
//   const DeluxeWrappedWidget = withStyle(WrappedWidget, {color: "blue"});
//   const wrapper2 = Enzyme.mount(
//     <Provider
//       value={{
//         renderStyle: style => {
//           t.deepEqual(
//             style,
//             {color: "blue"},
//             "style composition works after wrapping"
//           );
//         }
//       }}
//     >
//       <DeluxeWrappedWidget foo="bar" />
//     </Provider>
//   );
//   t.equal(
//     wrapper2.find("section").length,
//     1,
//     "wrapper rendered after composition"
//   );
//
//   t.end();
// });
//
// // test("styled merges class name prop", t => {
// //   const Widget = styled("div", {color: "red"});
// //   const styletron = new Styletron();
// //   const output = ReactTestUtils.renderIntoDocument(
// //     React.createElement(
// //       Provider,
// //       {styletron},
// //       React.createElement(Widget, {className: "foo"})
// //     )
// //   );
// //   const div = ReactTestUtils.findRenderedDOMComponentWithTag(output, "div");
// //   t.equal(div.className, "foo a", "matches expected classes");
// //   t.end();
// // });
