const express = require('express');
const SocketServer = require('ws').Server;
const ws = require('ws');
const uuidv4 = require('uuid/v1');
const PORT = 3001;

const server = express()
  .use(express.static('public'))
  .listen(PORT, '0.0.0.0', 'localhost', () => console.log(`Listening on ${ PORT }`));

const wss = new SocketServer({ server });

wss.broadcast = function broadcast(data) {
  wss.clients.forEach(function each(client) {
    if (client.readyState === ws.OPEN) {
      client.send(data);
    }
  });
}

const broadcastUserCount = () => {
  wss.broadcast(JSON.stringify({
    type: 'incomingUserCount',
    userCount: wss.clients.size,
  }))
}

function getRandomColour() {
  var letters = '123456789ABCDEF';
  var color = '#';
  for (var i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

wss.on('connection', (ws) => {
  broadcastUserCount();
  console.log('Client connected');
  colourObj = {
    type: 'colourMessage',
    colour: getRandomColour(),
  }
  ws.send(JSON.stringify(colourObj));

  ws.onmessage = (msg) => {
    let uID = uuidv4();
    let text = JSON.parse(msg.data)
    let parsedType = text.type;
    const newText = JSON.stringify({
      id: uID,
      type: parsedType === 'postMessage' ? 'incomingMessage': 'incomingNotification',
      username: text.username,
      content: text.content,
      colour: text.colour,
      image: text.image,
    });
    wss.broadcast(newText);
  }

  ws.on('close', () => {
    console.log('Client disconnected');
    broadcastUserCount();
  });
});