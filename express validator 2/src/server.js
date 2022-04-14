const express = require("express")

const connect = require("./configs/db")
const app = express();
 app.use(express.json())

const usersController = require("./controller/user.controller")
app.use("/users", usersController);

const start = async () => {
    await connect()

    app.listen(2244, () => {
        console.log("Listening on port 2244");
    });
};

module.exports = start;
