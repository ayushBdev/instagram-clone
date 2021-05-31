import express from "express";
import mongoose from "mongoose";
import bodyparser from "body-parser";
import cors from "cors";
import Pusher from "pusher";
import dotenv from "dotenv";
dotenv.config({path: "./.env"});

import authRoute from "./Routes/Auth_Routes.js";
import postRoute from "./Routes/Post_Routes.js";

const app = express();

app.use(bodyparser.json({limit:"30mb", extended:true}));
app.use(bodyparser.urlencoded({limit:"30mb", extended:true}));
app.use(cors());

app.use("/auth", authRoute);
app.use("/posts", postRoute);

const PORT = process.env.PORT || 5000;
const ATLAS = process.env.ATLAS;

mongoose.connect(ATLAS, { useNewUrlParser:true, useUnifiedTopology:true, useFindAndModify:false})
    .then(() => app.listen(PORT, () => console.log(`Server running at Port ${PORT}`)))
    .catch((err) => console.log(`${err} did not connected`));

const pusher = new Pusher({
    appId: process.env.appId,
    key: process.env.key,
    secret: process.env.secret,
    cluster: process.env.cluster,
    useTLS: true
});

const db = mongoose.connection;

db.once("open", () => {

    console.log("DB connected");

    const postCollection = db.collection("postschemas");
    const changeStream = postCollection.watch();

    changeStream.on("change",(change)=>{
        console.log("A change occured", change);

        if(change.operationType === 'insert') {
        const postDetails = change.fullDocument;
        pusher.trigger("posts","inserted",
            {
                postDetails : postDetails.postDetails,
                uploadDate : postDetails.uploadDate,
                selectedFile: postDetails.selectedFile,
                like: postDetails.like,
                _id: postDetails._id
            });
        } else {
            if(change.operationType === 'update') {
                const postDetails = change.documentKey._id;
                pusher.trigger("posts","updated", postDetails);
            }
        }
    });

    //---------------------------------------------------------------------------------------------------

    const usersCollection = db.collection("authusers");
    const changeStream2 = usersCollection.watch();

    changeStream2.on("change",(change)=>{
        console.log("A change occured", change);

        if(change.operationType === 'update') {
        const userDetails = change.documentKey._id;
        pusher.trigger("users","updated", userDetails);
        } else {
            console.log("Error Trigging Pusher");
        }
    });
});