import { 
    findCorrectBeer,
    generateAllRecipes
} from './calculator.js';

import { 
    addToStorage,
    removeFromStorage
} from './favorites.js';

import { 
    copyTextToClipboard
} from './clipboard.js';

import { 
    handleTabClick
} from './tabs.js';

import { 
    createRecipeCard
} from './render.js';

const PROPERTY_THRESHOLD = 10;
const recipesContainer = document.querySelector(".recipes");
const recipesList = document.querySelector(".recipes__list");
const favoritesList = document.querySelector(".recipes__favorites");
const allRecipes = generateAllRecipes();
const recipesEmpty = recipesList.querySelector(".recipes__empty");
const favoritesEmpty = favoritesList.querySelector(".recipes__empty");

const beerProperties = [];
let beerSort = 'bristford';
let recipes = findCorrectBeer(beerSort, beerProperties, allRecipes, PROPERTY_THRESHOLD);


const createRecipesList = (items) => {

    [...items].sort((a, b) => a.cntProps - b.cntProps).reverse().forEach(item => {
        const card = createRecipeCard(item, PROPERTY_THRESHOLD);

        if (localStorage.getItem(item.id) !== null) addFavoritesClass(card);
        recipesList.appendChild(card);
    });
};

const clearRecipesList = () => {
    recipesList.querySelectorAll(".recipe").forEach(element => element.remove());
};

const addFavoritesClass = (card) => {
    card.querySelector(".button__favorite").classList.add('recipe-options__button--favorited');
};

const addToFavorites = () => {
    Object.entries(localStorage).forEach(key => {
        const card = createRecipeCard(allRecipes[key[0]], PROPERTY_THRESHOLD);
        
        const cloneCard = card.cloneNode(true);
        favoritesList.appendChild(cloneCard);
        addFavoritesClass(cloneCard);
    });
};

const handleStyleClick = (event) => {
    console.log(event)
    document.querySelector(".styles__button--active").classList.remove("styles__button--active");
    event.target.classList.add("styles__button--active");

    beerSort = event.target.id;
    recipes = findCorrectBeer(beerSort, beerProperties, allRecipes, PROPERTY_THRESHOLD);

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

// const handleTabClick = (event) => {
//     tabs.forEach(tab => {
//         if (tab.classList.contains("recipes__tab--active")) tab.classList.remove("recipes__tab--active");
//     });

//     if (!event.target.classList.contains("recipes__tab--active")) {
//         event.target.classList.add("recipes__tab--active");
//     };

//     if (event.target.dataset.tab == "favorites") {
//         favoritesList.classList.add("recipes__favorites--active");
//         recipesList.classList.remove("recipes__list--active");
//     };

//     if (event.target.dataset.tab == "recipes") {
//         recipesList.classList.add("recipes__list--active");
//         favoritesList.classList.remove("recipes__favorites--active");
//     };
        
// };

const handleCopyClick = (event) => {
    const recipeId = event.target.closest('.recipe').dataset.id
    copyTextToClipboard(allRecipes[recipeId]);

    event.target.classList.add('recipe-options__button--copied');
    event.target.previousElementSibling.classList.remove('recipe-options__hint--hidden');

    setTimeout(() => {
        event.target.classList.remove('recipe-options__button--copied');
        event.target.previousElementSibling.classList.add('recipe-options__hint--hidden');
    }, 2000);
};

const handleAddToFavoritesClick = (event) => {
    const cardId = event.target.closest(".recipe").dataset.id;
    const card = document.querySelector(`[data-id="${cardId}"]`);
    const cloneCard = card.cloneNode(true);

    if (cardId in localStorage) {
        removeFromStorage(cardId);
        favoritesList.querySelector(`[data-id="${cardId}"]`).remove();
        
        if (recipesList.querySelector(`[data-id="${cardId}"]`) !== null) recipesList.querySelector(`[data-id="${cardId}"]`).querySelector(".button__favorite").classList.remove('recipe-options__button--favorited');
    }   
    else {
        addToStorage(cardId);
        favoritesList.appendChild(cloneCard);
        favoritesList.querySelector(`[data-id="${cardId}"]`).querySelector(".button__favorite").classList.add('recipe-options__button--favorited');
        recipesList.querySelector(`[data-id="${cardId}"]`).querySelector(".button__favorite").classList.add('recipe-options__button--favorited');
    };
};


createRecipesList(recipes);
addToFavorites();

document.addEventListener("click", (event) => {
    if (event.target.classList.contains("styles__button") && !event.target.classList.contains("styles__button--active")) handleStyleClick(event);

    if (event.target.classList.contains("properties__button")) handlePropertyClick(event);

    if (event.target.classList.contains("button__copy") && event.target.closest(".recipe-options__copy").querySelector(".recipe-options__hint--hidden")) handleCopyClick(event);

    if (event.target.classList.contains("button__favorite")) handleAddToFavoritesClick(event);

    if (event.target.classList.contains("recipes__tab")) handleTabClick(event.target, recipesContainer);
    
    if (recipesList.querySelectorAll(".recipe").length == 0) {
        recipesEmpty.classList.remove("recipes__empty--hidden")
    }
    else {
        recipesEmpty.classList.add("recipes__empty--hidden");
    };

    if (favoritesList.querySelectorAll(".recipe").length == 0) favoritesEmpty.classList.remove("recipes__empty--hidden")
    else favoritesEmpty.classList.add("recipes__empty--hidden");
});
