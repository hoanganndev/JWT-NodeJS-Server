import express from "express";
import groupController from "../controller/groupController";
import loginRegisterController from "../controller/loginRegisterController";
import userController from "../controller/userController";

const router = express.Router();

/**
 * @param {*} app --express app
 */

const initApiRoutes = app => {
    // ROUTER REGISTER AND LOGIN
    router.post("/register", loginRegisterController.handleRegister);
    router.post("/login", loginRegisterController.handleLogin);

    // CRUD USER ROUTER
    router.get("/user/read", userController.readUsersFunction);
    router.post("/user/create", userController.createUserFunction);
    router.put("/user/update", userController.updateUserFunction);
    router.delete("/user/delete", userController.deleteUserFunction);

    //GROUP
    router.get("/group/read", groupController.readGroupsFunction);

    return app.use("/api/v1/", router);
};

export default initApiRoutes;
