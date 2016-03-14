import { EventEmitter2 } from 'eventemitter2';

const runtime = chrome.runtime;

class Connect extends EventEmitter2 {
  constructor(sender) {
    super();
    this.sender = sender || null;

    if (runtime.onMessage != null) {
      runtime.onMessage.addListener(this.handlerMessage);
    } else {
      console.warn('Messageing-system: not define onMessage of runtime');
    }
  }

  handlerMessage = (packet, sender, sendResponse) => {
    if (this.sender === packet.receiver) {
      this.emit('message', packet.data, packet.sender, sendResponse);
      return true;
    }
  };

  getSender() {
    return this.sender;
  }

  send(receiver, data) {
    const packet = {
      sender: this.sender,
      receiver: receiver,
      data
    };

    return new Promise((resolve, reject) => {
      runtime.sendMessage(packet, resolve);
      return true;
    });
  }
}

export default Connect;
