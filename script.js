import { findCorrectBeer } from './calculator.js';

const createReceiptCard = (card) => {
    const newCard = document.createElement("div");
    newCard.classList = "receipt";

    const maltField = document.createElement("fieldset");

    const maltLegend = document.createElement("legend");
    maltLegend.appendChild(document.createTextNode("Malt"));

    const maltSpan = document.createElement("span");
    maltSpan.appendChild(document.createTextNode(card.malt));

    maltField.appendChild(maltLegend);
    maltField.appendChild(maltSpan);

    const hopField = document.createElement("fieldset");

    const hopLegend = document.createElement("legend");
    hopLegend.appendChild(document.createTextNode("Hop"));

    const hopSpan = document.createElement("span");
    hopSpan.appendChild(document.createTextNode(card.hop));

    hopField.appendChild(hopLegend);
    hopField.appendChild(hopSpan);

    const yeastField = document.createElement("fieldset");

    const yeastLegend = document.createElement("legend");
    yeastLegend.appendChild(document.createTextNode("Yeast"));

    const yeastSpan = document.createElement("span");
    yeastSpan.appendChild(document.createTextNode(card.yeast));

    yeastField.appendChild(yeastLegend);
    yeastField.appendChild(yeastSpan);

    newCard.appendChild(maltField);
    newCard.appendChild(hopField);
    newCard.appendChild(yeastField);

    const propSpan = document.createElement("span");
    const properties = Object.entries(card.properties).filter(([key, value]) => value >= 10).map(([key, value]) => key[0].toUpperCase() + key.slice(1));

    propSpan.innerHTML = properties.join('<br>');
    newCard.appendChild(propSpan);
    receiptsBlock.appendChild(newCard);
};

const createReceiptList = (items) => {
    items.sort((a, b) => a.cntProps - b.cntProps).reverse().forEach(item => createReceiptCard(item) );
};

const clearReceiptList = () => document.querySelector(".receipts").innerHTML = '';


const receiptsBlock = document.querySelector(".receipts");
const beerProperties = [];
let beerSort = 'bristford';
let receipts = findCorrectBeer(beerSort, beerProperties);

createReceiptList(receipts);

document.addEventListener("click", (event) => {
    if (event.target.classList.contains("btn") && !event.target.classList.contains("active--style")) {
        document.querySelector(".active--style").classList.remove("active--style");
        event.target.classList.add("active--style");

        beerSort = event.target.id;

        receipts = findCorrectBeer(beerSort, beerProperties);
        clearReceiptList();
        createReceiptList(receipts);
    };

    if (event.target.classList.contains("btn-small")) {
        if (beerProperties.includes(event.target.id)) {
            event.target.classList.remove("active--prop");
            beerProperties.splice(beerProperties.indexOf(event.target.id), 1)
        }
        else {
            event.target.classList.add("active--prop")
            beerProperties.push(event.target.id) 
        };

        receipts = findCorrectBeer(beerSort, beerProperties);
        clearReceiptList();
        createReceiptList(receipts);
    };

    if (document.querySelectorAll(".receipt").length == 0) {
            document.querySelector(".receipts").innerHTML = "No recipes found..";
            document.querySelector(".receipts").classList.add("empty");
        }
    else document.querySelector(".receipts").classList.remove("empty");
});