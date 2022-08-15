const express = require("express");
const cookieParser = require("cookie-parser");
const app = express();
const port = 3000;

const cors = require("cors");

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const router = require("./sever/routes");

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use("/", router);

app.listen(port, () => {
    console.log(port, "포트로 서버가 열렸어요!");
});
