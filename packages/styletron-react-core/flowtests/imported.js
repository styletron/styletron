// @flow

import * as React from "react";

import {SomeComponent} from "./custom-styled.js";
import {AnotherComponent} from "./components.js";

// Ensure components still work when imported in another file

// $FlowFixMe
<SomeComponent />;

<SomeComponent $bar={123} />;

// $FlowFixMe
<AnotherComponent />;

<SomeComponent $bar={123} />;
