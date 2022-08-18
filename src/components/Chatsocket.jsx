// import React from "react";

// const Chatsocket = () => {
//   let nickname = "";

//   const socket = io.connect("http://wetube-phenomenonlee.shop/", {
//     path: "/socket.io",
//     // transports: ["websocket"],
//   });

//   // 닉네임 등록 버튼 클릭 시 처리
//   function registerNickname() {
//     id = document.cookie;

//     const cookieLength = id.split(";");
//     const includesToken = cookieLength.find((curV, index) => {
//       if (curV.includes("token")) {
//         return curV;
//       }
//     });

//     let token = { id: includesToken };

//     socket.emit("registerNickname", token);

//     socket.on("response", function (response) {
//       if (response.data) {
//         println(
//           "<p>" +
//             response.sender +
//             " =>  " +
//             response.recepient +
//             "</p>" +
//             "<p>" +
//             "   " +
//             response.data +
//             "</p>"
//         );
//       } else if (!response.nickname) {
//         println(response);
//       } else {
//         println("닉네임 등록: " + response.nickname);
//         nickname = response.nickname;
//       }
//     });
//   }
//   // 전송 버튼 클릭 시 처리
//   const sendButton = () => {
//     let sender = nickname;
//     let recepient = $("#recepientInput").val();
//     let data = $("#dataInput").val();

//     let output = {
//       sender: sender,
//       recepient: recepient,
//       data: data,
//     };

//     // step1. 서버 소켓에 message 이벤트를 호출
//     socket.emit("messageS", output);
//   };

//   socket.on("messageC", (message) => {
//     println(
//       "<p>" +
//         (message.sender.length === 0 ? "익명" : message.sender) +
//         " =>  " +
//         message.recepient +
//         "</p>" +
//         "<p>" +
//         "   " +
//         message.data +
//         "</p>"
//     );
//   });

//   function println(data) {
//     $("#result").append("<p>" + data + "</p>");
//   }
//   return (
//     <>
//       <h2>HeyYou2</h2>
//       <br />
//       <div>
//         <input type="button" onclick="registerNickname()" value="닉네임 등록" />
//         <span style="font-size: 13px">
//           (닉네임 등록 하시려면 로그인 먼저 해주세요)
//         </span>
//       </div>

//       <br />
//       <div>
//         <div>
//           <span>받는사람 닉네임 :</span>
//           <input type="text" id="recepientInput" value="ALL" />
//         </div>
//         <div>
//           <span>메시지 데이터 :</span>
//           <input
//             type="text"
//             id="dataInput"
//             value=""
//             placeholder="값을 입력해주세요"
//           />
//         </div>
//         <br />
//         <input type="button" onclick="sendButton()" value="전송" />
//       </div>

//       <hr />
//       <p>대화 내용 :</p>
//       <div id="result"></div>
//     </>
//   );
// };
