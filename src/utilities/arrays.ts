export const shuffleArray = <T>(arrayToBeShuffled: T[]): T[] => {
    const shuffledArray = [];
    while (arrayToBeShuffled.length > 0) {
        const randomNumber = Math.floor(Math.random() * arrayToBeShuffled.length);
        shuffledArray.push(arrayToBeShuffled[randomNumber]);
        arrayToBeShuffled.splice(randomNumber, 1);
    }

    return shuffledArray;
}