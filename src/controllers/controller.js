const UserService=require('../services/service')
const userService = new UserService()
const create=async(req,res)=>{
    try{
        const response=await userService.create({
            email:req.body.email,
            password:req.body.password,
            name:req.body.name
        })
        return res.status(201).json({
            success:true,
            message:"Successfully created a new user",
            data:response,
            err:{}
        })

    }catch(error){
        console.log(error);
        return res.status(500).json({
            message:"Something went wrong",
            data:{},
            success:false,
            err:error
        })
    }

}
const signIn=async(req,res)=>{
    try{
        const response=await userService.signIn(req.body.email,req.body.password)
        return res.status(200).json({
            success:true,
            message:"Successfully signed in",
            data:response,
            err:{}
        })
    }catch(error){
        console.log(error);
        return res.status(500).json({
            message:"Something went wrong",
            data:{},
            success:false,
            err:error
        })
    }
}
const isAuthenticated=async(req,res)=>{
    try{
        const token=req.headers['x-access-token']    
        const response =await userService.isAuthenticated(token)
        return res.status(200).json({
            success:true,
            data:response,
            err:{},
            message:"User is authenticated and token is valid"
        })
    }catch(error){ 
        console.log(error);
        return res.status(500).json({
            message:"Something went wrong",
            data:{},
            success:false,
            err:error
        }) 
    }
}
const generateQRCode=async(req,res)=>{
    try{
        const qrCodePath = await userService.generateQRCode(req.body.email);
        return res.status(200).json({
            success:true,
            data:qrCodePath,
            err:{},
            message:"Qr code generated!"
        })
    }catch(error){
        console.log(error);
        return res.status(500).json({
            message:"Something went wrong with qr generation",
            data:{},
            success:false,
            err:error
        })
    }
}
module.exports={
    create,
    signIn,
    isAuthenticated,
    generateQRCode
}
