
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import NotfoundPage from "./NotfoundPage";
import CommentsList from "../Components/commentsList";
import AddCommentForm from "../Components/AddCommentForm"
import useUser from "../hooks/useUser";
import articles from "./Article-content";

function ArticlePage() {
const [articleInfo, setArticleInfo] = useState({ likes: 0, comments: [] });
const { articleId } = useParams();
const {user,isLoading}= useUser();

useEffect(() => {
const loadArticleInfo = async () => {
const token = user && (await user.getIdToken());
const headers = token ? {authtoken : token} : {};

const response = await axios.get(`/api/articles/${articleId}`,{
    headers,
});
const newArticleInfo = response.data;
setArticleInfo(newArticleInfo);
};

loadArticleInfo();
}, []);

const article = articles.find((article) => article.name === articleId);

const addLikes = async () => {
const token = user && (await user.getIdToken());
const headers = token ? { authtoken : token} : {};
const response = await axios.put(`/api/articles/${articleId}/likes`,null,{
    headers,
});
const updatedArticle = response.data;
setArticleInfo(updatedArticle);

};

if (article) {
return (
<>
<h1>{article.title}</h1>
<div className="upvote-section">
    {user
       ? <button onClick={addLikes}>Like</button>
       : <button>login to like </button>
    }
</div>
<p>
{article.title} has {articleInfo.likes} likes!...
</p>
{article.content.map((paragraph, i) => (
<p key={i}>{paragraph}</p>  
))}

{ user
    ? <AddCommentForm
      articleName={articleId}
     onArticleUpdated={updatedArticle => setArticleInfo(updatedArticle)}
         />

    : <button>login to comment </button>


}

<CommentsList comments={articleInfo.comments}></CommentsList>
</>
);
} else {
return <NotfoundPage></NotfoundPage>;
}
}

export default ArticlePage;