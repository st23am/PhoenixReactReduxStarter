import { Socket } from 'phoenix';

export function configureChannel() {
  let socket = new Socket("/socket");
  socket.connect();

  let channel = socket.channel('games:lobby');

  return channel;
}
