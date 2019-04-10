declare type ValueType = 'Null' | 'Undefined' | 'String' | 'Number' | 'Array' | 'Function' | 'Boolean';
export declare type Predicate = (val: any) => boolean;
export interface Shape {
    [key: string]: Predicate;
}
interface Object {
    [key: string]: any;
}
export declare const hasType: import("@typed/curry").Curry2<ValueType, any, boolean>;
export declare const hasShape: import("@typed/curry").Curry2<Shape, Object, boolean>;
export declare function isFalsy(val: any): boolean;
export declare function hasMinLength(length: number): Predicate;
export declare function hasMaxLength(length: number): Predicate;
export declare function or(...predicates: Predicate[]): Predicate;
export declare function and(...predicates: Predicate[]): Predicate;
export declare const isArray: Predicate;
export declare const isString: Predicate;
export declare const isNumber: Predicate;
export declare const isFunction: Predicate;
export declare const isBoolean: Predicate;
export declare const isUndefined: Predicate;
export declare const isNull: Predicate;
export declare const isArrayOrUndefined: Predicate;
export declare const isStringOrUndefined: Predicate;
export declare const isNumberOrUndefined: Predicate;
export declare const isFunctionOrUndefined: Predicate;
export declare const isBooleanOrUndefined: Predicate;
export {};
