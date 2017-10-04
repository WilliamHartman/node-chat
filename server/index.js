const express = require('express'),
      bodyParser = require('body-parser'),
      app = express(),
      port = 3000,
      baseURL = `https://localhost:3000/api/messages`,
      message_ctrl = require(`./controllers/messages_controller.js`);

app.use(bodyParser.json());

app.post(baseURL, message_ctrl.create);
app.get(baseURL, message_ctrl.read);
app.put(baseURL, message_ctrl.update);
app.delete(baseURL, message_ctrl.delete);

app.listen(port, () => console.log(`I'm listening... port ${port}`));
