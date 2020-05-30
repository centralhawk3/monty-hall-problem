import React from 'react';
import PropTypes from 'prop-types';

import { Card } from '@material-ui/core';
import CheckCircleOutlineRoundedIcon from '@material-ui/icons/CheckCircleOutlineRounded';

class GameCard extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            markCardWrapperClasses: props.card.chosen ? 'markCardWrapper' : 'markCardWrapper hide',
        };
    }

    render() {
        return (
            <div className="playingCardScene" onClick={() => this.props.onClick(this.props.card)}>
                <div className={this.props.card.flipped ? 'playingCard isFlipped' : 'playingCard'}>
                    <Card className="playingCardFace card-face-reverse"/>
                    <div className={this.state.markCardWrapperClasses}>
                        <CheckCircleOutlineRoundedIcon className="markCard"/>
                    </div>
                    <Card className={`playingCardFace playingCardFace--front card-face-${this.props.card.face}`}/>
                </div>
            </div>
        );
    }
}

GameCard.propTypes = {
    card: PropTypes.object,
    onClick: PropTypes.func,
};

export default GameCard;