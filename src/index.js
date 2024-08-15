const express=require('express')
const dotenv=require('dotenv')
dotenv.config()
const {PORT}=require('./config/serverconfig')
const bodyparser=require('body-parser')
const apiRoutes=require('./routes/index')
const Setupandstartserver=async()=>{
    const app=express()
    app.use(bodyparser.json())
    app.use(bodyparser.urlencoded({extended:true}))
    app.use("/api",apiRoutes)
    app.listen(PORT,async()=>{
        console.log(`Server started at ${PORT}`)
    })
    
}
Setupandstartserver();