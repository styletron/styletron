import type {ComponentType, FunctionComponent, ComponentProps} from "react";
import type {StyleObject} from "styletron-standard";

type $Call1<F extends (...args: any) => any, A> = F extends (
  a: A,
  ...args: any
) => infer R
  ? R
  : never;

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

type ExtractPropTypes = <T>(a: StyletronComponent<T>) => T;

export type StyletronComponent<Props> = FunctionComponent<Props> & {
  __STYLETRON__: any;
};

export type StyledFn = {
  (b: string, a: StyleObject): StyletronComponent<{}>;
  <Props>(b: string, a: (a: Props) => StyleObject): StyletronComponent<Props>;
  <Base extends ComponentType<any>>(
    b: Base,
    a: StyleObject,
  ): StyletronComponent<Omit<ComponentProps<Base>, "className">>;
  <Base extends ComponentType<any>, Props>(
    b: Base,
    a: (a: Props) => StyleObject,
  ): StyletronComponent<Omit<ComponentProps<Base>, "className"> & Props>;
};

export type WithStyleFn = {
  <Base extends StyletronComponent<any>, Props>(
    b: Base,
    a: (a: Props) => StyleObject,
  ): StyletronComponent<$Call1<ExtractPropTypes, Base> & Props>;
  <Base extends StyletronComponent<any>>(
    b: Base,
    a: StyleObject,
  ): StyletronComponent<$Call1<ExtractPropTypes, Base>>;
};

export type WithTransformFn = <Base extends StyletronComponent<any>, Props>(
  b: Base,
  a: (b: StyleObject, a: Props) => StyleObject,
) => StyletronComponent<$Call1<ExtractPropTypes, Base> & Props>;

export type WithWrapperFn = <Base extends StyletronComponent<any>, Props>(
  b: Base,
  a: (a: Base) => ComponentType<Props>,
) => StyletronComponent<$Call1<ExtractPropTypes, Base> & Props>;
