export const createRecipeCard = (card, propThreshold) => {
    const properties = Object.entries(card.properties).filter(([key, value]) => value >= propThreshold).map(([key, value]) => key[0].toUpperCase() + key.slice(1)).join('<br>');

    const newCard = document.createElement("div");
    newCard.classList = "recipe";
    newCard.setAttribute("data-id", card.id);

    newCard.innerHTML = `
        <div class="recipe__info">  
            <span class="recipe__name">${card.name}</span>    
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

    return newCard;
};

export const addFavoritesClass = (card) => {
    card.querySelector(".button__favorite").classList.add('recipe-options__button--favorited');
};
