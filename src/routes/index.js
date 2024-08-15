const express=require('express')
const UserController=require('../controllers/controller')
const {AuthRequestValidators}=require('../middlewares/index')
const router=express.Router()
router.post(
    '/signup',
    AuthRequestValidators.validateUserAuth,
    UserController.create
)
router.post(
    '/signin',
    AuthRequestValidators.validateUserAuth,
    UserController.signIn
)
router.get(
    '/isAuthenticated',
    UserController.isAuthenticated
)
router.get('/generate', UserController.generateQRCode);
module.exports=router