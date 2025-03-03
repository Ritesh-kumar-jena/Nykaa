const path=require("path")
const dotenv=require("dotenv").config()
const express=require("express")
 const { connection } = require("./db")
const { userRoute } = require("./controller/userRoutes")
const { productRoute } = require("./controller/productRoutes")
const { cartRoutes } = require("./controller/cartRoutes")
const { orderRoutes } = require("./controller/orderRoute")
const port=process.env.port

const app=express()

app.get("/",(req,res)=>{
    try {
        res.status(200).send("Wellcom to my Nykaa app")
    } catch (error) {
        res.status(404).send(error)
        console.log(error)
    }
})
app.use(express.json())
app.use("/users",userRoute)

app.use("/products",productRoute)
app.use("/cart",cartRoutes)
app.use("/orders",orderRoutes)
app.listen(port,async()=>{
    try {
         await connection
        console.log(`server is running on port:-${port} and connected to Nykaa database`)
    } catch (error) {
        console.log(error)
    }
})