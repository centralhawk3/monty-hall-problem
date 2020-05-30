import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { fractionToPercentageTransform } from 'transforms/common';

const Metrics = (props) => {
    const {
        winsWithoutSwitching,
        lossesWithoutSwitching,
        winsWithSwitching,
        lossesWithSwitching,
        gamesPlayedTotal,
    } = props.data;

    const winPercentWithSwitching = fractionToPercentageTransform(winsWithSwitching, winsWithSwitching + lossesWithSwitching);
    const winPercentWithoutSwitching = fractionToPercentageTransform(winsWithoutSwitching, winsWithoutSwitching + lossesWithoutSwitching);

    return (
        <div className="metrics">
            <div className="metricBox">
                Rounds: {gamesPlayedTotal}
            </div>
            {winPercentWithoutSwitching > 0 &&
            <div className="metricBox">
                WWOS: {winPercentWithoutSwitching}%
            </div>
            }
            {winPercentWithSwitching > 0 &&
            <div className="metricBox">
                WWS: {winPercentWithSwitching}%
            </div>
            }
        </div>
    );
};

Metrics.PropTypes = {
    data: PropTypes.object,
};

export default Metrics;