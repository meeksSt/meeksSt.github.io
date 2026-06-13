import { 
    findCorrectBeer,
    generateAllRecipes
} from './calculator.js';

const PROPERTY_THRESHOLD = 10;
const recipesBlock = document.querySelector(".recipes");
const allRecipes = generateAllRecipes();
const hint = document.querySelector(".hint--copied");

const createRecipeCard = (card) => {
    const properties = Object.entries(card.properties).filter(([key, value]) => value >= PROPERTY_THRESHOLD).map(([key, value]) => key[0].toUpperCase() + key.slice(1)).join('<br>');

    const newCard = document.createElement("div");
    newCard.classList = "recipe";
    newCard.setAttribute("data-id", card.id);

    newCard.innerHTML = `
        <div class="recipe--info">                
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
        </div>

        <div class="recipe--options">
            <div class="hint--copied">Copied!</div>
            <button class="btn--options">
                <img class="btn--copy" src="/images/copy-to-clipboard.svg" alt="copy to clipboard">
                <img class="btn--copied" src="/images/copy-to-clipboard-check.svg" alt="copy to clipboard check">
            </button>
        </div>
    `;

    recipesBlock.appendChild(newCard);
};

const createRecipesList = (items) => {
    [...items].sort((a, b) => a.cntProps - b.cntProps).reverse().forEach(item => createRecipeCard(item));
};

const clearRecipesList = () => recipesBlock.innerHTML = '';

const handleStyleClick = (event) => {
    document.querySelector(".active--style").classList.remove("active--style");
    event.target.classList.add("active--style");

    beerSort = event.target.id;

    recipes = findCorrectBeer(beerSort, beerProperties, allRecipes);
    clearRecipesList();
    createRecipesList(recipes);
};

const handlePropertyClick = (event) => {
    if (beerProperties.includes(event.target.id)) {
        event.target.classList.remove("active--prop");
        beerProperties.splice(beerProperties.indexOf(event.target.id), 1)
    }
    else {
        event.target.classList.add("active--prop")
        beerProperties.push(event.target.id) 
    };

    recipes = findCorrectBeer(beerSort, beerProperties, allRecipes, PROPERTY_THRESHOLD);
    clearRecipesList();
    createRecipesList(recipes);
};

const getRecipeText = (recipe) => `
🍺${recipe.name}

Malt: ${recipe.malt}
Hop: ${recipe.hop}
Yeast: ${recipe.yeast}

Properties: 
• ${recipe.propertiesThreshold.join("\n• ")}
`.trim();

const copyTextToClipboard = (event) => {
    const recipeId = event.target.closest('.recipe').dataset.id;
    const recipe = recipes.find(({id}) => id == recipeId)

    navigator.clipboard.writeText(getRecipeText(recipe));
};

const handleCopyClick = (event) => {
    copyTextToClipboard(event);

    event.target.classList.add('copied');
    event.target.previousElementSibling.classList.add('enable');

    setTimeout(() => {
        event.target.classList.remove('copied');
        event.target.previousElementSibling.classList.remove('enable');
    }, 2000);
};

const beerProperties = [];
let beerSort = 'bristford';
let recipes = findCorrectBeer(beerSort, beerProperties, allRecipes, PROPERTY_THRESHOLD);

createRecipesList(recipes);

document.addEventListener("click", (event) => {
    if (event.target.classList.contains("btn") && !event.target.classList.contains("active--style")) {
        handleStyleClick(event);
    };

    if (event.target.classList.contains("btn-small")) {
        handlePropertyClick(event);
    };

    if (event.target.classList.contains("btn--options") && !event.target.classList.contains("copied")) {
        handleCopyClick(event);
    };

    if (document.querySelectorAll(".recipe").length == 0) {
        recipesBlock.innerHTML = "No recipes found..";
        recipesBlock.classList.add("empty");
    }
    else recipesBlock.classList.remove("empty");
});
