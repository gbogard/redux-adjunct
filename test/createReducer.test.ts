import { createAction, createReducer } from "../lib";

const [ACTION_A, actionA] = createAction('', 'ACTION_A');

describe('createReducer', () => {
    const initialState = {
        foo: 'bar'
    };
    
    it('Should return the initial state when called with no state and unhandled action.', () => {
        const myReducer = createReducer(initialState, {});
        expect(myReducer(undefined, actionA())).toEqual(initialState);
    })

    it('Should return the current state when called with and unhandled action.', () => {
        const newState = { ...initialState, bar: 'baz' };
        const myReducer = createReducer(initialState, {});
        expect(myReducer(newState, actionA())).toEqual(newState);
    })

    it('Should apply the appropriate function to the current state when called with a handled action and no payload.', () => {
        const transformFunction = (state: any) => ({...state, foo: 'baz', helloThere: 'general kenobi'});
        const myReducer = createReducer(initialState, {
            [ACTION_A]: transformFunction,
        });
        expect(myReducer(undefined, actionA())).toEqual(transformFunction(initialState));
    })

    it('Should apply the appropriate function to the current state when called with a handled action and a payload.', () => {
        const payload = 'general kenobi';
        const transformFunction = (state: any, helloThere: string) => ({...state,  helloThere});
        const myReducer = createReducer(initialState, {
            [ACTION_A]: transformFunction,
        });
        expect(myReducer(undefined, actionA(payload))).toEqual(transformFunction(initialState, payload));
    })
});
