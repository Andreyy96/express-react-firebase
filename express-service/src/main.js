const express = require("express");
const config = require('./configs/config');
const cors = require("cors");
const fileupload = require("express-fileupload");
const {authRouter} = require("./routers/auth.router")
const {userRouter} = require("./routers/user.router")
const {chatRouter} = require("./routers/chat.router");


const app = express();


app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(fileupload());

app.use("/auth", authRouter)
app.use("/users", userRouter)
app.use("/chats", chatRouter)

app.use(
    "*",
    (err, req, res, next) => {
        return res.status(err.status || 500).json(err.message);
    },
);
process.on("uncaughtException", (error) => {
    console.error("uncaughtException: ", error);
    process.exit(1);
});

app.listen(config.PORT, config.HOST, async () => {
    console.log(`Server is running at http://${config.HOST}:${config.PORT}`);
});