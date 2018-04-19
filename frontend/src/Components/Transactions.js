import React from 'react';
import List, { ListItem, ListItemText } from 'material-ui/List';
import Avatar from 'material-ui/Avatar';
import CreateIcon from '@material-ui/icons/Create';

const Transactions = ({ data, show }) => {
    if (show) {
        return (
            <List>
                {
                    data.map((ticketId, index) => {
                        console.log(ticketId);
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
    } else {
        return null;
    }
};

export default Transactions;