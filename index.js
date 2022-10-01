import express from "express";
import db from "./config/database.js";
import router from "./routes/index.js";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";


/* initiate dotenv */
dotenv.config();

/* initaite express */
const app = express();

/* make sure connection */
try {
    await db.authenticate();
    console.log('Connection has been established successfully.');
} catch (error) {
    console.error('Unable to connect to the database: ', error);
    
}

/* add middleware */
app.use(cors({ credentials:true, origin:'http://localhost:3000' }));
app.use(cookieParser()); // to get value from cookie
app.use(express.json());
app.use(router);

app.listen(2500, ()=> console.log('Server running at port 2500'));