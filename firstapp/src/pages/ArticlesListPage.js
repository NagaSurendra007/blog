import articles  from "./Article-content";
import ArticlesList from "../Components/ArticleList";

function ArticlesPage(){
    return(
        <>
            <h1>List of Articles</h1>
           <ArticlesList articles = {articles}></ArticlesList>
        </>
    );
}
export default ArticlesPage;


