import React from 'react';
import { v4 as uuidv4 } from 'uuid';
import { Button } from '@material-ui/core';
import { shuffleArray } from 'utilities/arrays';
import { FormGroup, FormControlLabel, Switch, TextField } from '@material-ui/core';

import GameCard from 'components/GameCard/GameCard';

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
			}, () => {
				const cardToUpdate = this.state.cards.findIndex((c) => c.face === '1J' && c.chosen === false && c.flipped == false);
				this.state.cards[cardToUpdate] = {
					...this.state.cards[cardToUpdate],
					flipped: true,
				}

				this.setState({
					cards: this.state.cards,
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
			cardsHaveBeenRevealed: false,
			switchedCardChoice: false,
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
			switchedCardChoice: true,
		});
	}

	reveal() {
		const isChoiceAWinner = this.state.cards.findIndex((c) => c.face === 'AH' && c.chosen === true) > -1;

		const flippedCards = this.state.cards.map((card) => {
			return {
				...card,
				flipped: true,
				chosen: false,
			}
		});

		let metrics = this.state.metrics;
		if (this.state.switchedCardChoice && isChoiceAWinner) {
			metrics = {
				...metrics,
				winsWithSwitching: metrics.winsWithSwitching+1,	
			}
		}

		if (this.state.switchedCardChoice === false && isChoiceAWinner) {
			metrics = {
				...metrics,
				winsWithoutSwitching: metrics.winsWithoutSwitching+1,	
			}
		}

		if (this.state.switchedCardChoice && !isChoiceAWinner) {
			metrics = {
				...metrics,
				lossesWithSwitching: metrics.lossesWithSwitching+1,	
			}
		}

		if (this.state.switchedCardChoice === false && !isChoiceAWinner) {
			metrics = {
				...metrics,
				lossesWithoutSwitching: metrics.lossesWithoutSwitching+1,	
			}
		}

		metrics = {
			...metrics,
			gamesPlayedTotal: metrics.gamesPlayedTotal+1,
		};

		this.setState({
			metrics: metrics,
			cards: flippedCards,
			message: isChoiceAWinner ? 'You Win!' : 'You Lose!',
			cardsHaveBeenRevealed: true,
		});
	}

	render() {
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
				gamesPlayedTotal,
			},
		} = this.state;

		const winPercentWithSwitching = parseFloat((winsWithSwitching / gamesPlayedTotal) * 100).toFixed(2);
		const lossPercentWithSwitching = parseFloat((lossesWithSwitching / gamesPlayedTotal) * 100).toFixed(2);
		const winPercentWithoutSwitching = parseFloat((winsWithoutSwitching / gamesPlayedTotal) * 100).toFixed(2);
		const lossPercentWithoutSwitching = parseFloat((lossesWithoutSwitching / gamesPlayedTotal) * 100).toFixed(2);

		return (
			<div>
	    		<div className="metrics">
			    	<div className="metricBox">
			    		Rounds: {gamesPlayedTotal}
			    	</div>
			    	<div className="metricBox">
			    		WWOS: {winPercentWithoutSwitching}%
			    	</div>
			    	<div className="metricBox">
			    		WWS: {winPercentWithSwitching}%
			    	</div>
		    	</div>
				<h1 className="gameTitle">{message}</h1>
			    <div className="gameSpace">
			    	{cards.map((value, index) => {
			    		const key = id + index + value.face + (value.chosen ? '1' : '0');
			        	return <GameCard key={key} card={value} onClick={this.handleOnClick} />
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
				    		<Button variant="contained" color="secondary" onClick={() => this.switchCardChoice()}>Switch Choice</Button>
				    	</div>
				    }
				    {(cardHasBeenChosen && cardsHaveBeenRevealed === false) &&
					    <div className="playAgainButton">
					    	<Button variant="contained" color="primary" onClick={() => this.reveal()}>Reveal</Button>
					    </div>
					}
			    </div>
			</div>
		);
	}
}

export default Board;