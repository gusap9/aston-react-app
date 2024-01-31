import { useGetCategoryQuery } from "../../store/recipesApi";
// import RecipeList from "../../components/Recipes/RecipeList";
import CategoryList from "../../components/Category/CategoryList";
import Loader from "../../components/Loader/Loader";

function Home() {

    const { data, isLoading } = useGetCategoryQuery();
    console.log(isLoading);
    if (!isLoading) {
        console.log(data.categories);
        return <CategoryList categories={data.categories} />;
    }
    return <Loader />;
}

export default Home;
