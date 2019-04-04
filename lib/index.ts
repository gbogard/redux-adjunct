import { curry, always, assocPath } from 'ramda';

interface Action<P> { type: string, payload: P };
type ActionCreator<P> = (payload?: P) => Action<P>;

export const createAction = curry(function (namespace: string, type: string): [string, ActionCreator<any>] {
    const namespacedType = `${namespace}.${type}`;
    const actionCreator: ActionCreator<any> = <P>(payload: P): Action<P> => ({ type: namespacedType, payload });
    return [ namespacedType, actionCreator ];
})

export const createReducer = curry(function <S>(initialState: S, actionMap: { [actionType: string]: (currentState: S, payload: any) => S }) {
    return (state: S = initialState, { type, payload }: Action<any>) => {
        const handler = actionMap[type] || always(state); 
        return handler(state, payload);
    }
})

export const setter = <S>(...props:(string | number)[]) => (state: S, value: any) => assocPath(props, value, state);
