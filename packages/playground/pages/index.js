import {styled} from "styletron-react";

const Title = styled("h1", {
  color: "red",
  fontSize: "82px",
});

const SubTitle = styled("h2", ({$size}) => ({
  color: "blue",
  fontSize: `${$size}px`,
}));

export default () => {
  return (
    <div>
      <Title>Title</Title>
      <SubTitle $size={50}>Subtitle</SubTitle>
    </div>
  );
};
