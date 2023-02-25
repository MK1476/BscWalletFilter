import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { AppBar, Toolbar, Typography } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    elevation: 4, // or any value you want for the elevation
  },
  toolbar: {
    display: 'flex',
    justifyContent: 'space-between',
  },
}));

function NavigationBar() {
  const classes = useStyles();

  return (
    <AppBar position="fixed" className={classes.appBar}>
      <Toolbar className={classes.toolbar}>
        <Typography variant="h6">BSC Wallet Filter</Typography>
        <Typography variant="h6">Check Balance</Typography>
      </Toolbar>
    </AppBar>
  );
}

export default NavigationBar;
