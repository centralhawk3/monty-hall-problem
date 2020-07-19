export const fractionToPercentageTransform = (numerator: number, denominator: number, dp = 0): string => {
    if (isNaN(numerator / denominator)) {
        return '0';
    }

    return (numerator / denominator * 100).toFixed(dp);
}