export const fractionToPercentageTransform = (numerator: number, denominator: number, dp = 0): number => {
    if (isNaN(numerator / denominator)) {
        return 0;
    }

    return parseFloat((numerator / denominator * 100).toFixed(dp));
}