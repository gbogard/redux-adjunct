import { curry } from '@typed/curry';

type ValueType = 'Null'
    | 'Undefined'
    | 'String'
    | 'Number'
    | 'Array'
    | 'Function'
    | 'Boolean';
export type Predicate = (val: any) => boolean;
export interface Shape { [key: string]: Predicate }
interface Object { [key:string]: any }

function getType(val: any): ValueType {
    return val === null
        ? 'Null'
        : val === undefined
        ? 'Undefined'
        : Object.prototype.toString.call(val).slice(8, -1) as ValueType;
}

export const hasType = curry(function(type: ValueType, val: any): boolean {
    return getType(val) === type;
});

export const hasShape = curry(function(shape: Shape, obj: Object): boolean {
    return !Object.keys(shape).some(key => !shape[key](obj[key]))
});

export function isFalsy(val: any): boolean {
    return !!val;
}

export function hasMinLength(length: number): Predicate {
    return (val: any) => val.length >= length
}

export function hasMaxLength(length: number): Predicate {
    return (val: any) => val.length <= length
}

export function or(...predicates: Predicate[]): Predicate {
    return (val: any) => predicates.some(p => p(val));
}

export function and(...predicates: Predicate[]): Predicate {
    return (val: any) => !predicates.some(p => !p(val));
}

export const isArray: Predicate = hasType('Array');
export const isString: Predicate = hasType('String');
export const isNumber: Predicate = hasType('Number');
export const isFunction: Predicate = hasType('Function');
export const isBoolean: Predicate = hasType('Boolean');
export const isUndefined: Predicate = hasType('Undefined');
export const isNull: Predicate = hasType('Null');
export const isArrayOrUndefined: Predicate = or(isArray, isUndefined);
export const isStringOrUndefined: Predicate = or(isString, isUndefined);
export const isNumberOrUndefined: Predicate = or(isNumber, isUndefined);
export const isFunctionOrUndefined: Predicate = or(isFunction, isUndefined);
export const isBooleanOrUndefined: Predicate = or(isBoolean, isUndefined);
