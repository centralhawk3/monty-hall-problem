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
		};
		this.handleOnClick = this.handleOnClick.bind(this);
		this.reset = this.reset.bind(this);
	}

	getCards() {
		return shuffleArray(['1J', '1J', 'AH']);
	}

	handleOnClick(card) {
		if (card === 'AH') {
			this.setState({winnerFound: true});
		}
	}

	reset() {
		this.setState({
			id: uuidv4(),
			cards: this.getCards(),
			winnerFound: false,
		});
	}

	render() {
		return (
			<div>
				<h1 className="gameTitle">{this.state.winnerFound ? 'You Win!' : 'Find The Ace'}</h1>
			    <div className="gameSpace">
			    	{this.state.cards.map((value, index) => {
			        	return <GameCard key={this.state.id + index + value} card={value} onClick={this.handleOnClick} />
			     	})}
			    </div>
			    <div className="playAgainButton">
			    	<Button variant="contained" color="primary" onClick={() => this.reset()}>Play Again</Button>
			    </div>
			</div>
		);
	}
}

export default Board;