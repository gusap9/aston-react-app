import React from "react";
import styles from "./SingleRecipe.module.css";
import checkbox from "../../assets/checkbox.svg";
import { useParams } from "react-router-dom";
import { useSingleRecipeQuery } from "../../store/recipesApi";
import Loader from "../Loader/Loader";
import Search from "../Search/Search";
import { recipeConverter } from "./recipeConverter";

const SingleRecipe = () => {
    const {id} = useParams();
    const { data, isLoading } = useSingleRecipeQuery(id);
    let instructions = data.meals[0].strInstructions.split("\r\n");
    instructions = instructions?.filter(
        (instruction) => instruction.length > 1,
    );
    let recipe = data.meals;
    recipe = recipeConverter({ recipe })
    if (isLoading) {
        return <Loader />;
    }
    return (
        <div className={styles.container}>
            <Search />
            <div className={styles.title}>Recipe Details</div>
            <section className={styles.details}>
                <div className={styles.head}>
                    <div className={styles.head_img}>
                        <img src={recipe?.thumbnail} alt="Recipe Image" />
                    </div>
                    <div className={styles.intro}>
                        <div className={styles.intro_title}>
                            {recipe?.title}
                        </div>
                        <div className={styles.intro_main}>
                            <div className={styles.category}>
                                <span className={styles.category_span1}>
                                    category: &nbsp;
                                </span>
                                <span>{recipe?.category}</span>
                            </div>

                            <div className={styles.source}>
                                <span>Source: &nbsp;</span>
                                <a href={recipe.source}>
                                    {recipe.source
                                        ? recipe.source.substring(0, 40) + "..."
                                        : "Not found"}
                                </a>
                            </div>
                        </div>
                        <div className={styles.ingredients}>
                            <div className={styles.ingredients_title}>
                                Ingredients
                            </div>
                            <ul className={styles.ingredients_list}>
                                {recipe?.ingredients?.map((ingredient, idx) => (
                                    <li key={idx}>
                                        <span
                                            className={
                                                styles.ingredients_list_dot
                                            }
                                        >
                                            {idx + 1}
                                        </span>
                                        <span>{ingredient}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>

                <div className={styles.body}>
                    <div className={styles.measures}>
                        <div className={styles.measures_title}>Measure:</div>
                        <ul className={styles.measures_list}>
                            {recipe?.measures?.map((measure, idx) => (
                                <li key={idx}>
                                    <span
                                        className={styles.measures_list_span1}
                                    ></span>
                                    <span>{measure}</span>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div className={styles.instructions}>
                        <div className={styles.instructions_title}>
                            Instructions:
                        </div>
                        <ul className={styles.instructions_list}>
                            {instructions.map((instruction, idx) => (
                                <li key={idx}>
                                    <img src={checkbox} size={18} />
                                    <span>{instruction}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default SingleRecipe;
