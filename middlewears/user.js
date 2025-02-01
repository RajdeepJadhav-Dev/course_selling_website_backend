const {jwt_secret_user} = require('../config');



function userMiddlewear(req,res,next){
    const token = req.headers.token;
    const decodedtoken = jwt.verify(token,jwt_secret_user);
    if(decodedtoken){
        req.userId = decodedtoken.Id;
        next();
    }else{
        res.json({
            msg:"you are not signed in"
        })
    }
}

module.exports = {
    userMiddlewear:userMiddlewear
}