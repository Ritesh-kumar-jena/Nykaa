

const userAuth=(req,res,next)=>{
    try {
        const {phone}=req.body
        if(phone.length===10){
            next()
        }
        else{
            res.status(404).send("wrong phone Number")
        }
    } catch (error) {
        res.status(400).json(error)
    }
}

module.exports={userAuth}