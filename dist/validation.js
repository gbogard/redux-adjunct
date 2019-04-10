"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const curry_1 = require("@typed/curry");
function getType(val) {
    return val === null
        ? 'Null'
        : val === undefined
            ? 'Undefined'
            : Object.prototype.toString.call(val).slice(8, -1);
}
exports.hasType = curry_1.curry(function (type, val) {
    return getType(val) === type;
});
exports.hasShape = curry_1.curry(function (shape, obj) {
    return !Object.keys(shape).some(key => !shape[key](obj[key]));
});
function isFalsy(val) {
    return !!val;
}
exports.isFalsy = isFalsy;
function hasMinLength(length) {
    return (val) => val.length >= length;
}
exports.hasMinLength = hasMinLength;
function hasMaxLength(length) {
    return (val) => val.length <= length;
}
exports.hasMaxLength = hasMaxLength;
function or(...predicates) {
    return (val) => predicates.some(p => p(val));
}
exports.or = or;
function and(...predicates) {
    return (val) => !predicates.some(p => !p(val));
}
exports.and = and;
exports.isArray = exports.hasType('Array');
exports.isString = exports.hasType('String');
exports.isNumber = exports.hasType('Number');
exports.isFunction = exports.hasType('Function');
exports.isBoolean = exports.hasType('Boolean');
exports.isUndefined = exports.hasType('Undefined');
exports.isNull = exports.hasType('Null');
exports.isArrayOrUndefined = or(exports.isArray, exports.isUndefined);
exports.isStringOrUndefined = or(exports.isString, exports.isUndefined);
exports.isNumberOrUndefined = or(exports.isNumber, exports.isUndefined);
exports.isFunctionOrUndefined = or(exports.isFunction, exports.isUndefined);
exports.isBooleanOrUndefined = or(exports.isBoolean, exports.isUndefined);
