// @flow

import type {ComponentType, StatelessFunctionalComponent} from "react";
import type {baseStyleT} from "styletron-standard";

export type Reducer = {
  // Static reducer
  (baseStyleT): baseStyleT,
  // Dynamic reducer
  (baseStyleT, Object): baseStyleT,
};

export type AssignmentCommutativeReducerContainer = {
  assignmentCommutative: true,
  reducer: Reducer,
  style: baseStyleT,
  factory: baseStyleT => AssignmentCommutativeReducerContainer,
};

export type NonAssignmentCommutativeReducerContainer = {
  assignmentCommutative: false,
  reducer: Reducer,
};

export type ReducerContainer =
  | AssignmentCommutativeReducerContainer
  | NonAssignmentCommutativeReducerContainer;

// TODO: more precise types
export type Styletron = {
  reducers: Array<ReducerContainer>,
  base: any,
  driver: any,
  wrapper: any,
  getInitialStyle: any,
  debug?: {
    stackIndex: number,
    stackInfo: {stack: any, stacktrace: any, message: any},
  },
};

type ExtractPropTypes = <T>(ComponentType<T>) => T;
type ExtractPropTypes2 = <T>(StyletronComponent<T>) => T;

export type StyletronComponent<Props> = StatelessFunctionalComponent<Props> & {
  __STYLETRON__: any,
};

export type StyledFn = {
  (string, baseStyleT): StyletronComponent<{}>,
  <Props>(string, (Props) => baseStyleT): StyletronComponent<Props>,
  <Base: ComponentType<any>>(
    Base,
    baseStyleT,
  ): StyletronComponent<$Diff<$Call<ExtractPropTypes, Base>, {className: any}>>,
  <Base: ComponentType<any>, Props>(
    Base,
    (Props) => baseStyleT,
  ): StyletronComponent<
    $Diff<$Call<ExtractPropTypes, Base>, {className: any}> & Props,
  >,
};

export type WithStyleFn = {
  <Base: StyletronComponent<any>, Props>(
    Base,
    (Props) => baseStyleT,
  ): StyletronComponent<$Call<ExtractPropTypes2, Base> & Props>,
  <Base: StyletronComponent<any>>(
    Base,
    baseStyleT,
  ): StyletronComponent<$Call<ExtractPropTypes2, Base>>,
};

export type WithTransformFn = <Base: StyletronComponent<any>, Props>(
  Base,
  (baseStyleT, Props) => baseStyleT,
) => StyletronComponent<$Call<ExtractPropTypes2, Base> & Props>;

export type WithWrapperFn = <Base: StyletronComponent<any>>(
  Base,
  (Base) => ComponentType<$Call<ExtractPropTypes2, Base>>,
) => StyletronComponent<$Call<ExtractPropTypes2, Base>>;
