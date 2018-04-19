const express = require('express');
const socket = require('socket.io');
const steps = require('./messages');

const app = express();
const port = 5000;

const server = app.listen(port, () => {
    console.log(`server is listening on Port ${port}`);
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

        if (clientMsg.toUpperCase() === 'CLEAR') {
            nextObj = { nextAction: 'START', nextMsg: 'Clear Successful', timelineMsg: clientMsg, author };
        } else {
            switch (clientAction) {

                case 'START':
                    nextObj = { nextAction: 'STEP_1', nextMsg: 'BUY or SELL', timelineMsg: clientMsg, author };
                    break;

                case 'STEP_1':
                    nextObj = { nextAction: 'STEP_2', nextMsg: 'ISIN', timelineMsg: clientMsg, timelineStep: 'STEP_1', author };
                    break;

                case 'STEP_2':
                    nextObj = { nextAction: 'STEP_3', nextMsg: 'Quantity', timelineMsg: clientMsg, timelineStep: 'STEP_2', author };
                    break;

                case 'STEP_3':
                    nextObj = { nextAction: 'STEP_4', nextMsg: 'Price', timelineMsg: clientMsg, timelineStep: 'STEP_3', author };
                    break;

                case 'STEP_4':
                    nextObj = { nextAction: 'STEP_5', nextMsg: 'Book Trade(Yes/No/Clear) ', timelineMsg: clientMsg, timelineStep: 'STEP_4', author };
                    break;

                case 'STEP_5':
                    if (clientMsg.toUpperCase() === 'NO') {
                        nextObj = { nextAction: 'START', nextMsg: `Please Start Again`, timelineMsg: clientMsg, author };
                    } else {
                        nextObj = { nextAction: 'END', nextMsg: `#${Date.now()}`, timelineMsg: clientMsg, timelineStep: 'STEP_5', author };
                    }
                    break;
            }
        }

        io.emit('SERVER_ACTION', nextObj);

    });
});

