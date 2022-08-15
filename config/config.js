require("dotenv").config();
const env = process.env;

const development = {
    username: env.DB_USER,
    password: env.DB_PASS,
    database: "juZZulDB",
    host: env.DB_HOST,
    dialect: "mysql",
};

const production = {
    username: "root",
    password: null,
    database: "database_production",
    host: "127.0.0.1",
    dialect: "mysql",
};

const test = {
    username: env.DB_USER,
    password: env.DB_PASS,
    database: "database_test",
    host: env.DB_HOST,
    dialect: "mysql",
};

module.exports = { development, production, test };