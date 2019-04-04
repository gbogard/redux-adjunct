/// <reference types="ramda" />
interface Action<P> {
    type: string;
    payload: P;
}
export declare const createAction: Curry.Curry<(namespace: string, type: string) => (string | ((payload: any) => {
    type: string;
    payload: any;
}))[]>;
export declare const reducer: Curry.Curry<(initialState: any, actionMap: {
    [actionType: string]: (currentState: any, payload: any) => any;
}) => (state: any, { type, payload }: Action<any>) => any>;
export declare const setter: <S>(prop: string | string[]) => (state: S, value: any) => S;
export {};
