import { EventEmitter2 } from 'eventemitter2';
import Connect from '../services/connect';

const CONNECTED_CLIENT = 'connected-client';
const DISCONNECTED_CLIENT = 'disconnected-client';

class Server extends EventEmitter2 {
  constructor() {
    super();
    this.clients = [];
    this.connect = new Connect('server');
    this.connect.on('message', this.handlerMessage);
  }

  handlerMessage = (packet, sender, resolve) => {
    const {type, client} = packet;

    switch (type) {
      case CONNECTED_CLIENT:
        this.clients.push(client);
        this.emit('connected-client', client);
        resolve();
        break;

      case DISCONNECTED_CLIENT:
        this.clients = this.clients.filter(item => item !== client);
        this.emit('disconnected-client', client);
        resolve();
        break;

      default:
        this.emit('message', packet, sender, resolve);
        break;
    }
  };

  getConnectedClients() {
    return this.clients;
  }

  send(client, packet) {
    return this.connect.send(client, packet);
  }
}

export default Server;
