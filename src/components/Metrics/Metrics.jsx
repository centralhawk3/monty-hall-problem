import React from 'react';
import PropTypes from 'prop-types';
import { fractionToPercentageTransform } from 'transforms/common';

const Metrics = ({
  winsWithoutSwitching,
  lossesWithoutSwitching,
  winsWithSwitching,
  lossesWithSwitching,
  totalGamesPlayed,
}) => {
  const winPercentWithSwitching = fractionToPercentageTransform(
    winsWithSwitching,
    winsWithSwitching + lossesWithSwitching,
  );
  const winPercentWithoutSwitching = fractionToPercentageTransform(
    winsWithoutSwitching,
    winsWithoutSwitching + lossesWithoutSwitching,
  );

  return (
    <div className="metrics">
      <div className="metricBox">
        Rounds:
        {totalGamesPlayed}
      </div>
      {winPercentWithoutSwitching > 0
      && (
        <div className="metricBox">
          WWOS:
          {winPercentWithoutSwitching}
          %
        </div>
      )}
      {winPercentWithSwitching > 0
      && (
        <div className="metricBox">
          WWS:
          {winPercentWithSwitching}
          %
        </div>
      )}
    </div>
  );
};

Metrics.propTypes = {
  winsWithoutSwitching: PropTypes.number.isRequired,
  lossesWithoutSwitching: PropTypes.number.isRequired,
  winsWithSwitching: PropTypes.number.isRequired,
  lossesWithSwitching: PropTypes.number.isRequired,
  totalGamesPlayed: PropTypes.number.isRequired,
};

export default Metrics;
