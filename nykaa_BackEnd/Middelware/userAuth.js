

const userAuth=(req,res,next)=>{
    try {
        const {phoneNumber}=req.body
        if(phoneNumber.length===10){
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