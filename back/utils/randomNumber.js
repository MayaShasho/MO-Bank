export const GenerateRandomNumber = (min, max) => {
    return Math.floor(Math.random() * (max - min)) + min;
};