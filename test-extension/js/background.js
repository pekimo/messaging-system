import messagingSystem from '../../src/index';
console.log('Back');

const server = messagingSystem.createServer();

server.on('connected-client', client => {
  console.log('Connect', client, server.getConnectedClients());

  setTimeout(() => {
    server.send(client, {hello: 'hello'});
  }, 3 * 1000);
});

server.on('disconnected-client', client => {
  console.log('Disconnect', client, server.getConnectedClients());
});

server.on('message', (data, sender, resolve) => {
  console.log('Message', data, sender);
});

