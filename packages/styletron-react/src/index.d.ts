declare global {
    interface Window {
        __STYLETRON_DEVTOOLS__: any;
    }
}
import * as React from "react";
import { driver, StandardEngine, StyleObject } from "styletron-standard";
import { Styletron, ReducerContainer, AssignmentCommutativeReducerContainer, StyledFn, WithStyleFn, WithTransformFn, WithWrapperFn, StyletronProps } from "./types";
import { DebugEngine } from "./dev-tool";
export { DebugEngine };
export { StyleObject };
export { StyletronProps };
declare type DevProviderProps = {
    children: React.ReactNode;
    value: StandardEngine;
    debugAfterHydration?: boolean;
    debug?: any;
};
declare class DevProvider extends React.Component<DevProviderProps, {
    hydrating: boolean;
}> {
    constructor(props: DevProviderProps);
    componentDidMount(): void;
    render(): JSX.Element;
}
export declare const Provider: typeof DevProvider | React.ProviderExoticComponent<React.ProviderProps<StandardEngine>>;
export declare function DevConsumer(props: {
    children: (c: any, b: any, a: any) => React.ReactNode;
}): JSX.Element;
declare type createStyledOpts = {
    getInitialStyle: () => StyleObject;
    driver: typeof driver;
    wrapper: (a: React.FC<any>) => React.ComponentType<any>;
};
export declare function useStyletron(): ((style: StyleObject) => string)[];
export declare function createStyled({ getInitialStyle, driver, wrapper, }: createStyledOpts): StyledFn;
export declare const styled: StyledFn;
export declare const withTransform: WithTransformFn;
export declare const withStyleDeep: WithStyleFn;
export declare const withStyle: WithStyleFn;
export declare const withWrapper: WithWrapperFn;
export declare function autoComposeShallow<Props>(styletron: Styletron, styleArg: StyleObject | ((a: Props) => StyleObject)): Styletron;
export declare function autoComposeDeep<Props>(styletron: Styletron, styleArg: StyleObject | ((a: Props) => StyleObject)): Styletron;
export declare function staticComposeShallow(styletron: Styletron, style: StyleObject): Styletron;
export declare function staticComposeDeep(styletron: Styletron, style: StyleObject): Styletron;
export declare function dynamicComposeShallow<Props>(styletron: Styletron, styleFn: (a: Props) => StyleObject): Styletron;
export declare function dynamicComposeDeep<Props>(styletron: Styletron, styleFn: (a: Props) => StyleObject): Styletron;
export declare function createShallowMergeReducer(style: StyleObject): AssignmentCommutativeReducerContainer;
export declare function createDeepMergeReducer(style: StyleObject): AssignmentCommutativeReducerContainer;
export declare function composeStatic(styletron: Styletron, reducerContainer: AssignmentCommutativeReducerContainer): Styletron;
export declare function composeDynamic<Props>(styletron: Styletron, reducer: (b: StyleObject, a: Props) => StyleObject): Styletron;
export declare function createStyledElementComponent(styletron: Styletron): any;
export declare function resolveStyle(getInitialStyle: (a: void) => StyleObject, reducers: Array<ReducerContainer>, props: any): StyleObject;
