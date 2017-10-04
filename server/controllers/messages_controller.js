var messages = [];
var id = 0;

module.exports = {
  create: (req, res) => {
    const { message, time } = req.body;
    messages.push({ id, message, time });
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
    messages = messages.filter((message) => messages.id !== req.params.id);
    res.status(200).send(messages);
  }
}