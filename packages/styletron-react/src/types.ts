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
    name?: string | null;
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

type BaseProps<P extends {}> = P & {
  $style?: StyleObject | ((props: P) => StyleObject);
  className?: string;
};

type AddStyletronRef<P extends {ref: any}> = P extends {ref: infer R}
  ? P & {
      /** @deprecated */
      $ref?: R;
    }
  : P;

type OverrideProps<D extends React.ElementType, P extends {}> = BaseProps<P> &
  Omit<AddStyletronRef<React.ComponentProps<D>>, keyof BaseProps<P>>;

export interface StyletronComponent<D extends React.ElementType, P extends {}> {
  <C extends React.ElementType = D>(
    props: {
      $as?: C;
    } & OverrideProps<C, P>,
  ): JSX.Element;
  __STYLETRON__: any;
  displayName?: string;
}

export type StyledFn = {
  <T extends React.ElementType, Props>(
    component: T,
    style: StyleObject | ((props: Props) => StyleObject),
  ): StyletronComponent<T, Props>;
};

export type WithStyleFn = {
  <Base extends StyletronComponent<any, any>, Props = {}>(
    component: Base,
    style: StyleObject | ((props: Props) => StyleObject),
  ): Base extends StyletronComponent<infer D, infer P>
    ? StyletronComponent<D, P & Props>
    : never;
};

export type WithTransformFn = <
  Base extends StyletronComponent<any, any>,
  Props,
>(
  component: Base,
  style: (style: StyleObject, props: Props) => StyleObject,
) => Base extends StyletronComponent<infer D, infer P>
  ? StyletronComponent<D, P & Props>
  : never;

export type WithWrapperFn = <Base extends StyletronComponent<any, any>, Props>(
  component: Base,
  wrapper: (
    component: Base,
  ) => ComponentType<Props & React.ComponentProps<Base>>,
) => Base extends StyletronComponent<infer D, infer P>
  ? StyletronComponent<D, P & Props>
  : never;
