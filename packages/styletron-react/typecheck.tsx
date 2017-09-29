import * as React from 'react';
import StyletronClient from 'styletron-client';
import StyletronServer from 'styletron-server';
import {
  styled,
  StyledHTMLElement,
  StyledSVGElement,
  StyledStatelessComponent,
  StyledComponentClass,
  StyletronProvider,
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


type PropType = {
  prop: boolean;
};


const PrettyHtmlElement: StyledHTMLElement<PropType, HTMLDivElement> = styled('div', (props: PropType) => ({}));

<PrettyHtmlElement prop={false} className="" innerRef={(el: HTMLDivElement) => {}} />

const ComposedHtmlElement: StyledHTMLElement<PropType, HTMLDivElement> = styled(PrettyHtmlElement, {});

<ComposedHtmlElement prop={false} className="" innerRef={(el: HTMLDivElement) => {}} />


const PrettySvgElement: StyledSVGElement<PropType, SVGElement> = styled('svg', (props: PropType) => ({}));

<PrettySvgElement prop={false} className="" innerRef={(el: SVGElement) => {}} />

const ComposedSvgElement: StyledSVGElement<PropType, SVGElement> = styled(PrettySvgElement, {});

<ComposedSvgElement prop={false} className="" innerRef={(el: SVGElement) => {}} />


function StatelessComponent(props: PropType) {
  return <div />;
}

const PrettyStatelessComponentWithStyleFunc: StyledStatelessComponent<PropType> = styled(StatelessComponent, (props: PropType) => ({}));

<PrettyStatelessComponentWithStyleFunc prop={false} />

const PrettyStatelessComponentWithStyleObject: StyledStatelessComponent<PropType> = styled(StatelessComponent, {});

<PrettyStatelessComponentWithStyleObject prop={false} />

const ComposedStatelessComponent: StyledStatelessComponent<PropType> = styled(PrettyStatelessComponentWithStyleFunc, {});

<ComposedStatelessComponent prop={false} />


class StatefullComponent extends React.Component<PropType, {}> {
  render() {
    return <div />;
  }
}

const PrettyStatefullComponentWithStyleFunc: StyledComponentClass<PropType, StatefullComponent> = styled(StatefullComponent, (props: PropType) => ({}));

<PrettyStatefullComponentWithStyleFunc prop={false} innerRef={(c: StatefullComponent) => {}} />

const PrettyStatefullComponentWithStyleObject: StyledComponentClass<PropType, StatefullComponent> = styled(StatefullComponent, {});

<PrettyStatefullComponentWithStyleObject prop={false} innerRef={(c: StatefullComponent) => {}} />

const ComposedStatefullComponent: StyledComponentClass<PropType, StatefullComponent> = styled(PrettyStatefullComponentWithStyleFunc, {});

<ComposedStatefullComponent prop={false} innerRef={(c: StatefullComponent) => {}} />
