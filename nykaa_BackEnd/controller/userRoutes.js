const dotenv=require("dotenv").config()
const jwt=require("jsonwebtoken")
const bcrypt=require("bcrypt")
const mongoose =require("mongoose")
const express=require("express")
const { users, blacklisting } = require("../Model/userModel")
const { userAuth } = require("../Middelware/userAuth")
const { auth } = require("../Middelware/auth")


const userRoute=express.Router()

userRoute.post("/signIn",userAuth,async(req,res)=>{
    try {
        const {name,email,pass,phone,role}=req.body
        const user=await users.findOne({phone})
        if(user){
            res.status(404).send("This phone Number allready register")
        }
        else{
            bcrypt.hash(pass,5,async function(err,hash){
                if(err){
                    res.status(404).send({msg:"error while hashing",err})
                }else{
                    const newUser=new users({name,email,pass:hash,phone,role})
                    await newUser.save()
                    res.status(200).send("User register successfull")
                }
            })
        }
    } catch (error) {
        console.log(error)
        res.status(400).json(error)
    }
})

userRoute.post("/login",async(req,res)=>{
    try {
        const {phone,pass}=req.body
        const user=await users.findOne({phone})
        if(user){   
           bcrypt.compare(pass,user.pass,function(err,result){
            if(result){
                const token=jwt.sign({id:user.id},process.env.key,{expiresIn:"1d"})
                const reftoken=jwt.sign({id:user.id},process.env.key,{expiresIn:"7d"})
                res.status(200).send({msg:`Welcome ${user.name.toUpperCase()}`,token:token,reftoken:reftoken})
            }
            else{
                res.status(404).send("wrong credentials")
            }
           
           })
        }else{
            res.status(400).send("user not found Plz signin first")
            
        }
    } catch (error) {
        res.status(400).json(error)
    }
})


userRoute.get("/logout",async(req,res)=>{
    try {
        if(req.headers.authorization){
           const token=req.headers.authorization?.split(" ")[1]
           const reftoken=req.headers.reftoken
           if(token){
            const blacklistedToken=await blacklisting.findOne({token})
            if(blacklistedToken){
                res.status(200).send("User allready logout")
            }
            else{
                const blacklistedToken=new blacklisting({token})
                await blacklistedToken.save()
                if(reftoken){
                    const blacklistedReftoken=await blacklisting.findOne({reftoken})
                    if(blacklistedReftoken){
                        return res.status(200).send("logout successfull")
                    }
                    else{
                        const blacklistedRefreshtoken=new blacklisting({reftoken})
                        await blacklistedRefreshtoken.save()
                        res.status(200).send("logout successfull")
                    } 
                    
                }
                else{
                    res.status(200).send("logout successfull")
                }
            }
           }else{
            res.status(404).send("Token missing . plz login.")
           }
        }else{
            res.status(404).send("Token missing")
        }
    } catch (error) {
        res.status(400).json(error)
    }
})

userRoute.patch("/edit/:id",auth,async(req,res)=>{
    try {
        const {id}=req.params
        const userid=req.userData._id
        const data=req.body
        const user=await users.findOne({_id:id})
        if(user){
           if(id===userid.toString()){
              await users.findByIdAndUpdate({_id:id},data)
              res.status(200).send("user data update successfull")
           }
           else{
            res.status(403).send("your not acess to edit this data")
           }
        }
        else{
           res.status(404).send("user not found")
        }

    } catch (error) {
        res.status(400).json(error)
    }
})


userRoute.delete("/delete/:id",auth,async(req,res)=>{
    try {
        const {id}=req.params
        const userid=req.userData._id
        const user =await users.findOne({_id:id})
        if(user){
           if(id===userid.toString()){
            await users.findByIdAndDelete({_id:id})
            res.status(200).send("user deleted successfully")
           }
           else{
            res.status(403).send("your not acess to delete this data")
           }
        }
        else{
            res.status(404).send("user not found")
        }
    } catch (error) {
        res.status(400).send(error)
    }
})

module.exports={userRoute}