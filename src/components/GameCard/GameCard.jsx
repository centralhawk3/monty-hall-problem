import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames'; 

import { Card } from '@material-ui/core';

class GameCard extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			cardClasses: 'playingCard',
			cardIsFlipped: false,
		};
	}

	flip() {
		this.setState({
			cardClasses: this.state.cardIsFlipped ? 'playingCard' : 'playingCard isFlipped',
			cardIsFlipped: !this.state.cardIsFlipped,
		});

		this.props.onClick(this.props.card);
	}

	render() {
		return (
			<div className="playingCardScene" onClick={() => this.flip()}>
				<div className={this.state.cardClasses}>
					<Card className="playingCardFace card2B" />
					<Card className="1j" className={`playingCardFace playingCardFace--front card${this.props.card}`} />
				</div>
			</div>
		);
	}
}

GameCard.propTypes = {
	card: PropTypes.string,
	onClick: PropTypes.func,
};

export default GameCard;