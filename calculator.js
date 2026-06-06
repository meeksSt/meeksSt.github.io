import { malts } from './ingredients/malts.js';
import { hops } from './ingredients/hops.js';
import { yeasts } from './ingredients/yeasts.js';

const beerStyles = {
    bristford: "Bristford Ale",
    hallbruck: "Hallbruck Hellas",
    cascadear: "Cascadear IPA",
    gravenford: "Gravenford Stout",
    frosthaven: "Frosthaven Witbier",
    sunvalen: "Sunvalen Saison"
};

export const findCorrectBeer = (beerStyle, beerProperties) => {
    const recipes = [];
    
    malts.forEach(malt => {
        hops.forEach(hop => {
            yeasts.forEach(yeast => {
                const properties = {
                    refreshment: malt.properties.refreshment + hop.properties.refreshment + yeast.properties.refreshment,
                    heaviness: malt.properties.heaviness + hop.properties.heaviness + yeast.properties.heaviness,
                    lightness: malt.properties.lightness + hop.properties.lightness + yeast.properties.lightness,
                    acidity: malt.properties.acidity + hop.properties.acidity + yeast.properties.acidity,
                    sweetness: malt.properties.sweetness + hop.properties.sweetness + yeast.properties.sweetness
                };

                const styles = {
                    bristford: malt.styles.bristford + hop.styles.bristford + yeast.styles.bristford,
                    hallbruck: malt.styles.hallbruck + hop.styles.hallbruck + yeast.styles.hallbruck,
                    cascadear: malt.styles.cascadear + hop.styles.cascadear + yeast.styles.cascadear,
                    gravenford: malt.styles.gravenford + hop.styles.gravenford + yeast.styles.gravenford,
                    frosthaven: malt.styles.frosthaven + hop.styles.frosthaven + yeast.styles.frosthaven,
                    sunvalen: malt.styles.sunvalen + hop.styles.sunvalen + yeast.styles.sunvalen
                };

                let isFits = true;

                if (Object.keys(styles).reduce((a, b) => styles[a] > styles[b] ? a : b) == beerStyle) {
                    beerProperties.forEach(property => { if (properties[property] < 10) isFits = false });

                    if (isFits) {
                        const recipe = {
                            id: beerStyle,
                            name: beerStyles[beerStyle],
                            malt: malt.name,
                            hop: hop.name,
                            yeast: yeast.name,
                            cntProps: Object.values(properties).filter(value => value >= 10).length,
                            properties: properties
                        };

                        recipes.push(recipe);
                    };
                };
            });
        });
    });
    
    return recipes;
};