import express from "express";
import groupController from "../controller/groupController";
import loginRegisterController from "../controller/loginRegisterController";
import userController from "../controller/userController";
import { checkUserJWT, checkUserPermission } from "../middleware/JWTAction";
const router = express.Router();

/**
 * @param {*} app --express app
 */

const initApiRoutes = app => {
    // Middleware check authentication and permisstion all routers
    router.all("*", checkUserJWT, checkUserPermission);

    // Router register and login
    router.post("/register", loginRegisterController.handleRegister);
    router.post("/login", loginRegisterController.handleLogin);

    // Router CRUD users
    router.get("/user/read", userController.readUsersFunction);
    router.post("/user/create", userController.createUserFunction);
    router.put("/user/update", userController.updateUserFunction);
    router.delete("/user/delete", userController.deleteUserFunction);

    // Router get groups
    router.get("/group/read", groupController.readGroupsFunction);

    return app.use("/api/v1/", router);
};

export default initApiRoutes;
