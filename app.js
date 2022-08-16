const express = require("express");
const cookieParser = require("cookie-parser");
const app = express();
const port = 3000;

const cors = require("cors");
const socketIo = require("socket.io");
const Http = require("http");
const http = Http.Server(app);
const io = socketIo(http, { path: "/socket.io" });
const jwt = require("jsonwebtoken");

const authMiddleware = require("./sever/middleware/auth-middleware");

app.use(
    cors({
        origin: "*", // 출처 허용 옵션
        credential: "true", // 사용자 인증이 필요한 리소스(쿠키 ..등) 접근
    })
);
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const router = require("./sever/routes");

app.use("/static/index.css", express.static(__dirname + "/static/index.css"));
app.use(
    "/static/config/reset.css",
    express.static(__dirname + "/static/config/reset.css")
);
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use("/", router);

app.get("/socket", authMiddleware, (req, res) => {
    res.sendFile(__dirname + "/index.html");
});

let socket_ids = [];

function registerUser(socket, nickname) {
    // socket_id와 nickName 셋업
    socket.get("nickname", function (err, pre_nick) {
        if (pre_nick !== undefined) delete socket_ids[pre_nick];
        socket_ids[nickname] = socket.id;
        socket.set("nickname", nickname, () => {
            io.socket.emit("userlist", { users: Object.keys(socket_ids) });
        });
    });
}

io.on("connection", (socket) => {
    let nickname = "";

    socket.on("message", (cookie) => {
        const token = cookie;
        const [tokenType, tokenValue] = (token || "").split("=");
        const tokenvoll = jwt.verify(tokenValue, "hohoho");
        nickname = tokenvoll.nickname;
    });

    // 메시지 송신
    function post(data) {
        io.emit("news", `${nickname}: ${data}`);
    }

    // 메시지 수신
    socket.on("reply", (data) => {
        post(data);
    });

    // 접속해제
    socket.on("disconnect", () => {
        console.log("Bye Bye");
        clearInterval(socket.interval);
    });

    // 에러 났을 때
    socket.on("error", (error) => {
        console.error(error);
    });
});

http.listen(port, () => {
    console.log(port, "포트로 서버가 열렸어요!");
});
