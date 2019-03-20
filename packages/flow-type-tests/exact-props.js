// @flow

import * as React from "react";
import {styled} from "styletron-react";

const MyComponent: React.ComponentType<{|foo: 42|}> = _props => {
  return null;
};

const MyStyledComponent = styled(MyComponent, {color: "red"});

<MyStyledComponent foo={42} />;

// $FlowFixMe
<MyStyledComponent foo={42} invalidProp={42} />; // Should fail, not in props
