import io from 'socket.io-client';
const socket_server = process.env.REACT_APP_SOCKET_SERVER;
console.log('socket_server' , socket_server);
const socket = io(socket_server);
export default socket;


socket.on('connection', () => {
    console.log('Socket Connected');
});

/*
socket.on('from_bot', (message) => {
    console.log('recive message:', message);
    messageStore.addMessage(message);
});

const sendMessage = (content) => {
    socket.emit('from_user', content);
}
*/