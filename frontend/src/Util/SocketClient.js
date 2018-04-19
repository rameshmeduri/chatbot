import io from 'socket.io-client';
const socket = io('http://localhost:5000');
export default socket;

/*
socket.on('connection', () => {
    console.log('Socket Connected');
});

socket.on('from_bot', (message) => {
    console.log('recive message:', message);
    messageStore.addMessage(message);
});

const sendMessage = (content) => {
    socket.emit('from_user', content);
}
*/