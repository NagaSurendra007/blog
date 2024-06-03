import { useState } from "react";
import axios from "axios";
import useUser from "../hooks/useUser";

const AddCommentForm = ({articleName,onArticleUpdated})=>{
    const [name,setName] = useState('');
    const [commentText, setCommentText] = useState('');
    const user = useUser();

    const addComment = async()=>{
        const token = user && await user.getIdToken();
        const headers = token ? { authtoken: token } : {};
        const response = await axios.post(`/api/articles/${articleName}/comments`,{
            by : name,
            comment : commentText
        },{
            headers
        });
        const updatedArticle = response.data;
        onArticleUpdated(updatedArticle);
        setName("");
        setCommentText("");
    };
    return(
        <div id ="add-comment-form">
            <h3>Add comment macha</h3>
            <label>
                Name : 
                <input
                value={name}
                onChange={e=>setName(e.target.value)}
                type="text"/>
            </label>
            <label>
                comments:
                <input 
                value={commentText}
                onChange={e=>setCommentText(e.target.value)}
                rows ="4"
                cols="50" />
            </label>
            <button onClick = {addComment}>send Comment</button>
        </div>
    );
        
    
};

export default AddCommentForm;