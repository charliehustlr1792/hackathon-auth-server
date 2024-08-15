const {User}=require('../models/index.js')
class UserRepository{
    async create(data){
        try{
            const user= await User.create(data)
            return user;
        }catch(error){
            console.log("Something happened in the repository layer")
            throw error;
        }
    }
    async getbyId(userId){
        try{
            const user=await User.findByPk(userId,{
                attributes:['email','id']
            })
            return user;
        }catch(error){
            console.log("Something happened in the repository layer")
            throw error;
        }
    }
    async getbyEmail(userEmail){
        try{
            const user=await User.findOne({
                where:{
                    email:userEmail
                }
            })
            return user;
        }catch(error){
            console.log("Something happened in repository layer")
            throw error
        }
    }

}
module.exports=UserRepository;