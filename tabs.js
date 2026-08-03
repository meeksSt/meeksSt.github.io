export const handleTabClick = (tabElement, recipesContainer) => {
    const currentTab = tabElement.dataset.tab;
    
    recipesContainer.querySelector(".recipes__tab--active").classList.remove("recipes__tab--active");
    recipesContainer.querySelector(".recipes__list--active").classList.remove("recipes__list--active");

    tabElement.classList.add("recipes__tab--active");
    recipesContainer.querySelector(`[data-list="${currentTab}"]`).classList.add("recipes__list--active");
};