const express = require('express');
const SocketServer = require('ws').Server;
const ws = require('ws');
const uuidv4 = require('uuid/v1');
const PORT = 3001;

const server = express()
  .use(express.static('public'))
  .listen(PORT, '0.0.0.0', 'localhost', () => console.log(`Listening on ${ PORT }`));


const wss = new SocketServer({ server });

// Set up a callback that will run when a client connects to the server
// When a client connects they are assigned a socket, represented by
// the ws parameter in the callback.


wss.broadcast = function broadcast(data) {
  wss.clients.forEach(function each(client) {
    if (client.readyState === ws.OPEN) {
      client.send(data)
    }
  })
}

const broadcastUserCount = () => {
  wss.broadcast(JSON.stringify({
    type: 'incomingUserCount',
    userCount: wss.clients.size
  }))

}


wss.on('connection', (ws) => {

  broadcastUserCount();
  console.log('Client connected');


  ws.onmessage = (msg) => {
    let uID = uuidv4();
    let text = JSON.parse(msg.data)
    let parsedType = text.type;
    const newText = JSON.stringify({id: uID,
                                    type: parsedType === 'postMessage' ? 'incomingMessage': 'incomingNotification',
                                    username: text.username,
                                    content: text.content,
                                    userCount: wss.clients.size});

    wss.broadcast(newText);
  }

  // Set up a callback for when a client closes the socket. This usually means they closed their browser.
  ws.on('close', () => {
    console.log('Client disconnected');
    broadcastUserCount();
  });
});

