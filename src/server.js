import express from "express";
import configViewEngine from "./configs/viewEngine";
import initWebRoutes from "./routes/web";
import bodyParser from "body-parser";
import "dotenv/config";
import connection from "./config/connectDB";
const app = express();
//Config view engine
configViewEngine(app);
//Config body parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
//Is connect database
connection();
//Init web routes
initWebRoutes(app);
const PORT = process.env.PORT ? process.env.PORT : 8080;
app.listen(PORT, () => {
    console.log(`🟢🟢🟢 Server jwt is running on the port: ${PORT}`);
});
