var messages = [];
var id = 0;

module.exports = {
  create: (req, res) => {
    const { text, time, name } = req.body;
    messages.push({ id, text, time, name });
    id++;
    res.status(200).send(messages);
  },
  read: (req, res) => {
    res.status(200).send(messages);
  },
  update: (req, res) => {
    messages.forEach((message, index) => {
      if (message.id === +req.params.id) {
        messages[index] = Object.assign(message, req.body);
        res.status(200).send(messages);
      }
    });
    res.status(666).send("NOOOOOOO!!!!!");
  },
  delete: (req, res) => {
    messages = messages.filter((message) => message.id !== +req.params.id);
    res.status(200).send(messages);
  }
}