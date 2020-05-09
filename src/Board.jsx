import React from 'react';

import GameCard from './GameCard';

class Board extends React.Component {
	onClick(card) {
		console.log('Clicked!', card);
		if (card === 'AH') {
			console.log('You Win!');
		}
	}

	render() {
		const cardOptions = ['1J', '1J', '1J', '1J', 'AH'];
		const cards = [];
		while (cardOptions.length > 0) {
			const randomNumber = Math.floor(Math.random() * cardOptions.length);
			cards.push(cardOptions[randomNumber]);
			cardOptions.splice(randomNumber, 1);
		}
		return (
			<div>
				<h1 className="gameTitle">Find The Ace</h1>
			    <div className="gameSpace">
			    	{cards.map((value, index) => {
			        	return <GameCard card={value} onClick={this.onClick} />
			     	})}
			    </div>
			</div>
		);
	}
}

export default Board;