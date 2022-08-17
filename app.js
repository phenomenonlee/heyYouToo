const express = require("express");
const cookieParser = require("cookie-parser");
const app = express();
const port = 3000;

const cors = require("cors");
const router = require("./sever/routes");
const authMiddleware = require("./sever/middleware/auth-middleware");

/* const socketIo = require("socket.io");
const Http = require("http");
const http = Http.Server(app);
const io = socketIo(http, { path: "/socket.io" });
const jwt = require("jsonwebtoken"); */

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/", router);

/* app.get("/socket", authMiddleware, (req, res) => {
    res.sendFile(__dirname + "/index.html");
});
app.use("/static/index.css", express.static(__dirname + "/static/index.css"));
app.use(
    "/static/config/reset.css",
    express.static(__dirname + "/static/config/reset.css")
);

let login_ids = {};

io.on("connection", (socket) => {
    // 'login' 이벤트를 받았을 때의 처리
    socket.on("registerNickname", function (token) {
        // 기존 클라이언트 ID가 없으면 클라이언트 ID를 맵에 추가

        let [tokenType, tokenValue] = (token || "").split("=");

        const paloadToken = jwt.verify(tokenValue, "hohoho");

        login_ids[paloadToken.nickname] = socket.id;
        socket.login_id = login.id;

        console.log(
            "접속한 클라이언트 ID 갯수 : %d",
            Object.keys(login_ids).length
        );

        // 응답 메시지 전송
        sendResponse(socket, "login", "200", "로그인되었습니다.");
    });
});
*/
app.listen(port, () => {
    console.log(port, "포트로 서버가 열렸어요!");
});
