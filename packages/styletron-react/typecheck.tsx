import * as React from 'react';
import {
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
