import * as React from "react";
import type {ComponentType} from "react";
import type {StyleObject} from "styletron-standard";

export type AssignmentCommutativeReducerContainer = {
  assignmentCommutative: true;
  reducer: (a: StyleObject) => StyleObject;
  style: StyleObject;
  factory: (a: StyleObject) => AssignmentCommutativeReducerContainer;
};

export type NonAssignmentCommutativeReducerContainer = {
  assignmentCommutative: false;
  reducer: (b: StyleObject, a: any) => StyleObject;
};

export type ReducerContainer =
  | AssignmentCommutativeReducerContainer
  | NonAssignmentCommutativeReducerContainer;

// TODO: more precise types
export type Styletron = {
  reducers: Array<ReducerContainer>;
  base: any;
  driver: any;
  name?: string;
  wrapper: any;
  getInitialStyle: any;
  ext?: {
    name?: string;
    base: any;
    getInitialStyle: any;
    with: any;
  };
  debug?: {
    stackIndex: number;
    stackInfo: {
      stack: any;
      stacktrace: any;
      message: any;
    };
  };
};

export type StyletronProps<Props = {}> = Partial<{
  $style: StyleObject | ((props: Props) => StyleObject);
  $as: ComponentType<any> | keyof JSX.IntrinsicElements;
  className: string;
  /** @deprecated */
  $ref: Props extends {ref?: infer T} ? T : React.Ref<any>;
  ref: Props extends {ref?: infer T} ? T : React.Ref<any>;
}>;

export type StyletronComponent<Props> = React.FC<
  Props & StyletronProps<Props>
> & {
  __STYLETRON__: any;
};

export type StyledFn = {
  <T extends keyof JSX.IntrinsicElements | ComponentType<any>, Props>(
    component: T,
    style: StyleObject | ((a: Props) => StyleObject),
  ): StyletronComponent<
    (T extends ComponentType<infer BaseProps>
      ? BaseProps
      : T extends keyof JSX.IntrinsicElements ? JSX.IntrinsicElements[T] : {}) &
      Props
  >;
};

export type WithStyleFn = {
  <Base extends StyletronComponent<any>, Props = {}>(
    comnponent: Base,
    a: StyleObject | ((a: Props) => StyleObject),
  ): StyletronComponent<
    (Base extends StyletronComponent<infer BaseProps> ? BaseProps : never) &
      Props
  >;
};

export type WithTransformFn = <Base extends StyletronComponent<any>, Props>(
  b: Base,
  a: (b: StyleObject, a: Props) => StyleObject,
) => StyletronComponent<
  (Base extends StyletronComponent<infer BaseProps> ? BaseProps : never) & Props
>;

export type WithWrapperFn = <Base extends StyletronComponent<any>, Props>(
  component: Base,
  wrapper: (a: Base) => ComponentType<Props>,
) => StyletronComponent<
  (Base extends StyletronComponent<infer BaseProps> ? BaseProps : never) & Props
>;
