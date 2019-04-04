"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const lib_1 = require("../lib");
describe('createAction', () => {
    const namespace = 'HELLO';
    const actionType = 'WORLD';
    const expectedNamespacedActionType = `${namespace}.${actionType}`;
    it('Should return a prefixed version of the passed action type as the first element of the tuple.', () => {
        const [namespacedActionType] = lib_1.createAction(namespace, actionType);
        expect(namespacedActionType).toEqual(expectedNamespacedActionType);
    });
    it('Should return an action creator that creates actions with namespaced types as the second element of the tuple.', () => {
        const [_, actionCreator] = lib_1.createAction(namespace, actionType);
        const payload = { foo: 'bar' };
        expect(actionCreator()).toEqual({ type: expectedNamespacedActionType });
        expect(actionCreator(payload)).toEqual({ type: expectedNamespacedActionType, payload });
    });
    it('Should be curried.', () => {
        expect(lib_1.createAction(namespace, actionType)[1]()).toEqual(lib_1.createAction(namespace)(actionType)[1]());
    });
});
