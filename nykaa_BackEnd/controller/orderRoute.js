const mongoose=require("mongoose")
const express=require("express")
const { auth } = require("../Middelware/auth")
const { permissonAuth } = require("../Middelware/RoleBasedAccessControl_Auth")
const { order } = require("../Model/ordersModel")
const { products } = require("../Model/productModel")
const { cart } = require("../Model/cartModel")
const { users } = require("../Model/userModel")
const orderRoutes=express.Router()

orderRoutes.use(auth)

orderRoutes.get("/allOrders",permissonAuth(["admin"]),async(req,res)=>{
    try {
        const data=await order.find().populate("user", "name email phone").populate("items.product", "name price image"); 
        if(data.length>0){
            res.status(200).send({Orders:data})
        }
        else{
            res.status(404).send("Don't have any order till now.")
        }
    } catch (error) {
        res.status(400).json(error)
    }
})

orderRoutes.get("/myOrders",async(req,res)=>{
    try {
        const userId=req.userData._id
        const data=await order.find({user:userId}).populate("items.product", "name price image")
        if(data.length>0){
            res.status(200).send({myOrders:data})
        }
        else{
            res.status(404).send("you don't have any order till now so make an order first.")
        }
    } catch (error) {
        res.status(400).json(error)
    }
})


orderRoutes.post("/addOrders",async(req,res)=>{
    try {
        const userId=req.userData._id
        const {address}=req.body
        if(!address){
            return res.status(400).send({msg:"address required to place an order"})
        }
    
        const cartItems=await cart.find({user:userId}).populate("product")
        if(cartItems.length===0){
          return  res.status(400).send("your cart is empty. plz add items to the cart first.")
        }
        let totalOrderPrice=0
        const orderItems=cartItems.map(item=>{
            totalOrderPrice+=item.productTotalPrice
            return{
                product:item.product._id,
                quantity:item.quantity,
                productTotalPrice:item.productTotalPrice
            }
        })
       const newOrder=new order({
        user:userId,
        items:orderItems,
        totalOrderPrice:totalOrderPrice,
        address:address
       })
    await newOrder.save()
    await cart.deleteMany({user:userId})

    res.status(200).send({msg:"order placed successfully",orders:newOrder})
    } catch (error) {
        res.status(400).json(error)
    }
})



module.exports={orderRoutes}