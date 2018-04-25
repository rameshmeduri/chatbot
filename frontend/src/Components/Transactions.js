import React, { Component } from 'react';
import List, { ListItem, ListItemText } from 'material-ui/List';
import Avatar from 'material-ui/Avatar';
import CreateIcon from '@material-ui/icons/Create';

class Transactions extends Component {

    state = { start: false, delay: 1200 };

    startTimer() {
        this.timer = setTimeout(() => {
            this.setState({
                start: true
            });
        }, this.state.delay);
    }

    render() {
        const { data, show } = this.props;
        const start = this.state.start;

        if ((show === false) && (start === false)) {
            return null;
        }

        if ((show === true) && (start === false)) {
            this.startTimer();
            return null;
        }

        if (show && start) {
            return (
                <List>
                    {
                        data.map((ticketId, index) => {
                            return (
                                <ListItem key="index">
                                    <Avatar>
                                        <CreateIcon />
                                    </Avatar>
                                    <ListItemText primary="User Created Ticket" secondary={ticketId} />
                                </ListItem>
                            );
                        })
                    }
                </List>
            );
        }
    }
}

export default Transactions;