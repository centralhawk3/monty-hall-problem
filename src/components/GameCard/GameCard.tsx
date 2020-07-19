import React from 'react';
import PropTypes from 'prop-types';

import { Card } from '@material-ui/core';
import CheckCircleOutlineRoundedIcon from '@material-ui/icons/CheckCircleOutlineRounded';

type GameCardProps = {
  card: ,
  onClick: void
}

const GameCard = ({
  card,
  onClick,
}: GameCardProps) => (
  <div className="playingCardScene" onKeyPress={() => onClick(card)} onClick={() => onClick(card)} role="button">
    <div className={card.flipped ? 'playingCard isFlipped' : 'playingCard'}>
      <Card className="playingCardFace card-face-reverse" />
      <div className={card.chosen ? 'markCardWrapper' : 'markCardWrapper hide'}>
        <CheckCircleOutlineRoundedIcon className="markCard" />
      </div>
      <Card className={`playingCardFace playingCardFace--front card-face-${card.face}`} />
    </div>
  </div>
);

GameCard.propTypes = {
  card: PropTypes.shape({
    face: PropTypes.string.isRequired,
    flipped: PropTypes.bool.isRequired,
    chosen: PropTypes.bool.isRequired,
  }).isRequired,
  onClick: PropTypes.func.isRequired,
};

export default GameCard;