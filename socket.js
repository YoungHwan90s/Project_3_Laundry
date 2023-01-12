const socketIo = require('socket.io'); // 모듈 불러오기
const http = require('./app');
const io = socketIo(http); // http 객체를 Socket.io 모듈에 넘겨서 소켓 핸들러 생성

// 소켓 연결 이벤트 핸들링
io.on('connection', (socket) => {
  console.log(socket.id, '새로운 소켓이 연결됐어요!');

  socket.on('room1', () => {
    socket.join('room1');
    console.log(socket.rooms);
  });

  socket.on('room2', () => {
    socket.join('room2');
    console.log(socket.rooms);

    socket.on('enterMessage', (msg) => {
      console.log('Enter Message received: ' + msg);

      io.emit('enterMessage', msg);
    });
  });

  socket.emit('usercount', io.engine.clientsCount);

  socket.on('message', (msg) => {
    console.log('Message received: ' + msg);

    io.emit('message', msg);
  });

  socket.on('GET', (data) => {
    console.log('GET', data);
    const emitData = {
      shopName: data.shopName,
      laundryId: data.laundryId,
      // 혹은 ...data, 로 전환 가능
      date: new Date().toISOString(),
    };

    io.emit('GET_LAUNDRY', emitData);
  });

  socket.on('disconnect', () => {
    console.log(socket.id, '연결이 끊어졌어요!');
  });
});
