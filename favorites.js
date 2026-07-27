const recipeStorage = window.localStorage;

export const addToFavorites = (id) => {
    localStorage.setItem(id, id);
 
    
};

export const removeFromFavorites = (id) => {
    localStorage.removeItem(id);

};
