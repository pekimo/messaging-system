Messaging-system
===============

Messaging system is a helper for interaction in extensions of chrome browser.
To use only in extensions of chrome browser;

## Installation
```js
npm i --save-dev git+https://github.com/salting/messaging-system.git
```

## Usage

### File background.js
```js
const server = messagingSystem.createServer();

server.on('connected-client', nameClient => {
    console.log('Connected-client', server.getConnectedClients());
});

server.on('diconnected-client', nameClient => {
    console.log('Disconnected-client', server.getConnectedClients());
});

server.on('message', (packet, sender, sendResponse) => {
    console.log('Message', packet, sender);
});

server.send('clientPopup', {text: 'Hello client'});
```

### File popup.js or other "clients"
```js
import messagingSystem form 'messaging-system';

const clientPopup = messageingSystem.createClient('clientPopup');

on('message', (packet, sender, sendResponse) => {
    console.log('Message', packet, sender);
});

clientPopup.send('server', {text: 'Hello server'});
```