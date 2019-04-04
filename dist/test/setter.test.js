"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const lib_1 = require("../lib");
describe('setter', () => {
    const state = {
        game: 'League of Legends',
        champions: [
            { name: 'Garen' },
            { name: 'Illaoi' },
        ]
    };
    it('Should return a setter a setter function for single property when used with a single string.', () => {
        const setGame = lib_1.setter('game');
        expect(setGame(state, 'dota2')).toEqual(Object.assign({}, state, { game: 'dota2' }));
    });
    it('Should return a setter a setter function for path when used with multiple strings.', () => {
        const setGame = lib_1.setter('champions', 0, 'name');
        expect(setGame(state, 'Veigar')).toEqual(Object.assign({}, state, { champions: [
                { name: 'Veigar' },
                { name: 'Illaoi' },
            ] }));
    });
});
