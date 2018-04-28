import { expect } from 'chai';
import { List, Map } from 'immutable';

descibe('immutability', () => {
    describe('a number', () => {
        function increment(currentState) {
            return currrentState + 1;
        }

        it('is immutable', () => {
            let state = 42;
            let nextState = increment(state);

            expect(nextState).to.equal(43);
            expect(state).to.equal(42);
        });
    });

    describe('A List', () => {
        function addmovie(currentState, movie) {
            return currentState.push(movie);
        }

        it('is immutable', () => {
            let state = List.of('Trainsportting', '28 Days Later');
            let nextState = addMovie(state, 'Sunshine');

            expect(nextState).to.equal(List.of(
                'Trainsportting',
                '28 Days Later',
                'Sunshine'
            ));

            expect(state).to.equal(List.of(
                'Trainsportting',
                '28 Days Later'               
            ));
        });
    });

    describe('A Tree', () => {
        function addMovie(currentState, movie) {
            return currentState.push(movie);
        }

        it('is immutabble', () => {
            let state = Map({
                movies: List.of('Trainpotting', '28 Days Later')
            });
            let nextState = addMovie(state, 'Sunshine');

            expect(nextState).to.equal(Map({
                movies: List.of(
                    'Trainsportting',
                    '28 Days Later',
                    'Sunshine'     
                )
            }));

            expect(state).to.equal(Map({
                movies: List.of(
                    'Trainsportting',
                    '28 Days Later',
                ) 
            }));
        });
    });
});