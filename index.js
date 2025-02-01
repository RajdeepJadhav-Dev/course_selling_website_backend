const express = require('express');
const app = express();
const {UserRouter} = require('./routes/user');
const {courseRouter} = require('./routes/course');
const {adminRouter} = require('./routes/admin');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const cors = require('cors');




app.use(express.json());
app.use(cors());

app.use('/users',UserRouter);
app.use('/course',courseRouter);
app.use('/admin',adminRouter);



async function main(){
    await mongoose.connect('mongodb+srv://210rajdeep:13132030931@cluster0.izjm5.mongodb.net/raj');
    app.listen(3000,()=>console.log("3000 port runnin...."));
}
main();
