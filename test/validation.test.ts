import {
    hasType,
    hasShape,
    isArray,
    isNumber,
    or,
    and,
    isUndefined,
    isStringOrUndefined,
} from '../lib/validation';

describe('validation', () => {
    describe('hasType', () => {
        it('Should return true when called with "Array" and arrays', () => {
            expect(hasType('Array', [])).toBe(true);
        })

        it('Should return true when called with "Number" and numbers', () => {
            expect(hasType('Number', 42)).toBe(true);
        })

        it('Should return true when called with "Function" and functions', () => {
            expect(hasType('Function', () => 'foo')).toBe(true);
        })

        it('Should return true when called with "String" and strings', () => {
            expect(hasType('String', 'Hello there')).toBe(true);
        })

        it('Should return true when called with "Boolean" and true or false', () => {
            expect(hasType('Boolean', true)).toBe(true);
            expect(hasType('Boolean', false)).toBe(true);
        })

        it('Should return true when called with "Undefined" and undefined', () => {
            expect(hasType('Undefined', undefined)).toBe(true);
        })

        it('Should return true when called with "Null" and null', () => {
            expect(hasType('Null', null)).toBe(true);
        })
    });

    describe('and', () => {
        const predicate = and(isArray, arr => arr.length > 2);
        it('Should return false when all predicates are false', () => {
            expect(predicate('')).toBe(false);
        });

        it('Should return false when one predicate is false', () => {
            expect(predicate([])).toBe(false);
        });

        it('Should return true when all predicates are true', () => {
            expect(predicate(['a', 'b', 'c'])).toBe(true);
        });
    });

    describe('or', () => {
        const predicate = or(isArray, isUndefined);
        it('Should return false all predicates are false', () => {
            expect(predicate('')).toBe(false);
        });

        it('Should return true when one predicate is true', () => {
            expect(predicate([])).toBe(true);
        });

        it('Should return true when all predicates are true', () => {
            expect(predicate(['a', 'b', 'c'])).toBe(true);
        });
    });

    describe('hasShape', () => {
        const predicate = hasShape({
            users: isArray,
            count: isNumber,
            foo: isStringOrUndefined,
        });

        it('Should return false when all predicates are false', () => {
            expect(predicate({
                users: '',
                count: null,
                foo: 42,
            })).toBe(false);
        });

        it('Should return false when one predicate is false', () => {
            expect(predicate({
                users: [],
                count: null,
            })).toBe(false);
        });

        it('Should return false when the given value is not a object', () => {
            expect(predicate([])).toBe(false);
            expect(predicate(42 as any)).toBe(false);
        });

        it('Should return false when a necessary prop is not present in the object', () => {
            expect(predicate({
                users: []
            }))
        });

        it('Should return true when all predicates are true', () => {
            expect(predicate({
                users: [],
                count: 0,
                foo: 'bar',
            })).toBe(true);

            expect(predicate({
                users: [],
                count: 0,
            })).toBe(true);
        });
    });
});
