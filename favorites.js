export const addToStorage = (id) => {
    localStorage.setItem(id, id);
};

export const removeFromStorage = (id) => {
    localStorage.removeItem(id);
};
