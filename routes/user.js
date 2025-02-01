const {Router} = require('express');
const UserRouter = Router();
const {userModel} = require('../db');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const {z, string} = require('zod');
const { userMiddlewear } = require('../middlewears/user');

UserRouter.post('/signup',async (req,res)=>{
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
    const password= req.body.password;
    const firstName = req.body.firstName;
    const lastName = req.body.lastName;

    const hashed_password = await bcrypt.hash(password,10);
    await userModel.create({
        email:email,
        password: hashed_password,
        firstName: firstName,
        lastName: lastName 

    })
    res.json({
        msg: "user signed up"
    })
})

UserRouter.post('/signin', async (req,res)=>{
    const {email,password,firstName,lastName} = req.body;
    const foundUser = await userModel.findOne({
        email
    }) 
    if(!foundUser){
        res.json({
            msg:"user not found"
        })
        return
    }
    const passwordMatch = await bcrypt.compare(password,foundUser.password);
    if(passwordMatch){
        const token = jwt.sign({Id:foundUser._id},jwt_key);
        res.json({
            token:token
        })
        }else{
                res.json({
                    msg:"password invalid"
                })
        }
    })

UserRouter.get('/purchases',userMiddlewear,(req,res)=>{

});

module.exports = {
    UserRouter : UserRouter
}