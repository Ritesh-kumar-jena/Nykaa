const dotenv=require("dotenv").config()
const mongoose=require("mongoose")
const express=require("express")
const path=require("path")
const multer=require("multer")
const cloudinary=require("cloudinary").v2
const {CloudinaryStorage}=require("multer-storage-cloudinary")
const { auth } = require("../Middelware/auth")
const { permissonAuth } = require("../Middelware/RoleBasedAccessControl_Auth")
const { products } = require("../Model/productModel")

const productRoute=express.Router()

cloudinary.config({
    cloud_name: process.env.cloudName,
    api_key: process.env. APIKEY,
    api_secret: process.env.APISecret
});

const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
        folder: 'Nykaa_products', // Folder name in Cloudinary
        allowed_formats: ['jpg', 'png'],
    },
});

const upload = multer({ storage: storage });1

productRoute.use(auth)

productRoute.post("/addProducts",permissonAuth(["admin","seller"]),upload.single('image'),async(req,res)=>{
    try {
        const product=new products({
            ...req.body,
            image:req.file.path
        })
        await product.save()
        res.status(200).send("Product added successfully")

    } catch (error) {
        res.status(400).json(error)
    }
})

productRoute.patch("/editProducts/:id",permissonAuth(["admin","seller"]),async(req,res)=>{
    try {
        const {id}=req.params
        const product=await products.findOne({_id:id})
        if(product){
            const data=req.body
            await products.findByIdAndUpdate({_id:id},data)
            res.status(200).send("Product data updated successfully")
        }
        else{
            res.status(404).send("Product not found")
        }
    } catch (error) {
        res.status(400).json(error)
    }
})

productRoute.delete("/deleteProducts/:id",permissonAuth(["admin","seller"]),async(req,res)=>{
    try {
        const {id}=req.params
        const product=await products.findOne({_id:id})
        if(product){
            await products.findByIdAndDelete({_id:id})
            res.status(200).send("Product data deleted successfully")
        }
        else{
            res.status(404).send("Product not found")
        }
    } catch (error) {
        res.status(400).json(error)
    }
})

productRoute.get("/allProducts",async(req,res)=>{
    try {
        const product=await products.find()
        res.status(200).send({products:product})
    } catch (error) {
        res.status(400).json(error)
    }
})

productRoute.get("/searchProduct",async(req,res)=>{
    try {
        const {q}=req.query
        if(q){
            const Length=q.length
            if(Length>=3){
                const productData=await products.find({name:{$regex:q,$options:"i"}})
                if(productData){
                   res.status(200).send(productData)
                }
                else{
                    res.status(404).send("product not found")
                }
            }
            else{
                res.status(200).send("give more data query")
            }
        }
        else{
            res.status(404).send("query not found")
        }
    } catch (error) {
        res.status(400).json(error)
    }
})

module.exports={productRoute}