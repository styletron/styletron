import {styled, useStyletron} from "styletron-react";
import * as React from "react";

const Title = styled("h1", {
  color: "red",
  fontSize: "82px",
});

const SubTitle = styled("h2", ({$size}) => ({
  color: "blue",
  fontSize: `${$size}px`,
}));

export default () => {
  const [show, setShow] = React.useState(false);
  const [css] = useStyletron();
  return (
    <div>
      <Title>Title</Title>
      <SubTitle $size={50}>Subtitle</SubTitle>
      <button onClick={() => setShow(!show)}>
        {show ? "Hide" : "Show"} tiny title
      </button>
      {show && <h3 className={css({color: "hotpink"})}>Tiny title</h3>}
    </div>
  );
};
