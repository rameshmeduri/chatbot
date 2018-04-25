import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { withStyles } from 'material-ui/styles';
import Grid from 'material-ui/Grid';
import TextField from 'material-ui/TextField';
import Icon from 'material-ui/Icon';
import Button from 'material-ui/Button';
import Card, { CardContent } from 'material-ui/Card';
import Typography from 'material-ui/Typography';
import socket from '../Util/SocketClient';
import Message from './Message';
import Timeline from './Timeline';
import Transactions from './Transactions';



const styles = theme => ({
    card: {
        minHeight: 400,
        margin: '5px'
    },
    form: {
        display: 'flex',
        flexWrap: 'wrap',
        marginTop: '20px',
        marginBottom: '20px',
        alignItems: 'center'
    },
    btn: {
        minWidth: '40px',
        padding: '0 5px'
    }
});

const initTimeline = () => {
    return [
        {
            event: 'STEP_1',
            completed: false,
            title: 'Type',
            desc: ''
        },
        {
            event: 'STEP_2',
            completed: false,
            title: 'ISIN',
            desc: ''
        },
        {
            event: 'STEP_3',
            completed: false,
            title: 'Quantity',
            desc: ''
        },
        {
            event: 'STEP_4',
            completed: false,
            title: 'Price',
            desc: ''
        },
        {
            event: 'STEP_5',
            completed: false,
            title: 'Book Trade',
            desc: ''
        },
        {
            event: 'END',
            completed: false,
            title: 'Status',
            desc: ''
        }
    ];
};

class Content extends Component {

    constructor(props) {
        super(props);
        this.state = {
            showTimeline: false,
            showUpdates: false,
            action: 'START',
            message: '',
            chatHistory: [],
            timelineEvents: initTimeline(),
            transactions: []
        };
        socket.on('SERVER_ACTION', (obj) => {
            console.log('recieve << SERVER_ACTION', obj);
            this.addServerMsg(obj);
        });
    }

    addServerMsg = (obj) => {
        const payload = {
            author: obj.author,
            message: obj.nextMsg,
            wait: obj.wait
        };

        this.setState({
            action: obj.nextAction,
            chatHistory: [...this.state.chatHistory, payload]
        });

        // Update Timeline Current Step Info
        const step = obj.timelineStep;
        if (step) {
            let newArr = [...this.state.timelineEvents];
            let foundItem = newArr.find((el) => el.event === step);
            foundItem.completed = true;
            foundItem.desc = obj.timelineMsg;

            if (obj.nextAction === 'END') {
                let lastItem = newArr[newArr.length - 1];
                lastItem.completed = true;
                lastItem.desc = obj.nextMsg;
                let newTrArr = this.state.transactions.concat(obj.nextMsg);
                this.setState({ action: 'START', transactions: newTrArr, showUpdates: true });
            }

            this.setState({
                showTimeline: true,
                timelineEvents: newArr
            });
        }
        setTimeout(() => { this.scrollToBot() }, 1200);
    }

    onChange = (e) => {
        this.setState({ message: e.target.value });
    }

    addClientMsg = (e) => {
        e.preventDefault();
        const action = this.state.action;
        let msg = this.state.message || '';

        if (action === 'STEP_1' || msg === 'C') {
            this.setState({
                showTimeline: false,
                showUpdates: false,
                timelineEvents: initTimeline()
            });
        }
        const obj = {
            author: 'USER',
            action: this.state.action,
            message: msg
        };
        console.log('emit >> CLIENT_ACTION', obj);
        socket.emit('CLIENT_ACTION', obj);
        this.setState({ message: '', chatHistory: [...this.state.chatHistory, obj] });
    }

    componentDidMount() {
        this.scrollToBot();
    }

    componentDidUpdate() {
        this.scrollToBot();
    }

    scrollToBot() {
        let node = ReactDOM.findDOMNode(this.refs.chats);
        node.scrollTop = node.scrollHeight;
    }

    render() {
        const { classes } = this.props;
        const { chatHistory, showTimeline, showUpdates, timelineEvents, transactions } = this.state;
        console.log(showUpdates);
        return (
            <div>
                <form className={classes.form} onSubmit={this.addClientMsg}>
                    <Grid container alignItems="center" justify="center">
                        <Grid item xs={12} sm={10}>
                            <TextField
                                placeholder="Type and hit enter to send message to BOT"
                                fullWidth
                                margin="normal"
                                value={this.state.message}
                                onChange={this.onChange}
                            />
                        </Grid>
                        <Grid item xs={12} sm={1}>
                            <Button type="submit" variant="raised" color="inherit" className={classes.btn}>
                                <Icon>send</Icon>
                            </Button>
                        </Grid>
                    </Grid>
                </form>
                <Grid container>
                    <Grid item xs={12} sm={4}>
                        <Card className={classes.card}>
                            <CardContent>
                                <Typography gutterBottom variant="headline" component="h2">2.0</Typography>
                                <div className="chat-history" ref="chats">
                                    {
                                        chatHistory.map((obj, index) => (
                                            <Message key={index} author={obj.author} message={obj.message} wait={obj.wait} />
                                        ))
                                    }
                                </div>
                            </CardContent>
                        </Card>
                    </Grid>
                    <Grid item xs={12} sm={4}>
                        <Card className={classes.card}>
                            <CardContent>
                                <Typography gutterBottom variant="headline" component="h2">Ticket</Typography>
                                <Timeline events={timelineEvents} show={showTimeline} />
                            </CardContent>
                        </Card>
                    </Grid>
                </Grid>
                <Grid container>
                    <Grid item xs={12} sm={6}>
                        <Card className={classes.card}>
                            <CardContent>
                                <Typography gutterBottom variant="headline" component="h2">Recent Updates</Typography>
                                <Transactions data={transactions} show={showUpdates} />
                            </CardContent>
                        </Card>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <Card className={classes.card}>
                            <CardContent>
                                <Typography gutterBottom variant="headline" component="h2">Product Info</Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                </Grid>
            </div>
        );
    }
}

export default withStyles(styles)(Content);