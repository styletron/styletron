/* eslint-disable no-unused-vars */

import * as React from "react";
import {withStyle} from "styletron-react";

class Foo extends React.Component<{
  foo: "foo";
}> {}

/*
This causes a Flow error that can't be supressed. But it should cause an error.
*/

// const Bar = withStyle(Foo, (props: {bar: "bar"}) => ({
//   color: "red",
// }));
