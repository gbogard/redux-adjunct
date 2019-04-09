import { curry } from '@typed/curry';
import { isArray } from './validation';

interface Action<P> { type: string, payload: P };
type ActionCreator<P> = (payload?: P) => Action<P>;
type State = { [key:string]: any }|any[];

function createActionFn(namespace: string, type: string): [string, ActionCreator<any>] {
    const namespacedType = `${namespace}.${type}`;
    const actionCreator: ActionCreator<any> = <P>(payload: P): Action<P> => ({ type: namespacedType, payload });
    return [ namespacedType, actionCreator ];
}

function createReducerFn<S extends State>(
    initialState: S,
    actionMap: { [actionType: string]: (currentState: S, payload: any) => S }
) {
    return (state: S = initialState, { type, payload }: Action<any>) => {
        const handler = actionMap[type] || (() => state); 
        return handler(state, payload);
    }
}

function set<S extends State>(prop: string|number, value: any, obj: S): S {
   
    if (isArray(obj)) {
        const i = Number(prop);
        return [
            ...obj.slice(0, i),
            value,
            ...obj.slice(i + 1),
        ] as S;
    }
    return { ...obj, [prop]: value };
}

function setPath<S extends State>(props:(string | number)[], value: any, obj: S): S {
    if (!props.length) {
        return obj;
    }
    const [firstProp, ...rest] = props;
    if (rest.length) {
        return set(firstProp, setPath(rest, value, (obj as { [key: string]: {} })[firstProp] || {}), obj);
    }
    return set(firstProp, value, obj)
};

export const createAction = curry(createActionFn);

export const createReducer = curry(createReducerFn);

export const setter = (...props: string[]) => <S extends State>(state: S, value: any) => setPath(props, value, state);

export {
    hasShape,
    hasType,
    isFalsy,
    isArray,
    isBoolean,
    isFunction,
    isNumber,
    isString,
    isNull,
    isUndefined,
    isArrayOrUndefined,
    isBooleanOrUndefined,
    isFunctionOrUndefined,
    isNumberOrUndefined,
    isStringOrUndefined,
    or,
    and,
} from './validation';
