import bcrypt from "bcryptjs";
import db from "../models";
const salt = bcrypt.genSaltSync(10);
require("dotenv").config();
//Endcode and decode password with bcrypt
const hashUserPassword = userPassword => {
    let hashPassword = bcrypt.hashSync(userPassword, salt);
    return hashPassword;
};
const checkPassword = (inputPassword, hashPassword) => {
    return bcrypt.compareSync(inputPassword, hashPassword); //Return true or false
};
// Check validate email
const checkValidateEmail = async userEmail => {
    let regx = /\S+@\S+\.\S+/;
    return await regx.test(userEmail);
};
// Check exist email
const checkEmailExist = async userEmail => {
    let user = await db.User.findOne({
        where: { email: userEmail },
    });
    if (user) return true;
    return false;
};
// Check exist phonenumber
const checkPhoneExist = async userPhone => {
    let user = await db.User.findOne({
        where: { phone: userPhone },
    });
    if (user) return true;
    return false;
};

module.exports = {
    hashUserPassword,
    checkEmailExist,
    checkPhoneExist,
    checkPassword,
    checkValidateEmail,
};
