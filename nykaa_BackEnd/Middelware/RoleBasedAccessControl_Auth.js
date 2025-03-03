
const permissonAuth=(permitedRole)=>{
    return(req,res,next)=>{
        const userRole=req.userData.role
        if(permitedRole.includes(userRole)){
            next()
        }
        else{
            res.status(403).send("You are not allowed to access this Routes.")
        }
    }
}

module.exports={permissonAuth}