import React from 'react';
import { withStyles } from 'material-ui/styles';
import Grid from 'material-ui/Grid';
import TextField from 'material-ui/TextField';
import Icon from 'material-ui/Icon';
import Button from 'material-ui/Button';

const styles = (theme) => ({
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

const Form = (props) => {
    const { classes, onChange } = props;
    return (
        <form className={classes.root} noValidate autoComplete="off">
            <Grid container spacing={0} alignItems="center" justify="center">
                <Grid item xs={12} sm={8}>
                    <TextField
                        placeholder="Reply to Bot"
                        fullWidth
                        margin="normal"
                        value={this.state.userMessage}
                        onChange={onChange}
                    />
                </Grid>
                <Grid item xs={12} sm={2}>
                    <Button type="submit" variant="raised" color="inherit" className={classes.btn}>
                        <Icon>send</Icon>
                    </Button>
                </Grid>
            </Grid>
        </form>
    );

};

export default withStyles(styles)(Form);
