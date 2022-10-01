import express from "express";
import db from "./config/database.js";
import Users from "./models/user.model.js";
import router from "./routes/index.js";
import dotenv from "dotenv";


/* initiate dotenv */
dotenv.config();

/* initaite express */
const app = express();

/* make sure connection */
try {
    await db.authenticate();
    console.log('Database Connected...');
    await Users.sync(); // if in db no table, sequelize automate generated */
} catch (error) {
    console.error(error);
    
}

/* add middleware */
app.use(express.json());
app.use(router);

app.listen(2500, ()=> console.log('Server running at port 2500'));