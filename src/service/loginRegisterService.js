import "dotenv/config";
import { Op } from "sequelize"; // operator in sequelize: toan tu
import db from "../models";
import {
    checkEmailExist,
    checkPassword,
    checkPhoneExist,
    hashUserPassword,
} from "./inspectionService";

const registerNewUser = async rawUserData => {
    try {
        // Check email/phone number are exist
        let isEmailExist = await checkEmailExist(rawUserData.email);
        if (isEmailExist) {
            return {
                errorMessage: "The email is already exist !",
                errorCode: 1,
                data: "email",
            };
        }
        let isPhoneExist = await checkPhoneExist(rawUserData.phone);
        if (isPhoneExist) {
            return {
                errorMessage: "The phone number is already exist !",
                errorCode: 1,
                data: "phone",
            };
        }
        // Hash user password
        let hashPassword = hashUserPassword(rawUserData.password);
        // Create new user
        await db.User.create({
            email: rawUserData.email,
            username: rawUserData.username,
            password: hashPassword,
            phone: rawUserData.phone,
            groupId: 4, // Default belongs to guest group
        });
        return {
            errorMessage: "A user is created successfully!",
            errorCode: 0,
            data: "",
        };
    } catch (error) {
        console.log("🔴>>> Error from server: ", error);
        return {
            errorMessage: "Something wrongs in service !",
            errorCode: -2,
        };
    }
};

const handleUserLogin = async rawUserData => {
    try {
        let user = await db.User.findOne({
            where: {
                [Op.or]: [
                    { email: rawUserData.valueLogin },
                    { phone: rawUserData.valueLogin },
                ],
            },
        });
        if (user) {
            let isCorrectPassword = await checkPassword(
                rawUserData.password,
                user.password
            );
            if (isCorrectPassword) {
                return {
                    errorMessage: "Login sucess !",
                    errorCode: 0,
                    data: {},
                };
            }
        }
        return {
            errorMessage: "Your account is incorrect",
            errorCode: 1,
            data: "",
        };
    } catch (error) {
        console.log("🔴>>> Error from server: ", error);
        return {
            errorMessage: "Something wrongs in service !",
            errorCodeEC: -2,
        };
    }
};

module.exports = {
    registerNewUser,
    handleUserLogin,
};
