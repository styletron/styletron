import * as React from 'react';
import StyletronClient from 'styletron-client';
import StyletronServer from 'styletron-server';
import {
  core,
  styled,
  StyletronProvider,
  StyleProp,
} from './';

const provider1 = (
  <StyletronProvider styletron={new StyletronClient}>
    <div />
  </StyletronProvider>
);

const provider2 = (
  <StyletronProvider styletron={new StyletronServer}>
    <div />
  </StyletronProvider>
);

type StylePropType1 = StyleProp<{
  prop: boolean;
}>;

type PropType1 = {
  prop1: boolean;
};

type PropType2 = {
  prop2: number;
};

function StatelessComponent(props: PropType1) {
  return <div />;
}

class StatefullComponent extends React.Component<PropType1, React.ComponentState> {
  render() {
    return <div />;
  }
}

const WithStyleObject = styled('button', {
  color: 'green',
  ':hover': {
    color: 'blue',
  },
  '@media print': {
    color: 'silver',
  }
});

<WithStyleObject type="" innerRef={(el: HTMLButtonElement) => {}} />

const StyledHtmlElement = styled('button', (props: StylePropType1) => ({}));

<StyledHtmlElement type="" styleProps={{prop: true}} innerRef={(el: HTMLButtonElement) => {}} />;

const ComposedHtmlElement = styled(StyledHtmlElement, props => ({}));

<ComposedHtmlElement type="" styleProps={{prop: true}} innerRef={(el: HTMLButtonElement) => {}} />;


const StyledSvgElement = styled('svg', (props: StylePropType1) => ({}));

<StyledSvgElement fill="" styleProps={{prop: true}} innerRef={(el: SVGElement) => {}} />;

const ComposedSvgElement = styled(StyledSvgElement, props => ({}));

<ComposedSvgElement fill="" styleProps={{prop: true}} innerRef={(el: SVGElement) => {}} />;


const StyledStatelessComponentWithStyleFunc = styled(StatelessComponent, (props: PropType1) => ({}));

<StyledStatelessComponentWithStyleFunc prop1={false} />;

const StyledStatelessComponentWithStyleObject = styled(StatelessComponent, {});

<StyledStatelessComponentWithStyleObject prop1={false} />;

const ComposedStatelessComponent = styled(StyledStatelessComponentWithStyleFunc, {});

<ComposedStatelessComponent prop1={false} />;


const StyledStatefullComponentWithStyleFunc = styled(StatefullComponent, (props: PropType1) => ({}));

<StyledStatefullComponentWithStyleFunc prop1={false} innerRef={(c: StatefullComponent) => {}} />;

const StyledStatefullComponentWithStyleObject = styled(StatefullComponent, {});

<StyledStatefullComponentWithStyleObject prop1={false} innerRef={(c: StatefullComponent) => {}} />;

const ComposedStatefullComponent = styled(StyledStatefullComponentWithStyleFunc, {});

<ComposedStatefullComponent prop1={false} innerRef={(c: StatefullComponent) => {}} />;


const PrettyHTMLElement = core(
  'button',
  (props: PropType1) => ({}),
  (styletron, styleResult, ownProps: PropType1) => ({...ownProps, className: ''})
);

<PrettyHTMLElement type="" prop1={false} innerRef={(el: HTMLButtonElement) => {}} />;

const PrettySVGElement = core(
  'svg',
  (props: PropType1) => ({}),
  (styletron, styleResult, ownProps: PropType1) => ({...ownProps, className: ''})
);

<PrettySVGElement type="" prop1={false} innerRef={(el: SVGElement) => {}} />;

const PrettyStatelessComponentWithStyleFunc = core(
  StatelessComponent,
  (props: PropType1) => ({}),
  (styletron, styleResult, ownProps: PropType1) => ({...ownProps, className: ''})
);

<PrettyStatelessComponentWithStyleFunc prop1={false} />;

const PrettyStatelessComponentWithStyleObject = core(
  StatelessComponent,
  {},
  (styletron, styleResult, ownProps: PropType1) => ({...ownProps, className: ''})
);

<PrettyStatelessComponentWithStyleObject prop1={false} />;

const PrettyStatefullComponentWithStyleFunc = core(
  StatefullComponent,
  (props: PropType1) => ({}),
  (styletron, styleResult, ownProps: PropType1) => ({...ownProps, className: ''})
);

<PrettyStatefullComponentWithStyleFunc prop1={false} />;

const PrettyStatefullComponentWithStyleObject = core(
  StatefullComponent,
  {},
  (styletron, styleResult, ownProps: PropType1) => ({...ownProps, className: ''})
);

<PrettyStatefullComponentWithStyleObject prop1={false} />;


const EmittingPropStatelessComponentWithStyleFunc = core(
  StatelessComponent,
  (props: PropType1 & PropType2) => ({}),
  (styletron, styleResult, {prop2, ...restProps}: PropType1 & PropType2) => ({...restProps, className: ''})
);

<EmittingPropStatelessComponentWithStyleFunc prop1={false} prop2={0} />;

const EmittingPropStatelessComponentWithStyleObject = core(
  StatelessComponent,
  {},
  (styletron, styleResult, {prop2, ...restProps}: PropType1 & PropType2) => ({...restProps, className: ''})
);

<EmittingPropStatelessComponentWithStyleObject prop1={false} prop2={0} />;

const EmittingPropStatefullComponentWithStyleFunc = core(
  StatefullComponent,
  (props: PropType1 & PropType2) => ({}),
  (styletron, styleResult, {prop2, ...restProps}: PropType1 & PropType2) => ({...restProps, className: ''})
);

<EmittingPropStatefullComponentWithStyleFunc prop1={false} prop2={0} />;

const EmittingPropStatefullComponentWithStyleObject = core(
  StatefullComponent,
  {},
  (styletron, styleResult, {prop2, ...restProps}: PropType1 & PropType2) => ({...restProps, className: ''})
);

<EmittingPropStatefullComponentWithStyleObject prop1={false} prop2={0} />;
