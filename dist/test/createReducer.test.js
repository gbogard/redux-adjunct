"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const lib_1 = require("../lib");
const [ACTION_A, actionA] = lib_1.createAction('', 'ACTION_A');
describe('createReducer', () => {
    const initialState = {
        foo: 'bar'
    };
    it('Should return the initial state when called with no state and unhandled action.', () => {
        const myReducer = lib_1.createReducer(initialState, {});
        expect(myReducer(undefined, actionA())).toEqual(initialState);
    });
    it('Should return the current state when called with and unhandled action.', () => {
        const newState = Object.assign({}, initialState, { bar: 'baz' });
        const myReducer = lib_1.createReducer(initialState, {});
        expect(myReducer(newState, actionA())).toEqual(newState);
    });
    it('Should apply the appropriate function to the current state when called with a handled action and no payload.', () => {
        const transformFunction = (state) => (Object.assign({}, state, { foo: 'baz', helloThere: 'general kenobi' }));
        const myReducer = lib_1.createReducer(initialState, {
            [ACTION_A]: transformFunction,
        });
        expect(myReducer(undefined, actionA())).toEqual(transformFunction(initialState));
    });
    it('Should apply the appropriate function to the current state when called with a handled action and a payload.', () => {
        const payload = 'general kenobi';
        const transformFunction = (state, helloThere) => (Object.assign({}, state, { helloThere }));
        const myReducer = lib_1.createReducer(initialState, {
            [ACTION_A]: transformFunction,
        });
        expect(myReducer(undefined, actionA(payload))).toEqual(transformFunction(initialState, payload));
    });
});
