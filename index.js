'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var ramda = require('ramda');

var createAction = ramda.curry(function (namespace, type) {
    var namespacedType = namespace + "." + type;
    return [namespacedType, function (payload) { return ({ type: namespacedType, payload: payload }); }];
});
var reducer = ramda.curry(function (initialState, actionMap) { return function (state, _a) {
    if (state === void 0) { state = initialState; }
    var type = _a.type, payload = _a.payload;
    var handler = actionMap[type] || ramda.always(state);
    return handler(state, payload);
}; });
var setter = function (prop) {
    var assocFn = ramda.type(prop) === "Array" ? ramda.assocPath : ramda.assoc;
    return function (state, value) { return assocFn(prop, value, state); };
};

exports.createAction = createAction;
exports.reducer = reducer;
exports.setter = setter;
