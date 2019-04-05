/// <reference types="ramda" />
interface Action<P> {
    type: string;
    payload: P;
}
declare type ActionCreator<P> = (payload?: P) => Action<P>;
export declare const createAction: Curry.Curry<(namespace: string, type: string) => [string, ActionCreator<any>]>;
export declare const createReducer: Curry.Curry<(initialState: any, actionMap: {
    [actionType: string]: (currentState: any, payload: any) => any;
}) => (state: any, { type, payload }: Action<any>) => any>;
export declare const setter: <S>(...props: (string | number)[]) => (state: S, value: any) => S;
export {};
