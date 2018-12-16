// @flow

import type {ComponentType, StatelessFunctionalComponent} from "react";
import type {StyleObject} from "styletron-standard";

export type Reducer = {
  // Static reducer
  (StyleObject): StyleObject,
  // Dynamic reducer
  (StyleObject, Object): StyleObject,
};

export type AssignmentCommutativeReducerContainer = {
  assignmentCommutative: true,
  reducer: Reducer,
  style: StyleObject,
  factory: StyleObject => AssignmentCommutativeReducerContainer,
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
  (string, StyleObject): StyletronComponent<{}>,
  <Props>(string, (Props) => StyleObject): StyletronComponent<Props>,
  <Base: ComponentType<any>>(
    Base,
    StyleObject,
  ): StyletronComponent<$Diff<$Call<ExtractPropTypes, Base>, {className: any}>>,
  <Base: ComponentType<any>, Props>(
    Base,
    (Props) => StyleObject,
  ): StyletronComponent<
    $Diff<$Call<ExtractPropTypes, Base>, {className: any}> & Props,
  >,
};

export type WithStyleFn = {
  <Base: StyletronComponent<any>, Props>(
    Base,
    (Props) => StyleObject,
  ): StyletronComponent<$Call<ExtractPropTypes2, Base> & Props>,
  <Base: StyletronComponent<any>>(
    Base,
    StyleObject,
  ): StyletronComponent<$Call<ExtractPropTypes2, Base>>,
};

export type WithTransformFn = <Base: StyletronComponent<any>, Props>(
  Base,
  (StyleObject, Props) => StyleObject,
) => StyletronComponent<$Call<ExtractPropTypes2, Base> & Props>;

export type WithWrapperFn = <Base: StyletronComponent<any>, Props>(
  Base,
  (Base) => ComponentType<Props>,
) => StyletronComponent<$Call<ExtractPropTypes2, Base> & Props>;
