import { useGetCategoryQuery } from "../../store/recipesApi";
import CategoryList from "../../components/Category/CategoryList";
import Loader from "../../components/Loader/Loader";
import Search from "../../components/Search/Search";

function Home() {
    const { data, isLoading } = useGetCategoryQuery();
    if (isLoading) return <Loader />;
    return (
        <div>
            <Search />
            <CategoryList categories={data.categories} />
        </div>
    );
}

export default Home;
