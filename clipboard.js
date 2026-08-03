const getRecipeText = (recipe) => `
🍺${recipe.name}

Malt: ${recipe.malt}
Hop: ${recipe.hop}
Yeast: ${recipe.yeast}

Properties: 
• ${recipe.propertiesThreshold.join("\n• ")}
`.trim();

export const copyTextToClipboard = (recipe) => {
    navigator.clipboard.writeText(getRecipeText(recipe));
};