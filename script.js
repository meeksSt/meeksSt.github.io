import { 
    findCorrectBeer,
    generateAllRecipes
} from './calculator.js';

const PROPERTY_THRESHOLD = 10;
const recipesList = document.querySelector(".recipes__list");
const allRecipes = generateAllRecipes();
const hint = document.querySelector(".recipe-options__hint");
const tabs = document.querySelectorAll(".recipes__tab")
const favoritesList = document.querySelector(".recipes__favorites");

const createRecipeCard = (card) => {
    const properties = Object.entries(card.properties).filter(([key, value]) => value >= PROPERTY_THRESHOLD).map(([key, value]) => key[0].toUpperCase() + key.slice(1)).join('<br>');

    const newCard = document.createElement("div");
    newCard.classList = "recipe";
    newCard.setAttribute("data-id", card.id);

    newCard.innerHTML = `
        <div class="recipe__info">                
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

        <div class="recipe__options recipe-options">

            <div class="recipe-options__copy">
                <div class="recipe-options__hint recipe-options__hint--hidden">Copied!</div>

                <button class="button recipe-options__button">
                    <img class="recipe-options__icon recipe-options__icon--copy" src="/images/copy-to-clipboard.svg" alt="copy to clipboard">
                    <img class="recipe-options__icon recipe-options__icon--copied" src="/images/copy-to-clipboard-check.svg" alt="copy to clipboard check">
                </button>
            </div>

            <div class="recipe-options__favorite">
                <div class="recipe-options__hint recipe-options__hint--hidden">Added!</div>

                <button class="button recipe-options__button">
                    <img class="recipe-options__icon" src="/images/add-to-favorites.svg" alt="add to favorites">
                </button>
            </div>
        </div>
    `;

    recipesList.appendChild(newCard);
};

const createRecipesList = (items) => {
    [...items].sort((a, b) => a.cntProps - b.cntProps).reverse().forEach(item => createRecipeCard(item));
};

const clearRecipesList = () => recipesList.innerHTML = '';

const handleStyleClick = (event) => {
    document.querySelector(".styles__button--active").classList.remove("styles__button--active");
    event.target.classList.add("styles__button--active");

    beerSort = event.target.id;

    recipes = findCorrectBeer(beerSort, beerProperties, allRecipes);
    clearRecipesList();
    createRecipesList(recipes);
};

const handlePropertyClick = (event) => {
    if (beerProperties.includes(event.target.id)) {
        event.target.classList.remove("properties__button--active");
        beerProperties.splice(beerProperties.indexOf(event.target.id), 1)
    }
    else {
        event.target.classList.add("properties__button--active")
        beerProperties.push(event.target.id) 
    };

    recipes = findCorrectBeer(beerSort, beerProperties, allRecipes, PROPERTY_THRESHOLD);
    clearRecipesList();
    createRecipesList(recipes);
};

const handleTabClick = (event) => {
    tabs.forEach(tab => {
        if (tab.classList.contains("recipes__tab--active")) {
            tab.classList.remove("recipes__tab--active");
        };
    });

    if (!event.target.classList.contains("recipes__tab--active")) {
        event.target.classList.add("recipes__tab--active");
    };

    if (event.target.dataset.tab == "favorites") {
        favoritesList.classList.add("recipes__favorites--active");
        recipesList.classList.remove("recipes__list--active");
    };

    if (event.target.dataset.tab == "recipes") {
        recipesList.classList.add("recipes__list--active");
        favoritesList.classList.remove("recipes__favorites--active");
    };
        
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

    event.target.classList.add('recipe-options__button--copied');
    event.target.previousElementSibling.classList.remove('recipe-options__hint--hidden');

    setTimeout(() => {
        event.target.classList.remove('recipe-options__button--copied');
        event.target.previousElementSibling.classList.add('recipe-options__hint--hidden');
    }, 2000);
};

const beerProperties = [];
let beerSort = 'bristford';
let recipes = findCorrectBeer(beerSort, beerProperties, allRecipes, PROPERTY_THRESHOLD);

createRecipesList(recipes);

document.addEventListener("click", (event) => {
    if (event.target.classList.contains("styles__button") && !event.target.classList.contains("styles__button--active")) handleStyleClick(event);

    if (event.target.classList.contains("properties__button")) handlePropertyClick(event);

    if (event.target.classList.contains("recipe-options__button") && event.target.previousElementSibling.classList.contains("recipe-options__hint--hidden")) handleCopyClick(event);

    if (event.target.classList.contains("recipe-options__button") && event.target.previousElementSibling.classList.contains("recipe-options__hint--hidden")) handleCopyClick(event);

    if (event.target.classList.contains("recipes__tab")) handleTabClick(event);

    if (recipesList.children.length == 0) {
        recipesList.innerHTML = "No recipes found..";
        recipesList.classList.add("recipes__list--empty");

    }
    else recipesList.classList.remove("recipes__list--empty");

    if (favoritesList.children.length == 0) {
        favoritesList.innerHTML = "No recipes found..";
        favoritesList.classList.add("recipes__favorites--empty");

    }
    else favoritesList.classList.remove("recipes__favorites--empty");
});
