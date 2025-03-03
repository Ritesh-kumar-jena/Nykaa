const mongoose=require("mongoose")
const express=require("express")
const { permissonAuth } = require("../Middelware/RoleBasedAccessControl_Auth")
const { cart } = require("../Model/cartModel")
const { auth } = require("../Middelware/auth")
const { products } = require("../Model/productModel")
const cartRoutes=express.Router()

cartRoutes.use(auth)

cartRoutes.get("/allcart",permissonAuth(["admin"]),async(req,res)=>{
    try {
        const carts= await cart.find().populate('product')
        if(carts.length>0){
            res.status(200).send({cart:carts})
        }
        else{
            res.status(404).send("No orders find in cart right now.")
        }
    } catch (error) {
        res.status(400).json(error)
    }
})

cartRoutes.get("/mycart",async(req,res)=>{
    try {
        const userId=req.userData._id
        const carts=await cart.find({user:userId}).populate('product')
        if(carts.length>0){
            res.status(200).send({cart:carts})
        }
        else{
            res.status(200).send("you are not oder any item in cart till now so plz order at list one item.")
        }
    } catch (error) {
        res.status(400).json(error)
    }
})

cartRoutes.post("/addtocart",async(req,res)=>{
    try {
        const user=req.userData._id
        const {product,quantity}=req.body
        if (!product || !quantity || quantity < 1) {
            return res.status(400).send({ msg: "Invalid product or quantity" });
          }
        const myProduct=await products.findOne({_id:product})
            if(myProduct){
                const Incart=await cart.findOne({user,product})
                if(Incart){
                   const updateQuantity=quantity
                   const productTotalPrice=myProduct.price*updateQuantity
                   await cart.findByIdAndUpdate({_id:Incart._id},{quantity:updateQuantity,productTotalPrice:productTotalPrice})
                   res.status(200).send("product add to cart successfully")
                }
                else{
                       const productTotalPrice=myProduct.price*quantity
                       const newOrder=new cart({user:user,product:product,quantity:quantity,productTotalPrice:productTotalPrice})
                       await newOrder.save()
                       res.status(200).send({msg:"order add to cart successfully"})
                    }
            }
            else{
              return res.status(404).send("Item not found")
       
            }

         
    } catch (error) {
        res.status(400).json(error)
    }
})

cartRoutes.patch("/editOrders/:id",async(req,res)=>{
    try {
        const {id}=req.params
        const userID=req.userData._id
        const {quantity}=req.body
            const myOrders=await cart.findOne({_id:id}).populate("product")
            if(myOrders){
                if(myOrders.user.toString()===userID.toString()){
                const updatedPrice=myOrders.product.price*quantity
            await cart.findByIdAndUpdate({_id:id},{quantity:quantity,productTotalPrice:updatedPrice})
              res.status(200).send({msg:"order data updated successfully."})
            }
            else{
                res.status(400).send("you do not have authorization to edit this order")
            }
        }
       
            else{
                res.status(404).send("orders not found in cart")
            }
       
       
    } catch (error) {
        res.status(500).json(error)
    }
})

cartRoutes.delete("/deleteOrders/:id",async(req,res)=>{
    try {
        const {id}=req.params
        const myOrders=await cart.findOne({_id:id})
        const userID=req.userData._id
        if(myOrders){
            if(myOrders.user.toString()===userID.toString()){
                await cart.findByIdAndDelete({_id:id})
                res.status(200).send({msg:"order data deleted from cart successfully."})
            }
            else{
                res.status(400).send("you do not have authorization to delete this order")
            }
        }
        else{
            res.status(404).send("orders not found in cart")
        }
    } catch (error) {
        res.status(500).json(error)
    }
})

module.exports={cartRoutes}