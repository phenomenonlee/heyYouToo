const express = require("express");
const cookieParser = require("cookie-parser");
const app = express();
const port = 3000;


app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const router = require("./sever/routes");

<<<<<<< HEAD
=======

app.use(cookieParser());
>>>>>>> 9625710e9946fa96cce94963cc12ce586bb0c42f
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use("/", router);

app.listen(port, () => {
    console.log(port, "포트로 서버가 열렸어요!");
});
