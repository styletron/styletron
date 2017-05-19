import * as React from 'react';
import {
  core,
  styled,
  withStyle,
  ClassesProp,
} from './';


type PropType1 = {
  prop1: boolean;
};

type PropType2 = {
  prop2: number;
};

function StatelessComponent(props: PropType1) {
  return <div />;
}

class StatefullComponent extends React.Component<PropType1, void> {
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


const StyledHtmlElement = styled('button', (props: PropType1) => ({}));

<StyledHtmlElement type="" prop1={false} innerRef={(el: HTMLButtonElement) => {}} />

const ComposedHtmlElement = styled(StyledHtmlElement, (props: PropType2) => ({}));

<ComposedHtmlElement type="" prop1={false} prop2={0} innerRef={(el: HTMLButtonElement) => {}} />


const StyledSvgElement = styled('svg', (props: PropType1) => ({}));

<StyledSvgElement fill="" prop1={false} innerRef={(el: SVGElement) => {}} />

const ComposedSvgElement = styled(StyledSvgElement, (props: PropType2) => ({}));

<ComposedSvgElement fill="" prop1={false} prop2={0} innerRef={(el: SVGElement) => {}} />


const StyledStatelessComponentWithStyleFunc = styled(StatelessComponent, (props: PropType1) => ({}));

<StyledStatelessComponentWithStyleFunc prop1={false} />

const StyledStatelessComponentWithStyleObject = styled(StatelessComponent, {});

<StyledStatelessComponentWithStyleObject prop1={false} />

const ComposedStatelessComponent = styled(StyledStatelessComponentWithStyleFunc, {});

<ComposedStatelessComponent prop1={false} />


const StyledStatefullComponentWithStyleFunc = styled(StatefullComponent, (props: PropType1) => ({}));

<StyledStatefullComponentWithStyleFunc prop1={false} innerRef={(c: StatefullComponent) => {}} />

const StyledStatefullComponentWithStyleObject = styled(StatefullComponent, {});

<StyledStatefullComponentWithStyleObject prop1={false} innerRef={(c: StatefullComponent) => {}} />

const ComposedStatefullComponent = styled(StyledStatefullComponentWithStyleFunc, {});

<ComposedStatefullComponent prop1={false} innerRef={(c: StatefullComponent) => {}} />


const withStyleObject = {
  a: {},
  b: {},
};

type WithStyleObjectType = typeof withStyleObject;

function StatelessWithStyle(props: PropType1 & ClassesProp<WithStyleObjectType>) {
  return (
    <div>
      <span className={props.classes.a} />
      <span className={props.classes.b} />
    </div>
  );
}

const MultiPrettyStatelessComponentWithStyleFunc = withStyle((props: PropType1) => withStyleObject)(StatelessWithStyle);

<MultiPrettyStatelessComponentWithStyleFunc prop1={false} />

const MultiPrettyStatelessComponentWithStyleObject = withStyle(withStyleObject)(StatelessWithStyle);

<MultiPrettyStatelessComponentWithStyleObject prop1={false} />

class StatefullWithStyle extends React.Component<PropType1 & ClassesProp<WithStyleObjectType>, void> {
  render() {
    return (
      <div>
        <span className={this.props.classes.a} />
        <span className={this.props.classes.b} />
      </div>
    );
  }
}

const MultiPrettyStatefullComponentWithStyleFunc = withStyle((props: PropType1) => withStyleObject)(StatefullWithStyle);

<MultiPrettyStatefullComponentWithStyleFunc prop1={false} innerRef={(c: StatefullWithStyle) => {}} />

const MultiPrettyStatefullWithStyleObject = withStyle(withStyleObject)(StatefullWithStyle);

<MultiPrettyStatefullWithStyleObject prop1={false} innerRef={(c: StatefullWithStyle) => {}} />


const PrettyHTMLElement = core(
  'button',
  (props: PropType1) => ({}),
  (styletron, styleResult, ownProps: PropType1) => ({...ownProps, className: ''})
);

<PrettyHTMLElement type="" prop1={false} innerRef={(el: HTMLButtonElement) => {}} />

const PrettySVGElement = core(
  'svg',
  (props: PropType1) => ({}),
  (styletron, styleResult, ownProps: PropType1) => ({...ownProps, className: ''})
);

<PrettySVGElement type="" prop1={false} innerRef={(el: SVGElement) => {}} />

const PrettyStatelessComponentWithStyleFunc = core(
  StatelessComponent,
  (props: PropType1) => ({}),
  (styletron, styleResult, ownProps: PropType1) => ({...ownProps, className: ''})
);

<PrettyStatelessComponentWithStyleFunc prop1={false} />

const PrettyStatelessComponentWithStyleObject = core(
  StatelessComponent,
  {},
  (styletron, styleResult, ownProps: PropType1) => ({...ownProps, className: ''})
);

<PrettyStatelessComponentWithStyleObject prop1={false} />

const PrettyStatefullComponentWithStyleFunc = core(
  StatefullComponent,
  (props: PropType1) => ({}),
  (styletron, styleResult, ownProps: PropType1) => ({...ownProps, className: ''})
);

<PrettyStatefullComponentWithStyleFunc prop1={false} />

const PrettyStatefullComponentWithStyleObject = core(
  StatefullComponent,
  {},
  (styletron, styleResult, ownProps: PropType1) => ({...ownProps, className: ''})
);

<PrettyStatefullComponentWithStyleObject prop1={false} />


const EmittingPropStatelessComponentWithStyleFunc = core(
  StatelessComponent,
  (props: PropType1 & PropType2) => ({}),
  (styletron, styleResult, {prop2, ...restProps}: PropType1 & PropType2) => ({...restProps, className: ''})
);

<EmittingPropStatelessComponentWithStyleFunc prop1={false} prop2={0} />

const EmittingPropStatelessComponentWithStyleObject = core(
  StatelessComponent,
  {},
  (styletron, styleResult, {prop2, ...restProps}: PropType1 & PropType2) => ({...restProps, className: ''})
);

<EmittingPropStatelessComponentWithStyleObject prop1={false} prop2={0} />

const EmittingPropStatefullComponentWithStyleFunc = core(
  StatefullComponent,
  (props: PropType1 & PropType2) => ({}),
  (styletron, styleResult, {prop2, ...restProps}: PropType1 & PropType2) => ({...restProps, className: ''})
);

<EmittingPropStatefullComponentWithStyleFunc prop1={false} prop2={0} />

const EmittingPropStatefullComponentWithStyleObject = core(
  StatefullComponent,
  {},
  (styletron, styleResult, {prop2, ...restProps}: PropType1 & PropType2) => ({...restProps, className: ''})
);

<EmittingPropStatefullComponentWithStyleObject prop1={false} prop2={0} />
