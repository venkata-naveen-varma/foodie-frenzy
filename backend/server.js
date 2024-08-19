import express from "express"
import cors from "cors"
import dotenv from "dotenv"
dotenv.config()
import { connectDB } from "./config/db.js"

const app = express()
const port = process.env.PORT || 4000

app.use(express.json())
app.use(cors())

connectDB();

// api endpoints
app.use("/api/food",foodRouter)
app.use("/images",express.static('uploads'))
app.use("/api/user",userRouter)
app.use("/api/cart",cartRouter)
app.use("/api/order",orderRouter)

app.get("/", (req, res)=>{
    res.send("Server API working")
})

app.listen(port, ()=>{
    console.log(`Server running on http://localhost:${port}`)
})
