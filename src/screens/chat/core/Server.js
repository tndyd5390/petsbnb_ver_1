const app = require('express')();

app.use((err, req, res, next) => {
    console.error("Error on request %s %s", req.method, req.url);
    console.error(err.stack);
    res.status(500).send("Server error");
  });
  
  process.on('uncaughtException', evt => {
    console.log('uncaughtException: ', evt);
  });
  
  const server = require('http').createServer(app);
  const io = require('socket.io')(server);
  const port = process.env.PORT || 3000;
  const LOBBY_ROOM_ID = 'LOBBY';

  server.listen(port, ()=>{
    console.log('Listening on port ' + port);
  });
  
  io.on('connection', (socket)=>{
      const { userNo } = socket.handshake.query;
      const user = {id: socket.id, userNo : userNo};
      socket.emit('connected', user);  
        socket.on('enterLobby', ()=>{
        console.log(user);
        socket.join(userNo, ()=>{
            socket.emit('rooms', [{user}]);
        })
    })
  })