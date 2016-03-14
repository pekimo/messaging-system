import Server from './models/server';
import Client from './models/client';

export default {
  createServer() {
    return new Server();
  },

  createClient(sender) {
    return new Client(sender);
  }
}
