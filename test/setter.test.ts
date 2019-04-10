import { setter } from "../lib";

describe('setter', () => {
    const state = {
        game: 'League of Legends',
        champions: [
            { name: 'Garen' },
            { name: 'Illaoi' },
        ]
    }
    
    it('Should return a setter a setter function for single property when used with a single string.', () => {
        const setGame = setter('game');
        expect(setGame(state, 'dota2')).toEqual({
            ...state,
            game: 'dota2',
        })
    })

    it('Should return a setter a setter function for path when used with multiple strings.', () => {
        const setChampionName = setter('champions', 0, 'name');
        const setChampionStats = setter('champions', 0, 'stats');
        const newState = setChampionStats(setChampionName(state, 'Veigar'), { ap: 900 });
        expect(newState).toEqual({
            ...state,
            champions: [
                { name: 'Veigar', stats: { ap: 900 } },
                { name: 'Illaoi' },
            ]
        })
    })
})
