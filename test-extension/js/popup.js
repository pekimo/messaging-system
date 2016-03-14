import messagingSystem from '../../src/index';
console.log('Popup');

const client = messagingSystem.createClient('client_1');
client.on('message', (packet, sender) => {
  console.log('Message', packet, sender);
});

setTimeout(() => {
  client.send('server', {test: 'test'});
}, 10 * 1000);

