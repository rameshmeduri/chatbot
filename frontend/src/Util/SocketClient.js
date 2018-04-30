import io from 'socket.io-client';

const env = process.env.REACT_APP_ENV;

console.log(`Front End ENV :: ${env}`);

let socket;

if (env === 'production') {
    socket = io();
} else {
    socket = io('http://localhost:8080/');
}

socket.on('connection', () => {
    console.log('Socket Server Connected');
});

export default socket;