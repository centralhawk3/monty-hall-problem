import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { toPercentageTransform } from 'transforms/common';

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

		const winPercentWithSwitching = toPercentageTransform(winsWithSwitching / (winsWithSwitching + lossesWithSwitching));
		const lossPercentWithSwitching = toPercentageTransform(lossesWithSwitching / (winsWithSwitching + lossesWithSwitching));
		const winPercentWithoutSwitching = toPercentageTransform(winsWithoutSwitching / (winsWithoutSwitching + lossesWithoutSwitching));
		const lossPercentWithoutSwitching = toPercentageTransform(lossesWithoutSwitching / (winsWithoutSwitching + lossesWithoutSwitching));

		return (
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
    	);
	}
}

Metrics.PropTypes = {
	data: PropTypes.object,
};

export default Metrics;