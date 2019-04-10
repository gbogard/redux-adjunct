import {
    createAction,
    createActionSpec,
    hasShape,
    isNumber,
} from "../lib";


declare const process: {
    env: { NODE_ENV: 'development'|'production' }
};

const namespace = 'HELLO';
const actionType = 'WORLD';
const expectedNamespacedActionType = `${namespace}.${actionType}`;

describe('createAction', () => {
    it('Should return a prefixed version of the passed action type as the first element of the tuple.', () => {
        const [namespacedActionType] = createAction(namespace, actionType);
        expect(namespacedActionType).toEqual(expectedNamespacedActionType);
    });

    it('Should return an action creator that creates actions with namespaced types as the second element of the tuple.', () => {
        const [_, actionCreator] = createAction(namespace, actionType);
        const payload = { foo: 'bar' };
        expect(actionCreator()).toEqual({ type: expectedNamespacedActionType });
        expect(actionCreator(payload)).toEqual({ type: expectedNamespacedActionType, payload });
    });

    it('Should be curried.', () => {
        expect(createAction(namespace, actionType)[1]()).toEqual(createAction(namespace)(actionType)[1]());
    });
});

describe('createActionSpec', () => {
    beforeEach(() => {
        jest.resetModules() // this is important
        process.env = { NODE_ENV: 'development' };
    });
    
    it('Should throw an error when the given payload does not match the required predicate', () => {
        const [_, actionCreator] = createActionSpec(namespace, actionType, hasShape({ foo: isNumber })); 
        expect(() => actionCreator({})).toThrow();
    });

    it('Should not throw any error when the given payload matches the required predicate', () => {
        const [_, actionCreator] = createActionSpec(namespace, actionType, hasShape({ foo: isNumber })); 
        expect(() => actionCreator({foo: 42})).not.toThrow();
    });
})
