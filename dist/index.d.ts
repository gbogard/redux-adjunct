declare type State = {
    [key: string]: any;
} | any[];
export declare const createAction: import("@typed/curry").Curry2<any, any, any>;
export declare const createActionSpec: import("@typed/curry").Curry3<any, any, any, any>;
export declare const createReducer: import("@typed/curry").Curry2<any, any, any>;
export declare const setter: (...props: string[]) => <S extends State>(state: S, value: any) => S;
export { hasShape, hasType, isFalsy, isArray, isBoolean, isFunction, isNumber, isString, isNull, isUndefined, isArrayOrUndefined, isBooleanOrUndefined, isFunctionOrUndefined, isNumberOrUndefined, isStringOrUndefined, hasMaxLength, hasMinLength, or, and, } from './validation';
