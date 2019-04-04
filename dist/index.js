"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ramda_1 = require("ramda");
;
exports.createAction = ramda_1.curry(function (namespace, type) {
    var namespacedType = namespace + "." + type;
    return [
        namespacedType,
        function (payload) { return ({ type: namespacedType, payload: payload }); },
    ];
});
exports.reducer = ramda_1.curry(function (initialState, actionMap) { return function (state, _a) {
    if (state === void 0) { state = initialState; }
    var type = _a.type, payload = _a.payload;
    var handler = actionMap[type] || ramda_1.always(state);
    return handler(state, payload);
}; });
exports.setter = function (prop) {
    var assocFn = Array.isArray(prop) ? ramda_1.assocPath : ramda_1.assoc;
    return function (state, value) { return assocFn(prop, value, state); };
};
