import * as React from 'react';
import {
  core,
  styled,
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


const PrettyHtmlElement = styled('button', (props: PropType1) => ({}));

<PrettyHtmlElement type="" prop1={false} innerRef={(el: HTMLButtonElement) => {}} />

const ComposedHtmlElement = styled(PrettyHtmlElement, (props: PropType2) => ({}));

<ComposedHtmlElement type="" prop1={false} prop2={0} innerRef={(el: HTMLButtonElement) => {}} />


const PrettySvgElement = styled('svg', (props: PropType1) => ({}));

<PrettySvgElement fill="" prop1={false} innerRef={(el: SVGElement) => {}} />

const ComposedSvgElement = styled(PrettySvgElement, (props: PropType2) => ({}));

<ComposedSvgElement fill="" prop1={false} prop2={0} innerRef={(el: SVGElement) => {}} />


const PrettyStatelessComponentWithStyleFunc = styled(StatelessComponent, (props: PropType1) => ({}));

<PrettyStatelessComponentWithStyleFunc prop1={false} />

const PrettyStatelessComponentWithStyleObject = styled(StatelessComponent, {});

<PrettyStatelessComponentWithStyleObject prop1={false} />

const ComposedStatelessComponent = styled(PrettyStatelessComponentWithStyleFunc, {});

<ComposedStatelessComponent prop1={false} />


const PrettyStatefullComponentWithStyleFunc = styled(StatefullComponent, (props: PropType1) => ({}));

<PrettyStatefullComponentWithStyleFunc prop1={false} innerRef={(c: StatefullComponent) => {}} />

const PrettyStatefullComponentWithStyleObject = styled(StatefullComponent, {});

<PrettyStatefullComponentWithStyleObject prop1={false} innerRef={(c: StatefullComponent) => {}} />

const ComposedStatefullComponent = styled(PrettyStatefullComponentWithStyleFunc, {});

<ComposedStatefullComponent prop1={false} innerRef={(c: StatefullComponent) => {}} />


const CustomPrettyHTMLElement = core(
  'button',
  (props: PropType1) => ({}),
  (styletron, styleResult, ownProps) => ({className: ''})
);

<CustomPrettyHTMLElement type="" prop1={false} innerRef={(el: HTMLButtonElement) => {}} />

const MergedPrettyHTMLElement = core(
  'button',
  (props: PropType2) => ({}),
  (styletron, styleResult, ownProps) => ({className: ''}),
  (styleProps, ownProps: PropType2) => ({prop1: false})
);

<MergedPrettyHTMLElement type="" prop2={0} innerRef={(el: HTMLButtonElement) => {}} />


const CustomPrettySVGElement = core(
  'svg',
  (props: PropType1) => ({}),
  (styletron, styleResult, ownProps) => ({className: ''})
);

<CustomPrettySVGElement type="" prop1={false} innerRef={(el: SVGElement) => {}} />

const MergedPrettySVGElement = core(
  'svg',
  (props: PropType2) => ({}),
  (styletron, styleResult, ownProps) => ({className: ''}),
  (props: PropType2) => ({prop2: false})
);

<MergedPrettySVGElement type="" prop2={0} innerRef={(el: SVGElement) => {}} />


const CustomPrettyStatelessComponentWithStyleFunc = core(
  StatelessComponent,
  (props: PropType1) => ({}),
  (styletron, styleResult, ownProps) => ({className: ''})
);

<CustomPrettyStatelessComponentWithStyleFunc prop1={false} />

const CustomPrettyStatelessComponentWithStyleObject = core(
  StatelessComponent,
  {},
  (styletron, styleResult, ownProps) => ({className: ''})
);

<CustomPrettyStatelessComponentWithStyleObject prop1={false} />

const MergedPrettyStatelessComponentWithStyleFunc = core(
  (props: PropType1) => <StatelessComponent {...props} />,
  (props: PropType2) => ({}),
  (styletron, styleResult, ownProps) => ({className: ''}),
  (styleProps, ownProps: PropType2) => ({prop1: false})
);

<MergedPrettyStatelessComponentWithStyleFunc prop2={0} />

const MergedPrettyStatelessComponentWithStyleObject = core(
  (props: PropType1) => <StatelessComponent {...props} />,
  {},
  (styletron, styleResult, ownProps) => ({className: ''}),
  (styleProps, ownProps: PropType2) => ({prop1: false})
);

<MergedPrettyStatelessComponentWithStyleObject prop2={0} />


const CustomPrettyStatefullComponentWithStyleFunc = core(
  StatefullComponent,
  (props: PropType1) => ({}),
  (styletron, styleResult, ownProps) => ({className: ''})
);

<CustomPrettyStatefullComponentWithStyleFunc prop1={false} />

const CustomPrettyStatefullComponentWithStyleObject = core(
  StatefullComponent,
  {},
  (styletron, styleResult, ownProps) => ({className: ''})
);

<CustomPrettyStatefullComponentWithStyleObject prop1={false} />

const MergedPrettyStatefullComponentWithStyleFunc = core(
  class extends React.Component<PropType1, void> {
    render() {
      return <StatefullComponent {...this.props} />;
    }
  },
  (props: PropType2) => ({}),
  (styletron, styleResult, ownProps) => ({className: ''}),
  (styleProps, ownProps: PropType2) => ({prop1: false})
);

<MergedPrettyStatefullComponentWithStyleFunc prop2={0} />

const MergedPrettyStatefullComponentWithStyleObject = core(
  class extends React.Component<PropType1, void> {
    render() {
      return <StatefullComponent {...this.props} />;
    }
  },
  {},
  (styletron, styleResult, ownProps) => ({className: ''}),
  (styleProps, ownProps: PropType2) => ({prop1: false})
);

<MergedPrettyStatefullComponentWithStyleObject prop2={0} />
