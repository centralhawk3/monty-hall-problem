import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { fractionToPercentageTransform } from 'transforms/common';

class Metrics extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        const {
            data: {
                winsWithoutSwitching,
                lossesWithoutSwitching,
                winsWithSwitching,
                lossesWithSwitching,
                gamesPlayedTotal,
            },
        } = this.props;

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
    }
}

Metrics.PropTypes = {
    data: PropTypes.object,
};

export default Metrics;