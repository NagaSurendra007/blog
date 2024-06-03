import express from 'express';
import fs from "fs"
import {db,connectToDb}  from './db.js';
import admin  from "firebase-admin";


const credentials=JSON.parse(fs.readFileSync("./credentials.json"));

admin.initializeApp({
    credential: admin.credential.cert(credentials)
})


const app = express();
app.use(express.json());

app.use(async (req,res,next)=>{
    const {authtoken}=req.headers;
    if(authtoken){
    try{
        req.user=await admin.auth().verifyIdToken(authtoken);
    }catch(e){
      return res.sendStatus(400);
    }
    }
    req.user = req.user||{};
    next();
})


app.get('/api/articles/:name',async(req,res)=>{
    const {name}=req.params;
    const {uid}=req.user;

    const article=await db.collection("articles").findOne({name});

    if (article){ 
        const likeIds=article.likeIds||[];
        article.canLike= uid && !likeIds.include(uid);
        res.json(article);
    }else{
        res.sendStatus(404);
    }
});

app.use((req,res,next)=>{
    if(req.user){
        next();
    }else{
        res.sendStatus(401);
    }
})

app.put('/api/articles/:name/likes',async(req,res)=>{
    const {name}=req.params;
    const {uid}=req.user;

    const article = await db.collection("articles").findOne({name});

    if (article){
        const likeIds=article.likeIds||[];
        const canLike=uid && likeIds.includes(uid);
    
        if(canLike){
            await db.collection("articles").updateOne(
                {name},
                {
                    $inc:{likes:1},
                    $push:{likeIds:uid}
                });
        }
        const updatedArticle=await db.collection("articles").findOne({
            name });
        res.send(article);
    }
    else
    {
        res.sendStatus(401);
    }
});

app.post('/api/articles/:name/comments',async(req,res)=>{
    const {name}=req.params;
    const {comment}=req.body;
    const {email}=req.user;

    await db.collection("articles").updateOne({name},{$push:{comments:{by:email,comment}}});
    const article=await db.collection("articles").findOne({name});
    if (article){
        res.json(article);
    }
    else
    {
        res.sendStatus(401);
    }
});

connectToDb(()=>{
    console.log("successfully connected to database");
    app.listen(8000,()=>{
        console.log("listening on 8000 http://localhost:8000....");
    });
});