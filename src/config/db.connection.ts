import mysql from 'mysql2';
import { DBConfig } from "./db.config";

export const db = mysql.createConnection({
    host: DBConfig.host,
    user: DBConfig.user,
    password: DBConfig.password,
    database: DBConfig.database,
    port: DBConfig.port,
}).promise();