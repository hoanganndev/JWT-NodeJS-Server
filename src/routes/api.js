import express from "express";
import loginRegisterController from "../controller/loginRegisterController";
const router = express.Router();
/**
 * @param {*} app --express app
 */
const initApiRoutes = app => {
    // ROUTER REGISTER AND LOGIN
    router.post("/register", loginRegisterController.handleRegister);
    router.post("/login", loginRegisterController.handleLogin);
    return app.use("/api/v1/", router);
};
export default initApiRoutes;
