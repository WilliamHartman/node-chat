const express = require('express'),
      bodyParser = require('body-parser'),
      app = express(),
      port = 3000;

app.use(bodyParser.json());


app.listen(port, () => console.log(`I'm listening... port ${port}`));
