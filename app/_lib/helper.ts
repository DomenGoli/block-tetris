import { shapesList } from "./shapeList";
import { shapeWeight } from "./shapeWeight";


export function getRandomIndex(numOfElements: number) {
    return Math.floor(Math.random() * numOfElements);
}

export function shuffle() {
    return Math.random() - 0.5;
}

export function coinFlip(weight: number) {
    const randomNumber = Math.random();

    if (randomNumber < weight) return true;
    else return false;
}

export function getRandomShapes() {
    const numberOfUniqueShapes = shapesList.length
    const randomShapesList = [];

    while (randomShapesList.length < 3) {
        const randomIndex = getRandomIndex(numberOfUniqueShapes);
        const uniqueShape = shapesList[randomIndex];
        const weight = shapeWeight[uniqueShape.name]
        // weight funkcionalnost
        if (coinFlip(weight))
            randomShapesList.push(uniqueShape?.directions.sort(shuffle)[0]);
    }
    return randomShapesList
}
