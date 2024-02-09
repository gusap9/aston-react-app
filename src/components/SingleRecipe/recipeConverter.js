export const recipeConverter = ({ recipe }) => {
    let singleRecipe = {};
    if (recipe && recipe?.length > 0) {
        let ingredientsArr = [];
        let measuresArr = [];
        for (let props in recipe[0]) {
            if (props.includes("strIngredient")) {
                if (recipe[0][props]) ingredientsArr.push(recipe[0][props]);
            }

            if (props.includes("strMeasure")) {
                if (recipe[0][props]) {
                    if (recipe[0][props] != " ") {
                        measuresArr.push(recipe[0][props]);
                    }
                }
            }
        }
        for (let i = 0; i < measuresArr.length; i++) {
            measuresArr[i] = `${measuresArr[i]} ${ingredientsArr[i]}`;
        }
        singleRecipe = {
            id: recipe[0]?.idMeal,
            title: recipe[0]?.strMeal,
            category: recipe[0]?.strCategory,
            area: recipe[0]?.strArea,
            thumbnail: recipe[0]?.strMealThumb,
            instructions: recipe[0]?.strInstructions,
            source: recipe[0]?.strSource,
            tags: recipe[0]?.strTags,
            youtube: recipe[0]?.strYoutube,
            ingredients: ingredientsArr,
            measures: measuresArr,
        };
    }
    return singleRecipe;
};
