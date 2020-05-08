// @flow

import type {
  ComponentType,
  StatelessFunctionalComponent,
  ElementConfig,
} from "react";
import type {StyleObject} from "styletron-standard";

export type AssignmentCommutativeReducerContainer = {
  assignmentCommutative: true,
  reducer: StyleObject => StyleObject,
  style: StyleObject,
  factory: StyleObject => AssignmentCommutativeReducerContainer,
};

export type NonAssignmentCommutativeReducerContainer = {
  assignmentCommutative: false,
  reducer: (StyleObject, Object) => StyleObject,
};

export type ReducerContainer =
  | AssignmentCommutativeReducerContainer
  | NonAssignmentCommutativeReducerContainer;

// TODO: more precise types
export type Styletron = {
  reducers: Array<ReducerContainer>,
  base: any,
  driver: any,
  name?: string,
  wrapper: any,
  getInitialStyle: any,
  ext?: {
    name?: string,
    base: any,
    getInitialStyle: any,
    with: any,
  },
  debug?: {
    stackIndex: number,
    stackInfo: {stack: any, stacktrace: any, message: any},
  },
};

type ExtractPropTypes = <T>(StyletronComponent<T>) => T;

export type StyletronComponent<Props> = StatelessFunctionalComponent<Props> & {
  __STYLETRON__: any,
};

export type StyledFn = {
  (string, StyleObject): StyletronComponent<{}>,
  <Props>(string, (Props) => StyleObject): StyletronComponent<Props>,
  <Base: ComponentType<any>>(
    Base,
    StyleObject,
  ): StyletronComponent<$Diff<ElementConfig<Base>, {className: any}>>,
  <Base: ComponentType<any>, Props>(
    Base,
    (Props) => StyleObject,
  ): StyletronComponent<$Diff<ElementConfig<Base>, {className: any}> & Props>,
};

export type WithStyleFn = {
  <Base: StyletronComponent<any>, Props>(
    Base,
    (Props) => StyleObject,
  ): StyletronComponent<$Call<ExtractPropTypes, Base> & Props>,
  <Base: StyletronComponent<any>>(
    Base,
    StyleObject,
  ): StyletronComponent<$Call<ExtractPropTypes, Base>>,
};

export type WithTransformFn = <Base: StyletronComponent<any>, Props>(
  Base,
  (StyleObject, Props) => StyleObject,
) => StyletronComponent<$Call<ExtractPropTypes, Base> & Props>;

export type WithWrapperFn = <Base: StyletronComponent<any>, Props>(
  Base,
  (Base) => ComponentType<Props>,
) => StyletronComponent<$Call<ExtractPropTypes, Base> & Props>;
