import React from 'react';
import { v4 as uuidv4 } from 'uuid';
import { Button } from '@material-ui/core';
import { shuffleArray } from 'utilities/arrays';

import GameCard from 'components/GameCard/GameCard';

class Board extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			id: uuidv4(),
			winnerFound: false,
			cards: this.getCards(),
			cardHasBeenChosen: false,
			message: 'Find The Ace',
		};
		this.handleOnClick = this.handleOnClick.bind(this);
		this.reset = this.reset.bind(this);
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

	handleOnClick(card) {
		if (this.state.cardHasBeenChosen === false) {
			const cardToUpdate = this.state.cards.findIndex((c) => c === card);
			this.state.cards[cardToUpdate] = {
				...this.state.cards[cardToUpdate],
				chosen: !card.chosen,
			}

			this.setState({
				cards: this.state.cards,
				cardHasBeenChosen: true,
				message: 'The host is deciding their next move...',
			}, () => {
				const shouldFlipACard = shuffleArray([0,1])[0] === 1;

				if (shouldFlipACard) {
					const cardToUpdate = this.state.cards.findIndex((c) => c.face === '1J' && c.chosen === false && c.flipped == false);
					this.state.cards[cardToUpdate] = {
						...this.state.cards[cardToUpdate],
						flipped: true,
					}
				}

				this.setState({
					cards: this.state.cards,
					message: shouldFlipACard
						? 'The host has decided to flip a card for you...'
						: 'The host has decided NOT to flip a card for you...',
				}, () => {
					if (shouldFlipACard) {
						setTimeout(() => {
							this.setState({
								message: 'Switch your initial choice?',
							})
						}, 2000)
					}					
				});
			});
		}
	}

	reset() {
		this.setState({
			id: uuidv4(),
			cards: this.getCards(),
			winnerFound: false,
			cardHasBeenChosen: false,
			message: 'Find The Ace',
		});
	}

	switchCardChoice() {
		const existingChoice = this.state.cards.findIndex((c) => c.chosen === true);
		const otherChoice = this.state.cards.findIndex((c) => c.flipped === false && c.chosen === false);
		this.state.cards[existingChoice] = {
			...this.state.cards[existingChoice],
			chosen: false,
		}
		this.state.cards[otherChoice] = {
			...this.state.cards[otherChoice],
			chosen: true,
		}
		this.setState({
			cards: this.state.cards,
		});
	}

	reveal() {
		const isChoiceAWinner = this.state.cards.findIndex((c) => c.face === 'AH' && c.chosen === true) > -1;

		console.log(isChoiceAWinner, this.state.cards);

		const flippedCards = this.state.cards.map((card) => {
			return {
				...card,
				flipped: true,
				chosen: false,
			}
		});

		this.setState({
			cards: flippedCards,
			message: isChoiceAWinner ? 'You Win!' : 'You Lose!',
		});
	}

	render() {
		return (
			<div>
				<h1 className="gameTitle">{this.state.message}</h1>
			    <div className="gameSpace">
			    	{this.state.cards.map((value, index) => {
			        	return <GameCard key={this.state.id + index + value.face + (value.chosen ? '1' : '0')} card={value} onClick={this.handleOnClick} />
			     	})}
			    </div>
			    <div className="playingButtonsGroup">
				    <div className="playAgainButton">
				    	<Button variant="contained" color="primary" onClick={() => this.reset()}>Play Again</Button>
				    </div>
				    <div className="playAgainButton">
				    	<Button variant="contained" color="secondary" onClick={() => this.switchCardChoice()}>Switch Choice</Button>
				    </div>
				    <div className="playAgainButton">
				    	<Button variant="contained" color="primary" onClick={() => this.reveal()}>Reveal</Button>
				    </div>
			    </div>
			</div>
		);
	}
}

export default Board;