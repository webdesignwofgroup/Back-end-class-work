import dotenv from 'dotenv';
import express from 'express'
import { mongoose } from "mongoose";
import userRouter from "../Back End class-work/Route/User.js"

const app = express()
app.use(express.json());
    dotenv.config()

console.log('my name is Emma')

app.get('/',(req, res)=>{
    res.send('Hello Queen')
} )

app.listen(3000, () => {
    console.log(`backend is running in port ${process.env.PORT}`)
})
app.use('/api/users', userRouter)

mongoose.connect(process.env.MONOGODB_URL)
.then(() => {
    console.log("connected to my database Emma")
}).catch(() =>{
    console.log('Fail to connect to database')
})


