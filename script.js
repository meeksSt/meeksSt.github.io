import { findCorrectBeer } from './calculator.js';
import { generateAllRecipes } from './calculator.js';

const PROPERTY_THRESHOLD = 10;

const createRecipeCard = (card) => {
    const properties = Object.entries(card.properties).filter(([key, value]) => value >= PROPERTY_THRESHOLD).map(([key, value]) => key[0].toUpperCase() + key.slice(1)).join('<br>');

    const newCard = document.createElement("div");
    newCard.classList = "recipe";

    newCard.innerHTML = `
        <fieldset>
            <legend>Malt</legend>
            <span>${card.malt}</span>
        </fieldset>
        <fieldset>
            <legend>Hop</legend>
            <span>${card.hop}</span>
        </fieldset>
        <fieldset>
            <legend>Yeast</legend>
            <span>${card.yeast}</span>
        </fieldset>
        <span>${properties}</span>
    `;

    recipesBlock.appendChild(newCard);
};

const createRecipesList = (items) => {
    items.sort((a, b) => a.cntProps - b.cntProps).reverse().forEach(item => createRecipeCard(item));
};
const AllRecipes = generateAllRecipes();

const recipesBlock = document.querySelector(".recipes");

const clearRecipesList = () => recipesBlock.innerHTML = '';

const beerProperties = [];
let beerSort = 'bristford';
let recipes = findCorrectBeer(beerSort, beerProperties, AllRecipes, PROPERTY_THRESHOLD);

createRecipesList(recipes);

document.addEventListener("click", (event) => {
    if (event.target.classList.contains("btn") && !event.target.classList.contains("active--style")) {
        document.querySelector(".active--style").classList.remove("active--style");
        event.target.classList.add("active--style");

        beerSort = event.target.id;

        recipes = findCorrectBeer(beerSort, beerProperties, AllRecipes, PROPERTY_THRESHOLD);
        clearRecipesList();
        createRecipesList(recipes);
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

        recipes = findCorrectBeer(beerSort, beerProperties, AllRecipes, PROPERTY_THRESHOLD);
        clearRecipesList();
        createRecipesList(recipes);
    };

    if (document.querySelectorAll(".recipe").length == 0) {
            recipesBlock.innerHTML = "No recipes found..";
            recipesBlock.classList.add("empty");
        }
    else recipesBlock.classList.remove("empty");
});