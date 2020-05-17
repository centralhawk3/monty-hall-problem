import React, { Component } from 'react';
import PropTypes from 'prop-types';

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

		const winPercentWithSwitching = parseFloat((winsWithSwitching / gamesPlayedTotal) * 100).toFixed(2);
		const lossPercentWithSwitching = parseFloat((lossesWithSwitching / gamesPlayedTotal) * 100).toFixed(2);
		const winPercentWithoutSwitching = parseFloat((winsWithoutSwitching / gamesPlayedTotal) * 100).toFixed(2);
		const lossPercentWithoutSwitching = parseFloat((lossesWithoutSwitching / gamesPlayedTotal) * 100).toFixed(2);

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