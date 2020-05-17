export const toPercentageTransform = (number, dp = 0) => {
	if (isNaN(number)) {
		return 0;
	}

	return parseFloat(number * 100).toFixed(dp);
}