require('dotenv').config();
const express = require('express');
const socket = require('socket.io');
const path = require('path');

const app = express();

const port = process.env.PORT;
const env = process.env.NODE_ENV;


if (env === 'PRODUCTION') {
    const staticPath = path.resolve(__dirname, '../frontend/build');
    app.use(express.static(staticPath));
    app.get('*', (req, res) => {
        res.sendFile(path.join(staticPath + '/index.html'));
    });
}

const server = app.listen(port, () => {
    console.log(`running on PORT :: ${port} ENV :: ${env}`);
});

const io = socket(server);

io.on('connection', (client) => {
    console.log('client connected...', client.id);
    const author = 'BOT';

    client.on('disconnect', () => {
        console.log('client disconnected...', client.id);
    });

    client.on('error', (err) => {
        console.log('received error from client:', client.id, err);
    });

    client.on('CLIENT_ACTION', (obj) => {
        console.log('CLIENT_ACTION', obj);

        const clientAction = obj.action;
        const clientMsg = obj.message;
        let nextObj;

        if (clientMsg === 'C') {
            nextObj = { nextAction: 'START', nextMsg: 'Clear Successful', timelineMsg: '', author, wait: true };
        } else {
            switch (clientAction) {

                case 'START':
                    nextObj = { nextAction: 'STEP_1', nextMsg: 'BUY or SELL (B/S)', timelineMsg: clientMsg, author, wait: true };
                    break;

                case 'STEP_1':
                    nextObj = { nextAction: 'STEP_2', nextMsg: 'ISIN', timelineMsg: (clientMsg === 'B') ? 'BUY' : 'SELL', timelineStep: 'STEP_1', author, wait: true };
                    break;

                case 'STEP_2':
                    nextObj = { nextAction: 'STEP_3', nextMsg: 'Quantity', timelineMsg: clientMsg, timelineStep: 'STEP_2', author, wait: true };
                    break;

                case 'STEP_3':
                    nextObj = { nextAction: 'STEP_4', nextMsg: 'Price', timelineMsg: clientMsg, timelineStep: 'STEP_3', author, wait: true };
                    break;

                case 'STEP_4':
                    nextObj = { nextAction: 'STEP_5', nextMsg: 'Book Trade [ Yes(Y) / No(N) / Clear(C) ]', timelineMsg: clientMsg, timelineStep: 'STEP_4', author, wait: true };
                    break;

                case 'STEP_5':
                    if (clientMsg === 'Y') {
                        nextObj = { nextAction: 'END', nextMsg: `Ticket #${Date.now()} Created`, timelineMsg: 'Yes', timelineStep: 'STEP_5', author, wait: true };
                    }
                    if (clientMsg === 'N') {
                        nextObj = { nextAction: 'START', nextMsg: `Please Start Again`, timelineMsg: 'No', timelineStep: 'STEP_5', author, wait: true };
                    }
                    if (clientMsg === 'C') {
                        nextObj = { nextAction: 'START', nextMsg: `Please Start Again`, timelineMsg: 'Clear', author, wait: true };
                    }
                    break;
            }
        }

        io.emit('SERVER_ACTION', nextObj);

    });
});

