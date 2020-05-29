export const fractionToPercentageTransform = (numerator, denominator, dp = 0) => {
    if (isNaN(numerator / denominator)) {
        return 0;
    }

    return parseFloat(numerator / denominator * 100).toFixed(dp);
}