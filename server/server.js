require("dotenv").config();

const express = require("express");
const cors = require("cors");
const connectDB = require("./db/connect");
const userRouter = require("./routes/users");
const exerciseRouter = require("./routes/exercises");

const app = express();

app.use(cors());
app.use(express.json());


//Routes
app.use('/exercise', exerciseRouter);
app.use('/user', userRouter);


const port = process.env.PORT || 5000;

const start = async () => {
    try {
        //connect DB
        await connectDB(process.env.MONGODB_URL)
        app.listen(port, ()=>{
            console.log(`Server is listening at port ${port}...`)
        })
    } catch (err) {
        console.log(err)
    }
}

start()