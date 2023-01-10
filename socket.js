const socketIo = require("socket.io"); // 모듈 불러오기
const http = require("./app");
const io = socketIo(http); // http 객체를 Socket.io 모듈에 넘겨서 소켓 핸들러 생성

// 소켓 연결 이벤트 핸들링
io.on("connection", (sock) => {
  const { watchCollect, watchByeBye } = initSocket(sock);

  watchCollect();

  watchByeBye();
});

function initSocket(sock) {
  console.log("새로운 소켓이 연결됐어요!");

  // sock.on을 대신해서, 특정 이벤트가 전달됐는지 감지할 때 사용될 함수
  function watchEvent(eventName, func) {
    sock.on(eventName, func);
  }

  // 현재 접속한 모든 클라이언트 들에게 메세지를 전송하는구나 라고 이해할 수 있는 함수
  function sendMessageAll(eventName, data) {
    io.emit(eventName, data);
  }

  return {
    watchCollect: () => {
      watchEvent("GET", (data) => {
        console.log(data);
        const emitData = {
          laundryId: data.laundryId,
          // 혹은 ...data, 로 전환 가능
          date: new Date().toISOString(),
        };

        sendMessageAll("GET_LAUNDRY", emitData);
      });
    },
    watchByeBye: () => {
      watchEvent("disconnect", () => {
        console.log(sock.id, "연결이 끊어졌어요!");
      });
    },
  };
}
