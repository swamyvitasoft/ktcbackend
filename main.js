import express from "express"
import dotenv from "dotenv"
import mongoose from "mongoose"
import cors from "cors"
import userRoutings from "./User/index.js"
import saleRoutings from "./sale/index.js"
import verifyToken from "./jwt/verifytoken.js"


const app = express()
dotenv.config()
app.use(express.json());
app.use(cors())
let corsOptions = {
    origin: ['http://78.142.47.247:${process.env.PORT}',]
};

app.use('/user', cors(corsOptions), userRoutings);
app.use('/sale', cors(corsOptions), saleRoutings);

app.use(verifyToken);

mongoose.connect(process.env.DB_URL)
    .then(console.log('db connected succesfully'))
    .catch(err => {
        console.log('error ', err)
    })
app.listen(process.env.PORT, () => {
    console.log(`Server on http://78.142.47.247:${process.env.PORT}`)
});