import { findCorrectBeer } from './calculator.js';

const createReceiptCard = (card) => {
    const newCard = document.createElement("div");
    newCard.classList = "receipt";

    const cardName = document.createElement("span");
    cardName.appendChild(document.createTextNode(card.name));

    const cardMalt = document.createElement("span");
    cardMalt.appendChild(document.createTextNode(card.malt));

    const cardHop = document.createElement("span");
    cardHop.appendChild(document.createTextNode(card.hop));

    const cardYeast = document.createElement("span");
    cardYeast.appendChild(document.createTextNode(card.yeast));

    newCard.appendChild(cardName);
    newCard.appendChild(cardMalt);
    newCard.appendChild(cardHop);
    newCard.appendChild(cardYeast);

    const cardProperties = document.createElement("div");

    Object.keys(card.properties).forEach(element => {
        const cardProperty = document.createElement("span");
        const propertyName = element.charAt(0).toUpperCase() + element.slice(1);

        cardProperty.appendChild(document.createTextNode(`${propertyName}: ${card.properties[element]}`));
        cardProperties.appendChild(cardProperty);
    });

    newCard.appendChild(cardProperties);

    receiptsBlock.appendChild(newCard);
};

const createReceiptList = (items) => {
    items.forEach(item => {
        createReceiptCard(item);
    });
};

const clearReceiptList = () => {
    document.getElementById("receipts").innerHTML = '';
};


const receiptsBlock = document.getElementById("receipts");
const beerProperties = [];
let beerSort = 'bristford';
let receipts = findCorrectBeer(beerSort, beerProperties);

createReceiptList(receipts);

document.addEventListener("click", (event) => {
    if (event.target.name == "beer-style") {
        beerSort = event.target.id;

        receipts = findCorrectBeer(beerSort, beerProperties);
        clearReceiptList();
        createReceiptList(receipts);
    };

    if (event.target.name == "beer-property") {
        if (event.target.checked && !beerProperties.includes(event.target.id)) beerProperties.push(event.target.id);
        else beerProperties.splice(beerProperties.indexOf(event.target.id), 1);

        receipts = findCorrectBeer(beerSort, beerProperties);
        clearReceiptList();
        createReceiptList(receipts);
    };
});
