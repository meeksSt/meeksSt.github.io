import { 
    findCorrectBeer,
    generateAllRecipes
} from './calculator.js';

import { 
    addToStorage,
    removeFromStorage
} from './favorites.js';

const PROPERTY_THRESHOLD = 10;
const recipesList = document.querySelector(".recipes__list");
const favoritesList = document.querySelector(".recipes__favorites");
const allRecipes = generateAllRecipes();
const hint = document.querySelector(".recipe-options__hint");
const tabs = document.querySelectorAll(".recipes__tab");
const recipesEmpty = recipesList.querySelector(".recipes__empty");
const favoritesEmpty = favoritesList.querySelector(".recipes__empty");

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
                <div class="recipe-options__hint recipe-options__hint--hidden recipe-options__hint--copied">Copied!</div>

                <button class="button recipe-options__button button__copy">
                    <img class="recipe-options__icon recipe-options__icon--copy" src="images/copy-to-clipboard.svg" alt="copy to clipboard">
                    <img class="recipe-options__icon recipe-options__icon--copied" src="images/copy-to-clipboard-check.svg" alt="copy to clipboard check">
                </button>
            </div>

            <div class="recipe-options__favorite">
                <button class="button recipe-options__button button__favorite">
                    <img class="recipe-options__icon recipe-options__icon--favorite" src="images/add-to-favorites.svg" alt="add to favorites">
                    <img class="recipe-options__icon recipe-options__icon--favorited" src="images/add-to-favorites-check.svg" alt="add to favorites">
                </button>
            </div>
        </div>
    `;

    if (localStorage.getItem(card.id) !== null) newCard.querySelector(".button__favorite").classList.add("recipe-options__button--favorited");
    recipesList.appendChild(newCard);
};

const createRecipesList = (items) => {
    [...items].sort((a, b) => a.cntProps - b.cntProps).reverse().forEach(item => createRecipeCard(item));
};

const clearRecipesList = () => {
    recipesList.querySelectorAll(".recipe").forEach(element => element.remove());
};

const addToFavorites = () => {
    Object.entries(localStorage).forEach(key => {
        const card = document.querySelector(`[data-id="${key[0]}"]`);
        const cloneCard = card.cloneNode(true);
        favoritesList.appendChild(cloneCard);
        favoritesList.querySelector(`[data-id="${key[0]}"]`).querySelector(".button__favorite").classList.add('recipe-options__button--favorited');
    });
};

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

console.log(localStorage)
// localStorage.clear();

const handleAddToFavoritesClick = (event) => {
    const cardId = event.target.closest(".recipe").dataset.id;
    const card = document.querySelector(`[data-id="${cardId}"]`);
    const cloneCard = card.cloneNode(true);

    if (cardId in localStorage) {
        removeFromStorage(cardId);
        favoritesList.querySelector(`[data-id="${cardId}"]`).remove();
        
        if (recipesList.querySelectorAll(".recipe").length > 0) recipesList.querySelector(`[data-id="${cardId}"]`).querySelector(".button__favorite").classList.remove('recipe-options__button--favorited');
    }   
    else {
        addToStorage(cardId);
        favoritesList.appendChild(cloneCard);
        favoritesList.querySelector(`[data-id="${cardId}"]`).querySelector(".button__favorite").classList.add('recipe-options__button--favorited');
        recipesList.querySelector(`[data-id="${cardId}"]`).querySelector(".button__favorite").classList.add('recipe-options__button--favorited');
    };
};

const beerProperties = [];
let beerSort = 'bristford';
let recipes = findCorrectBeer(beerSort, beerProperties, allRecipes, PROPERTY_THRESHOLD);

createRecipesList(recipes);
addToFavorites();

document.addEventListener("click", (event) => {
    if (event.target.classList.contains("styles__button") && !event.target.classList.contains("styles__button--active")) handleStyleClick(event);

    if (event.target.classList.contains("properties__button")) handlePropertyClick(event);

    if (event.target.classList.contains("button__copy") && event.target.closest(".recipe-options__copy").querySelector(".recipe-options__hint--hidden")) handleCopyClick(event);

    if (event.target.classList.contains("button__favorite")) handleAddToFavoritesClick(event);

    if (event.target.classList.contains("recipes__tab")) handleTabClick(event);
    
    if (recipesList.querySelectorAll(".recipe").length == 0) {
        recipesEmpty.classList.remove("recipes__empty--hidden")
    }
    else {
        recipesEmpty.classList.add("recipes__empty--hidden");
    };

    if (favoritesList.querySelectorAll(".recipe").length == 0) favoritesEmpty.classList.remove("recipes__empty--hidden")
    else favoritesEmpty.classList.add("recipes__empty--hidden");
});
