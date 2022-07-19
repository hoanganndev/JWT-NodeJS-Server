import express from "express";
import {
    getUpdateUserPage,
    handleCreateNewUser,
    handleUpdateUser,
    handleUserPage,
    handleGetHomePage,
    handleDelteUser,
} from "../controller/homeController";
const router = express.Router();
/**
 * @param {*} app --express app
 */
const initWebRoutes = app => {
    router.get("/", handleGetHomePage);
    router.get("/user", handleUserPage);
    router.post("/create-user", handleCreateNewUser);
    router.post("/delete-user/:id", handleDelteUser);
    router.get("/update-user/:id", getUpdateUserPage);
    router.post("/update-user", handleUpdateUser);

    return app.use("/", router);
};
export default initWebRoutes;
