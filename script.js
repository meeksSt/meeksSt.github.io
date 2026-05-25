import { findCorrectBeer } from './calculator.js';

const beerProperties = []
let beerSort = 'bristford';
let receipts;

document.addEventListener("click", (event) => {
    if (event.target.name == "beer-style") {
        beerSort = event.target.id;

        receipts = findCorrectBeer(beerSort, beerProperties);
        console.log(receipts);
    };

    if (event.target.name == "beer-property") {
        if (event.target.checked && !beerProperties.includes(event.target.id)) beerProperties.push(event.target.id);
        else beerProperties.splice(beerProperties.indexOf(event.target.id), 1);

        receipts = findCorrectBeer(beerSort, beerProperties);
        console.log(receipts);
    };
});

const createReceiptList = () => {};

const createReceiptCard = () => {};
