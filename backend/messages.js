const steps = {
    'START': {
        client: '?',
        server: 'BUY or SELL'
    },
    'STEP_1': {
        client: 'BUY',
        server: 'ISIN'
    },
    'STEP_2': {
        client: '123',
        server: 'QUANTITY'
    },
    'STEP_3': {
        client: '100',
        server: 'PRICE'
    },
    'STEP_4': {
        client: '10.96',
        server: 'BOOK_TRADE(YES/NO/CLEAR)'
    },
    'STEP_5': {
        client: 'YES',
        server: '#123 Booked'
    }
};

module.exports = steps;