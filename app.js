const express = require("express");
const cookieParser = require("cookie-parser");
const app = express();
const port = 3000;

const cors = require("cors");
const router = require("./sever/routes");

const socketIo = require("socket.io");
const Http = require("http");
const http = Http.Server(app);
const io = socketIo(http, { path: "/socket.io" });
const jwt = require("jsonwebtoken");

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/", router);

app.get("/socket", (req, res) => {
    res.clearCookie("commentCookie");
    res.sendFile(__dirname + "/index.html");
});

let login_ids = {};

io.on("connection", (socket) => {
    // 'login' 이벤트를 받았을 때의 처리

    function sendResponse(socket, nickname) {
        if (nickname === "") return;
        if (
            nickname === "상대방의 닉네임을 찾을 수 없습니다." ||
            nickname.data
        ) {
            socket.emit("response", nickname);
        } else {
            let statusObj = { nickname: nickname };
            socket.emit("response", statusObj);
        }
    }

    socket.on("registerNickname", function (token) {
        // 기존 클라이언트 ID가 없으면 클라이언트 ID를 맵에 추가
        const [tokenType, tokenValue] = (token.id || "").split("=");

        try {
            const payloadToken = jwt.verify(tokenValue, "hohoho");

            if (login_ids[payloadToken.nickname]) {
                return;
            }
            login_ids[payloadToken.nickname] = socket.id;
            socket.login_id = payloadToken.nickname;
            console.log(
                "등록한 닉네임 갯수 : %d",
                Object.keys(login_ids).length
            );

            // 응답 메시지 전송
            sendResponse(socket, payloadToken.nickname);
        } catch (error) {
            console.log(error);
            return;
        }
    });

    socket.on("messageS", (message) => {
        if (message.data === "") return;
        if (message.recepient === "ALL") {
            io.sockets.emit("messageC", message);
        } else {
            // 일대일 채팅 대상에게 메시지 전달
            if (login_ids[message.recepient]) {
                // 클라이언트에 메시지 전송

                io.to(login_ids[message.recepient]).emit("messageC", message);

                // 응답 메시지 전송
                sendResponse(socket, message);
            } else {
                // 응답 메시지 전송
                sendResponse(socket, "상대방의 닉네임을 찾을 수 없습니다.");
            }
        }
    });

    // 접속해제
    socket.on("disconnect", () => {
        const deleteNickName = Object.keys(login_ids).find(
            (key) => login_ids[key] === socket.id
        );
        delete login_ids[deleteNickName];
    });
});

http.listen(port, () => {
    console.log(port, "포트로 서버가 열렸어요!");
});
