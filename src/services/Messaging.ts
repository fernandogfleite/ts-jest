import { MessagingProtocol } from '../classes/interfaces/MessagingProtocol';

export class Messaging implements MessagingProtocol {
  sendMessage(message: string): void {
    console.log(message);
  }
}
