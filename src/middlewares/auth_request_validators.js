const validateUserAuth=(req,res,next)=>{
    if(!req.body.password || !req.body.email){
        return res.status(400).json({
        success:false,
        data:{},
        message:"Something went wrong",
        err:"Email or password missing in the signup request"
    })
    }
    next();
}
module.exports={
    validateUserAuth
}