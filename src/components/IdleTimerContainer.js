import IdleTimer from 'react-idle-timer'
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';
import React,{useRef,useState} from 'react'
import fire from '../fire'
import {Redirect} from 'react-router-dom'
import Login from './Login';


function IdleTimerContainer() {
    const idleTimerRef = useRef(null);
    const [isLoggedIn, setIsLoggedIn] = useState(true);
    const [open, setOpen] = React.useState(false);
    const Transition = React.forwardRef(function Transition(props, ref) {
        return <Slide direction="up" ref={ref} {...props} />;
      });

    
      const handleClose = () => {
        
        setOpen(false);
        fire.auth().signOut();
      };
    const onIdle = () => {
        setIsLoggedIn(false);
        console.log('Session Time-out');
        
        setOpen(true);
    }
    return (
        <div>
            <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        disableBackdropClick
        aria-labelledby="alert-dialog-slide-title"
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle id="alert-dialog-slide-title">{"Session Time-Out"}</DialogTitle>
        <DialogContent  style={{height:'100px'}}>
          <DialogContentText id="alert-dialog-slide-description">
            Your Session timed out, Please Log In Again to continue...
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button variant="contained" onClick={handleClose} color="primary">
            Ok
          </Button>
        </DialogActions>
      </Dialog>
            <IdleTimer ref={idleTimerRef} timeout={15*60*1000} onIdle={onIdle}>
            </IdleTimer>
        </div>
    )
}

export default IdleTimerContainer
