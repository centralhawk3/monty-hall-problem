import React from 'react';
import { v4 as uuidv4 } from 'uuid';
import { Button } from '@material-ui/core';
import { shuffleArray } from 'utilities/arrays';

import GameCard from 'components/GameCard/GameCard';
import Metrics from 'components/Metrics/Metrics';

type Metrics = {
  winsWithoutSwitching: number,
  lossesWithoutSwitching: number,
  winsWithSwitching: number,
  lossesWithSwitching: number,
  totalGamesPlayed: number,
};

type BoardState = {
  id: string,
  cards: Card[],
  message: string,
  metrics: Metrics,
  switchedCardChoice: boolean,
  cardsHaveBeenRevealed: boolean,
  cardHasBeenChosen: boolean,
}

type Card = {
  face: string,
  flipped: boolean,
  chosen: boolean,
}

class Board extends React.Component<unknown, BoardState> {

  constructor(props: unknown) {
    super(props);
    this.state = {
      id: uuidv4(),
      cards: this.getCards(),
      message: 'Find The Ace',
      metrics: {
        winsWithoutSwitching: 0,
        lossesWithoutSwitching: 0,
        winsWithSwitching: 0,
        lossesWithSwitching: 0,
        totalGamesPlayed: 0,
      },
      switchedCardChoice: false,
      cardsHaveBeenRevealed: false,
      cardHasBeenChosen: false,
    };
  }

  getCards(): Card[] {
    return shuffleArray([
      {
        face: 'joker',
        flipped: false,
        chosen: false,
      },
      {
        face: 'joker',
        flipped: false,
        chosen: false,
      },
      {
        face: 'ace',
        flipped: false,
        chosen: false,
      },
    ]);
  }

  handleOnClick(card: Card): void {
    const { cardHasBeenChosen, cards } = this.state;
    if (!cardHasBeenChosen) {
      this.setState((state) => {
        const chosenCard = state.cards.findIndex((c) => c === card);
        cards[chosenCard] = {
          ...cards[chosenCard],
          chosen: !card.chosen,
        };

        const cardToReveal = cards.findIndex((c: Card) => c.face === 'joker' && !c.chosen && !c.flipped);
        cards[cardToReveal] = {
          ...cards[cardToReveal],
          flipped: true,
        };

        return {
          cards: state.cards,
          cardHasBeenChosen: true,
        };
      });
    }
  }

  reset(): void {
    this.setState({
      id: uuidv4(),
      cards: this.getCards(),
      cardHasBeenChosen: false,
      message: 'Find The Ace',
      cardsHaveBeenRevealed: false,
      switchedCardChoice: false,
    });
  }

  switchCardChoice(): void {
    this.setState((state) => {
      const { cards } = state;
      const existingChoice = cards.findIndex((c) => c.chosen === true);
      const otherChoice = cards.findIndex((c) => c.flipped === false && c.chosen === false);
      cards[existingChoice] = {
        ...cards[existingChoice],
        chosen: false,
      };
      cards[otherChoice] = {
        ...cards[otherChoice],
        chosen: true,
      };

      return {
        cards,
        switchedCardChoice: true,
      };
    });
  }

  reveal(): void {
    this.setState((state) => {
      const { switchedCardChoice, cards, metrics } = state;
      const isChoiceAWinner = cards.findIndex((c) => c.face === 'ace' && c.chosen === true) > -1;

      return {
        metrics: {
          ...metrics,
          ...switchedCardChoice && isChoiceAWinner && { winsWithSwitching: metrics.winsWithSwitching + 1 },
          ...switchedCardChoice && !isChoiceAWinner && { lossesWithSwitching: metrics.lossesWithSwitching + 1 },
          ...!switchedCardChoice && isChoiceAWinner && { winsWithoutSwitching: metrics.winsWithoutSwitching + 1 },
          ...!switchedCardChoice && !isChoiceAWinner && { lossesWithoutSwitching: metrics.lossesWithoutSwitching + 1 },
          totalGamesPlayed: metrics.totalGamesPlayed + 1,
        },
        cards: cards.map((card) => (
          {
            ...card,
            flipped: true,
            chosen: false,
          }
        )),
        message: isChoiceAWinner ? 'You Win!' : 'You Lose!',
        cardsHaveBeenRevealed: true,
      };
    });
  }

  render(): JSX.Element {
    const {
      id,
      message,
      cardHasBeenChosen,
      cardsHaveBeenRevealed,
      cards,
      metrics: {
        winsWithoutSwitching,
        lossesWithoutSwitching,
        winsWithSwitching,
        lossesWithSwitching,
        totalGamesPlayed,
      },
    } = this.state;

    return (
      <div>
        <Metrics
          winsWithoutSwitching={winsWithoutSwitching}
          lossesWithoutSwitching={lossesWithoutSwitching}
          winsWithSwitching={winsWithSwitching}
          lossesWithSwitching={lossesWithSwitching}
          totalGamesPlayed={totalGamesPlayed}
        />
        <h1 className="gameTitle">{message}</h1>
        <div className="gameSpace">
          {cards.map((card, index) => {
            const key = id + index + card.face + (card.chosen ? '1' : '0');
            return (
              <GameCard
                key={key}
                card={card}
                onClick={() => this.handleOnClick(card)}
              />
            );
          })}
        </div>
        <div className="playingButtonsGroup">
          {cardsHaveBeenRevealed
          && (
            <div className="playAgainButton">
              <Button variant="contained" color="primary" onClick={() => this.reset()}>Play Again</Button>
            </div>
          )}
          {(cardHasBeenChosen && !cardsHaveBeenRevealed)
          && (
            <div className="playAgainButton">
              <Button variant="contained" color="secondary" onClick={() => this.switchCardChoice()}>Switch Choice</Button>
            </div>
          )}
          {(cardHasBeenChosen && !cardsHaveBeenRevealed)
          && (
            <div className="playAgainButton">
              <Button variant="contained" color="primary" onClick={() => this.reveal()}>Reveal</Button>
            </div>
          )}
        </div>
      </div>
    );
  }
}

export default Board;
