import express from "express";
import mongoose from "mongoose";
import { verifyUser } from "./controllers/auth/verifyUserController";
import counsellor from "./models/counsellor";
import claimListRouter from "./routes/claimList-routes";
import counsellorRouter from "./routes/counsellor-routes";
import leadsRouter from "./routes/leads-routes";


const app = express();

app.use(express.json());

app.get("/",(req,res)=>{
res.status(200).send("app is running....");
});

app.use("/consellor", counsellorRouter);

app.use("/leads",leadsRouter);

app.use("/claims",claimListRouter)

mongoose.connect("mongodb+srv://Admin:Admin@cluster0.rmuixwv.mongodb.net/counsellorData?retryWrites=true&w=majority")
    .then(() => app.listen(9000))
    .then(() =>
        console.log("connected to the databse and listening to the Port 9000")
    )
    .catch((err) => console.log(err));

app.get('/api', (req, res, next) => {
    res.send("hello World");
})

