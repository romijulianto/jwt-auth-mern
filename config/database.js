import { Sequelize } from "sequelize";

const db = new Sequelize('jwt_auth_mern', 'root', '', {
    host: "localhost",
    dialect: "mysql",
    timezone: '+07:00' // your timezone comes here, ex.: 'US/Hawaii'
});

export default db;