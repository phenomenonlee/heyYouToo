//설치한 express 모듈 가져오기
const express = require("express");
//설치한 cookie-parser 모듈 가져오기
const cookieParser = require("cookie-parser");
//설치한 socket io 모듈 가져오기
const socket = require("socket.io")
//내장된 http 모듈 가져오기
const http = require("http")
//express 객체 생성
const app = express();
//express http 서버 생성
const server = http.createServer(app)
//생성된 서버를 socket.io에 바인딩
const io = socket(server)
//GET방식으로 경로에 접속하면 실행됨
app.get('/', function(req, res) {
    console.log("유저가 /으로 접속하였습니다!")
    response.send("hello, Express Server!!")
});
// const port = 3000;
server.listen(3000, function(){
    console.log('서버 실행 중..')
});

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const router = require("./sever/routes");
const { response } = require("express");

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
//app.use("/", router);

// app.listen(port, () => {
//     console.log(port, "포트로 서버가 열렸어요!");
// });
