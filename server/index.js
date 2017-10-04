const express = require('express'),
      bodyParser = require('body-parser'),
      app = express(),
      port = 3000,
      baseURL = `http://localhost:3000/api/messages`,
      message_ctrl = require(`./controllers/messages_controller.js`);

app.use(bodyParser.json());
app.use(express.static(__dirname + `/../public/build`));

app.post(baseURL, message_ctrl.create);
app.get(baseURL, message_ctrl.read);
app.put(baseURL + `/:id`, message_ctrl.update);
app.delete(baseURL + `/:id`, message_ctrl.delete);

app.listen(port, () => console.log(`I'm listening... port ${port}`));


