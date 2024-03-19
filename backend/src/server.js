import express from 'express';
import {db,connectToDb} from './db.js';

const app = express();
app.use(express.json());


    app.get("/api/articles/:name", async (req,res) =>{
        const {name} = req.params;
        const article = await db.collection("articles").findOne({name});

        if(article){
            res.json(article);
        }else{
            res.send(404);
        }

    });

    app.put("/api/articles/:name/likes",async(req,res)=>{
        const {name} =req.params;

        await db.collection("articles").updateOne({name},{$inc:{likes:1}});
        const article = await db.collection("articles").findOne({name});
        if(article){
        res.json(article);
        }
        else{
            res.send(`Nooo`)
        }
    });

    app.post("/api/articles/:name/comments",async(req,res)=>{
        const {name}=req.params;
        const {by,comment} = req.body;
        await db.collection("articles").updateOne(
            {name} ,
            {$push: {comments:{by,comment}}}
        );
        const article  = await db.collection("articles").findOne({name});
        if(article){
            res.json(article);
        }else{
            res.send("Nooo")
        }
    });

    connectToDb( ()=> {
     console.log("sucessfull completed to database");
     app.listen(8001,()=>{
        console.log("listening on http://localhost:8001"); 
    });
 });

app.post("/api/register", async (req, res) => {
    const { name, email, password } = req.body;

    try {
        const existingUser = await db.collection("users").findOne({ email });
        if (existingUser) {
            return res.status(400).json({ error: "Email already exists" });
        }
        await db.collection("users").insertOne({ name, email, password });

        res.status(201).json({ message: "User registered successfully" });
    } catch (error) {
        console.error("Error registering user:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});