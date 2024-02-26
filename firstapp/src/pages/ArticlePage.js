import {useParams} from "react-router-dom"
import articles from "./Article-content";
import NotfoundPage from "./NotfoundPage"
function ArticlePage(){
   const {articleId} = useParams();
   const article = articles.find(article=>
    article.name===articleId);

    if (article){
        return(
          <>
             <h1>{article.title}</h1>
             {article.content.map(paragraph=>(
                <p>{paragraph}</p>
             ))}
           </>
         );
        }
        else{
            return <NotfoundPage></NotfoundPage>
        }
}
export default ArticlePage;