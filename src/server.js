import bodyParser from "body-parser";
import "dotenv/config";
import express from "express";
import connection from "./config/connectDB";
import configCors from "./config/CORS";
import configViewEngine from "./config/viewEngine";
import initApiRoutes from "./routes/api";
import initWebRoutes from "./routes/web";
import cookieParser from "cookie-parser";

const app = express();
const PORT = process.env.PORT ? process.env.PORT : 8080;

// Config Cors
configCors(app);

// Config view engine
configViewEngine(app);

// Config body parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Config cookies parser
app.use(cookieParser());

// Is connect database
connection();

// Init routes
initWebRoutes(app);
initApiRoutes(app);

app.listen(PORT, () => {
    console.log(`🟢🟢🟢 Server jwt is running on the port: ${PORT}`);
});
