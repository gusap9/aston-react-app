import { useGetCategoryQuery } from "../../store/recipesApi";
import CategoryList from "../../components/Category/CategoryList";
import Loader from "../../components/Loader/Loader";

function Home() {
    const { data, isLoading } = useGetCategoryQuery();
    if (isLoading) return <Loader />;
    return <CategoryList categories={data.categories} />;
}

export default Home;
