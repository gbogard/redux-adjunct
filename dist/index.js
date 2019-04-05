"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ramda_1 = require("ramda");
;
exports.createAction = ramda_1.curry(function (namespace, type) {
    const namespacedType = `${namespace}.${type}`;
    const actionCreator = (payload) => ({ type: namespacedType, payload });
    return [namespacedType, actionCreator];
});
exports.createReducer = ramda_1.curry(function (initialState, actionMap) {
    return (state = initialState, { type, payload }) => {
        const handler = actionMap[type] || ramda_1.always(state);
        return handler(state, payload);
    };
});
exports.setter = (...props) => (state, value) => ramda_1.assocPath(props, value, state);
