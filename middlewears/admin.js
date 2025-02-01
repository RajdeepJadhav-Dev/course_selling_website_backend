const {jwt_secret_admin} = require('../config');
const jwt = require("jsonwebtoken");


function adminMiddlewear(req,res,next){
    const token = req.headers.token;
    const decodedtoken = jwt.verify(token,jwt_secret_admin);
    if(decodedtoken){
        req.adminId = decodedtoken.Id;
        next();
    }else{
        res.json({
            msg:"you are not signed in"
        })
    }
}

module.exports = {
    adminMiddlewear:adminMiddlewear
}



