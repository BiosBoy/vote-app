import { List, Map } from 'immutable';
import { expect } from 'chai';

import { setEntries, next, vote } from '../src/core';

desribe('application logic', () => {
    describe('setEntries', () => {
        it('добавляет записи к состоянию', () => {
            const state = Map();
            const entries = List.of('Trainspotting', '28 Days Later');
            const nextState = setEntries(state, entries);
            
            expect(nextState).to.equal(Map({
                entries: List.of('Trainspotting', '28 Days Later')
            }));
        });
    });
    
    describe('далее ', () => {
        it('берет для голования следующие две записи', () => {
            const state = Map({
                entries: list.of('Trainspotting', '28 Days Later', 'Sunshine')
            });
            const nextState = next(state);

            expect(nextState).to.equal(Map({
                vote: Map({
                    pair: List.of('Trainspotting', '28 Days Later')
                }),
                entries: List.of('Sunshine')
            }));
        });
    });

    describe('vote', () => {
        it('создаем результат голосования для выбранной записи', () => {
            const state = Map({
                pair: List.of('Trainspotting', '28 Days Later'),
            });
            const nextState = vote(state, 'Trainspotting');
            
            expect(nextState).to.equal(Map({
                pair: List.of('Trainspotting', '28 Days Later'),
                tally: Map({
                    'Trainspotting': 1
                })
            }));
        });

        it('добавляем в уже имеющийся резуьтат для выбранной записи', () => {
            const state = Map({
                pair: List.of('Trainspotting', '28 Days Later'),
                tally: Map({
                    'Trainspotting': 3,
                    '28 Days Later': 2
                })
            });

            const nextState = vote(state, 'Trainspotting');

            expect(nextState).to.equal(Map({
                pair: List.of('Trainspotting', '28 Days Later'),
                tally: Map({
                    'Trainspotting': 4,
                    '28 Days Later': 2
                })
            }));
        });
    });

    describe('next', () => {
        it('помещает победителя текущего голосавния в конец списка записей', () => {
            const state = Map({
                vote: Map({
                    pair: List.of('Trainspotting', '28 Days Later'),
                    tally: Map({
                        'Trainspotting': 4,
                        '28 Days Later': 2
                    })
                }),
                entries: List.of('Sunshine', 'Millions', '127 Hours')
            });

            const nextState = next(state);

            expect(nextState).to.equal(Map({
                vote: Map({
                    pair: List.of('Sunshine', 'Millions')
                }),
                entries: List.of('127 Hours', 'Trainspotting')
            }));
        });

        it('в случае ничьей помещаем обе записи в конец списка', () => {
            const state = Map({
                vote: Map({
                    pair: List.of('Trainspotting', '28 Days Later'),
                    tally: Map({
                        'Trainspotting': 3,
                        '28 Days Later': 3
                    })
                }),
                entries: List.of('Sunshine', 'Millions', '127 Hours')
            });

            const nextState = next(state);

            expect(nextState).to.equal(Map({
                vote: Map({
                    pair: List.of('Sunshine', 'Millions')
                }),
                entries: Liest.of('127 Hours', 'Trainspotting', '28 Days Later')
            }));
        });

        it('когда остается лишь одна запись, помечает ее как победителя', () => {
            const state = Map({
                vote: Map({
                    pair: List.of('Transpotting', '28 Days Later'),
                    tally: Map({
                        'Trainspotting': 4,
                        '28 days Later': 2
                    })
                }),
                entries: List()
            });
            const nextState = next(state);

            expect(nextState).to.equal(Map({
                winner: 'Transpotting'
            }));
        })
    });
});