const http = require("./app.js");
const port = 4000
require("./socket.js")


http.listen(port, () => {
    console.log("서버가 요청을 받을 준비가 됐어요");
  });