require("dotenv").config();
const {Client} = require('pg');

const client = new Client({
    host : "localhost",
    port : 5432,
    user :"postgres",
    password: "postgres",
    database : "taskmanagement"
});

const execute = async (query) => {
    try {
        await client.query(query);  
        return true;
    } catch (error) {
        console.error(error.stack);
        return false;
    }
};

const user = `
    CREATE TABLE IF NOT EXISTS "users" (
	    "id" BIGSERIAL,
	    "name" VARCHAR(200) NOT NULL,
	    "email" VARCHAR(200) NOT NULL,
        "password" VARCHAR(200) NOT NULL,
	    PRIMARY KEY ("id")
    );`;

const tasks =`CREATE TABLE IF NOT EXISTS "tasks" (
    "id" BIGSERIAL,
    user_id INT NOT NULL,
    "task_name" VARCHAR(200) NOT NULL,
    "date" date NOT NULL,
    "status" BOOLEAN NOT NULL,
    PRIMARY KEY ("id"),
    FOREIGN KEY ("user_id") REFERENCES users(id)
);`;

execute(user).then(result => {
    if (result) {
        console.log('User table created');
    }
});
execute(tasks).then(result => {
    if (result) {
        console.log('Tasks table created');
    }
});

module.exports = client;





