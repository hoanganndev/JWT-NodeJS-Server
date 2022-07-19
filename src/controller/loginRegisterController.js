import {
    handleUserLogin,
    registerNewUser,
} from "../service/loginRegisterService";

const handleRegister = async (req, res) => {
    try {
        let { email, phone, password } = await req.body;
        if (!email || !phone || !password) {
            return res.status(200).json({
                errorMessage: "Missing required parameters",
                errorCode: 1,
                data: "",
            });
        }
        if (password && password.length < 6) {
            return res.status(200).json({
                errorMessage: "Password must have more than 6 letters",
                errorCode: 1,
                data: "password",
            });
        }
        // Service: Create user
        let dataService = await registerNewUser(req.body);
        return res.status(200).json({
            errorMessage: dataService.errorMessage,
            errorCode: dataService.errorCode,
            data: dataService.data,
        });
    } catch (error) {
        console.log(
            "🔴>>> Error from login controller at handleRegister:",
            error
        );
        return res.status(500).json({
            errorMessage: "Error from server",
            errorCode: -1,
            data: "",
        });
    }
};

const handleLogin = async (req, res) => {
    try {
        let dataService = await handleUserLogin(req.body);
        return res.status(200).json({
            errorMessage: dataService.errorMessage,
            errorCode: dataService.errorCode,
            data: dataService.data,
        });
    } catch (error) {
        console.log("🔴>>> Error from login controller at handleLogin:", error);
        return res.status(500).json({
            errorMessage: "Error from server",
            errorCode: -1,
            data: "",
        });
    }
};

module.exports = {
    handleRegister,
    handleLogin,
};