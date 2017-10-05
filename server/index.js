const express = require('express'),
      bodyParser = require('body-parser'),
      app = express(),
      port = 3000,
      baseURL = `/api/messages`,
      message_ctrl = require(`./controllers/messages_controller.js`),
      http = require(`http`);
      socketio = require(`socket.io`), 
      server = http.Server(app),
      websocket = socketio(server);

app.use(bodyParser.json());
app.use(express.static(__dirname + `/../public/build`));

app.post(baseURL, message_ctrl.create);
app.get(baseURL, message_ctrl.read);
app.put(baseURL + `/:id`, message_ctrl.update);
app.delete(baseURL + `/:id`, message_ctrl.delete);

server.listen(4000, () => console.log(`io is listening on port ${4000}`));

websocket.on(`connection`, socket => {
  console.log(`a user connected`);
})

app.listen(port, () => console.log(`app is listening port ${port}`));


