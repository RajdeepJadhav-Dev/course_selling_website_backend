
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = mongoose.ObjectId;

const user = new Schema({
    Id : ObjectId,
    email: String,
    password: String,
    firstName: String,
    lastName: String,
})

const admin = new Schema({
    Id : ObjectId,
    email: String,
    password: String,
    firstName: String,
    lastName: String,
})

const course = new Schema({
    Id: ObjectId,
    title: String,
    description: String,
    price: Number,
    imageUrl: String,
    createrId: ObjectId
})

const purchases = new Schema({
    Id: ObjectId,
    courseId : ObjectId,
    userID: ObjectId
})

const userModel = mongoose.model('users',user);
const adminModel = mongoose.model('admins',admin);
const courseModel = mongoose.model('courses',course);
const purchasesModel = mongoose.model('purchases',purchases);

module.exports = {
    userModel: userModel,
    adminModel: adminModel,
    courseModel: courseModel,
    purchasesModel: purchasesModel
}