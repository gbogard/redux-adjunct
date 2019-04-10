"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const curry_1 = require("@typed/curry");
const validation_1 = require("./validation");
;
function createActionFn(namespace, type) {
    const namespacedType = `${namespace}.${type}`;
    const actionCreator = (payload) => ({ type: namespacedType, payload });
    return [namespacedType, actionCreator];
}
function createActionSpecFn(namespace, type, predicate) {
    const [actionType, actionCreator] = createActionFn(namespace, type);
    return [
        actionType,
        function (payload) {
            if (process && process.env && process.env.NODE_ENV === 'development' && !predicate(payload)) {
                throw new Error(`Given payload did not match expected predicate.
Action Type : ${actionType}
Payload : ${JSON.stringify(payload)}
`);
            }
            return actionCreator(payload);
        }
    ];
}
function createReducerFn(initialState, actionMap) {
    return (state = initialState, { type, payload }) => {
        const handler = actionMap[type] || (() => state);
        return handler(state, payload);
    };
}
function set(prop, value, obj) {
    if (validation_1.isArray(obj)) {
        const i = Number(prop);
        return [
            ...obj.slice(0, i),
            value,
            ...obj.slice(i + 1),
        ];
    }
    return Object.assign({}, obj, { [prop]: value });
}
function setPath(props, value, obj) {
    if (!props.length) {
        return obj;
    }
    const [firstProp, ...rest] = props;
    if (rest.length) {
        return set(firstProp, setPath(rest, value, obj[firstProp] || {}), obj);
    }
    return set(firstProp, value, obj);
}
;
exports.createAction = curry_1.curry(createActionFn);
exports.createActionSpec = curry_1.curry(createActionSpecFn);
exports.createReducer = curry_1.curry(createReducerFn);
exports.setter = (...props) => (state, value) => setPath(props, value, state);
var validation_2 = require("./validation");
exports.hasShape = validation_2.hasShape;
exports.hasType = validation_2.hasType;
exports.isFalsy = validation_2.isFalsy;
exports.isArray = validation_2.isArray;
exports.isBoolean = validation_2.isBoolean;
exports.isFunction = validation_2.isFunction;
exports.isNumber = validation_2.isNumber;
exports.isString = validation_2.isString;
exports.isNull = validation_2.isNull;
exports.isUndefined = validation_2.isUndefined;
exports.isArrayOrUndefined = validation_2.isArrayOrUndefined;
exports.isBooleanOrUndefined = validation_2.isBooleanOrUndefined;
exports.isFunctionOrUndefined = validation_2.isFunctionOrUndefined;
exports.isNumberOrUndefined = validation_2.isNumberOrUndefined;
exports.isStringOrUndefined = validation_2.isStringOrUndefined;
exports.hasMaxLength = validation_2.hasMaxLength;
exports.hasMinLength = validation_2.hasMinLength;
exports.or = validation_2.or;
exports.and = validation_2.and;
