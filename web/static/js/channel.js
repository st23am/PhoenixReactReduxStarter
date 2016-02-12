import { Socket } from 'phoenix';

export function configureChannel() {
  let socket = new Socket("/socket");
  socket.connect();

  let channel = socket.channel('games:lobby');

  channel.join()
    .receive('ok', messages => console.log('catching up', messages))
    .receive('error', reason => console.log('failed join', reason));

  return channel;
}
