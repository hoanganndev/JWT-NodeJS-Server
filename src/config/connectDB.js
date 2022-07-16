import { Sequelize } from "sequelize";
const sequelize = new Sequelize("jwt", "root", null, {
    host: "localhost",
    dialect: "mysql",
});
//Testing the connection
const connection = async () => {
    try {
        await sequelize.authenticate();
        console.log(
            "✅✅✅ Connection database has been established successfully."
        );
    } catch (error) {
        console.error("❌❌❌Unable to connect to the database:", error);
    }
};
export default connection;
/**💕💕💕
 * References:
 * Connecting to a database: https://sequelize.org/docs/v6/getting-started/#connecting-to-a-database
 * Testing the connection: https://sequelize.org/docs/v6/getting-started/#testing-the-connection
 */
