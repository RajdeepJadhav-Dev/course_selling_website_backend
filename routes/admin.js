
const {Router} = require('express');
const adminRouter = Router();
const {adminModel,courseModel} = require('../db');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const {z, string} = require('zod');
const { appendFile } = require('fs');
const {adminMiddlewear} = require('../middlewears/admin');
const {jwt_secret_admin} = require("../config");

adminRouter.post('/signup',async (req,res)=>{
    const requiredBody = z.object({
        email: z.string().email(),
        password: z.string(),
        firstName:z.string(),
        lastName:z.string()
    })
    const validation = requiredBody.safeParse(req.body);
    if(!validation.success){
        res.json({
            msg: "invalid credentials"
        })
        return;
    }
    const email = req.body.email;
    const password = req.body.password;
    const firstName = req.body.firstName;
    const lastName = req.body.lastName;

    const hashed_password = await bcrypt.hash(password,10);
    await adminModel.create({
        email:email,
        password: hashed_password,
        firstName: firstName,
        lastName: lastName 

    })
    res.json({
        msg: "admin signed up"
    })
})


adminRouter.post('/signin', async (req,res)=>{
    const {email,password,firstName,lastName} = req.body;
    const foundAdmin = await adminModel.findOne({
        email
    }) 
    if(!foundAdmin){
        res.json({
            msg:"admin not found"
        })
        return
    }
    const passwordMatch = await bcrypt.compare(password,foundAdmin.password);
    if(passwordMatch){
        const token = jwt.sign({Id:foundAdmin._id},jwt_secret_admin);
        res.json({
            token:token
        })
        }else{
                res.json({
                    msg:"password invalid"
                })
        }
    })

adminRouter.post('/course',adminMiddlewear, async (req,res)=>{

    const {title,description,price,imageUrl} = req.body;
   const course = await courseModel.create({
        title,
        description,
        price,
        imageUrl,
        createrId:req.adminId    
    })
    res.json({
        msg:"course uploaded",
        courseId:course._id
    })
})

adminRouter.put('/course',adminMiddlewear,async (req,res)=>{
    const {title,description,price,imageUrl,courseId} = req.body;
  const adminId = req.adminId
    await courseModel.updateOne({
        ID: adminId,
        courseId: courseId
    } , 
    {title,description,price,imageUrl,courseId

    })
    res.json({
        msg:"course updated"
    })
    
})

adminRouter.get('/course/bulk',adminMiddlewear,async (req,res)=>{
    adminId = req.adminId;
const courses = await courseModel.find({
    createrId:adminId
})
res.json({
    courses
})
    
})

module.exports = {
    adminRouter: adminRouter
}