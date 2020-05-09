import React from 'react';

import { Card, CardContent } from '@material-ui/core';

class GameCard extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			cardClasses: 'playingCard',
			cardIsFlipped: false,
		};
	}

	flip() {
		if (this.state.cardIsFlipped) {
			this.setState({
				cardClasses: 'playingCard',
				cardIsFlipped: false,
			});
		} else {
			this.setState({
				cardClasses: 'playingCard isFlipped',
				cardIsFlipped: true,
			});
		}
	}

	render() {
		return (
			<div className="playingCardScene" onClick={() => this.flip()}>
				<div className={this.state.cardClasses}>
					<Card className="playingCardFace playingCardFace--front" />
					<Card className="playingCardFace playingCardFace--back" />
				</div>
			</div>
		);
	}
}

export default GameCard;