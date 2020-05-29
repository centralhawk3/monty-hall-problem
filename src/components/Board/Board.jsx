import React from 'react';
import { v4 as uuidv4 } from 'uuid';
import { Button } from '@material-ui/core';
import { shuffleArray } from 'utilities/arrays';

import GameCard from 'components/GameCard/GameCard';
import Metrics from 'components/Metrics/Metrics';

class Board extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            id: uuidv4(),
            winnerFound: false,
            cards: this.getCards(),
            message: 'Find The Ace',
            metrics: {
                winsWithoutSwitching: 0,
                lossesWithoutSwitching: 0,
                winsWithSwitching: 0,
                lossesWithSwitching: 0,
                gamesPlayedTotal: 0,
            },
            switchedCardChoice: false,
            cardsHaveBeenRevealed: false,
            cardHasBeenChosen: false,
        };
    }

    getCards() {
        return shuffleArray([
            {
                face: '1J',
                flipped: false,
                chosen: false,
            },
            {
                face: '1J',
                flipped: false,
                chosen: false,
            },
            {
                face: 'AH',
                flipped: false,
                chosen: false,
            },
        ]);
    }

    handleOnClick(card, callback) {
        callback = callback || function () {};
        const {cardHasBeenChosen} = this.state;
        if (cardHasBeenChosen === false) {
            this.setState((state) => {
                const chosenCard = state.cards.findIndex((c) => c === card);
                state.cards[chosenCard] = {
                    ...this.state.cards[chosenCard],
                    chosen: !card.chosen,
                }

                const cardToReveal = this.state.cards.findIndex((c) => c.face === '1J' && c.chosen === false && c.flipped == false);
                state.cards[cardToReveal] = {
                    ...this.state.cards[cardToReveal],
                    flipped: true,
                }

                return {
                    cards: state.cards,
                    cardHasBeenChosen: true,
                };
            }, () => {
                callback();
            });
        }
    }

    reset() {
        this.setState((state) => {
            return {
                id: uuidv4(),
                cards: this.getCards(),
                winnerFound: false,
                cardHasBeenChosen: false,
                message: 'Find The Ace',
                cardsHaveBeenRevealed: false,
                switchedCardChoice: false,
            };
        });
    }

    switchCardChoice(callback) {
        callback = callback || function () {};
        this.setState((state) => {
            const existingChoice = state.cards.findIndex((c) => c.chosen === true);
            const otherChoice = state.cards.findIndex((c) => c.flipped === false && c.chosen === false);
            state.cards[existingChoice] = {
                ...state.cards[existingChoice],
                chosen: false,
            }
            state.cards[otherChoice] = {
                ...state.cards[otherChoice],
                chosen: true,
            }
            console.log(state.cards);
            return {
                cards: state.cards,
                switchedCardChoice: true,
            }
        }, () => {
            callback();
        });
    }

    reveal(callback) {
        callback = callback || function () {};
        const {switchedCardChoice, cards} = this.state;
        const isChoiceAWinner = cards.findIndex((c) => c.face === 'AH' && c.chosen === true) > -1;

        this.setState((state) => {
            return {
                metrics: {
                    winsWithSwitching: switchedCardChoice && isChoiceAWinner ? state.metrics.winsWithSwitching + 1 : state.metrics.winsWithSwitching,
                    lossesWithSwitching: switchedCardChoice && !isChoiceAWinner ? state.metrics.lossesWithSwitching + 1 : state.metrics.lossesWithSwitching,
                    winsWithoutSwitching: switchedCardChoice === false && isChoiceAWinner ? state.metrics.winsWithoutSwitching + 1 : state.metrics.winsWithoutSwitching,
                    lossesWithoutSwitching: switchedCardChoice === false && !isChoiceAWinner ? state.metrics.lossesWithoutSwitching + 1 : state.metrics.lossesWithoutSwitching,
                    gamesPlayedTotal: state.metrics.gamesPlayedTotal + 1,
                },
                cards: cards.map((card) => {
                    return {
                        ...card,
                        flipped: true,
                        chosen: false,
                    }
                }),
                message: isChoiceAWinner ? 'You Win!' : 'You Lose!',
                cardsHaveBeenRevealed: true,
            };
        }, () => {
            callback();
        });
    }

    simulate() {
        this.handleOnClick(
            this.state.cards[1],
            () => this.switchCardChoice(
                () => this.reveal(
                    () => this.reset()
                )
            )
        );
    }

    render() {
        const {
            id,
            message,
            cardHasBeenChosen,
            cardsHaveBeenRevealed,
            cards,
            metrics,
        } = this.state;

        return (
            <div>
                <Metrics data={metrics}/>
                <h1 className="gameTitle">{message}</h1>
                <div className="gameSpace">
                    {cards.map((card, index) => {
                        const key = id + index + card.face + (card.chosen ? '1' : '0');
                        return <GameCard key={key} card={card} onClick={() => this.handleOnClick(card)}/>
                    })}
                </div>
                <div className="playingButtonsGroup">
                    {cardsHaveBeenRevealed &&
                    <div className="playAgainButton">
                        <Button variant="contained" color="primary" onClick={() => this.reset()}>Play Again</Button>
                    </div>
                    }
                    {(cardHasBeenChosen && cardsHaveBeenRevealed === false) &&
                    <div className="playAgainButton">
                        <Button variant="contained" color="secondary" onClick={() => this.switchCardChoice()}>Switch
                            Choice</Button>
                    </div>
                    }
                    {(cardHasBeenChosen && cardsHaveBeenRevealed === false) &&
                    <div className="playAgainButton">
                        <Button variant="contained" color="primary" onClick={() => this.reveal()}>Reveal</Button>
                    </div>
                    }
                    <div className="playAgainButton">
                        <Button variant="contained" color="primary" onClick={() => this.simulate()}>Simulate</Button>
                    </div>
                </div>
            </div>
        );
    }
}

export default Board;