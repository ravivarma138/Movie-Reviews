import React, { useRef, useEffect } from 'react'
import { IconButton } from "@material-ui/core";
import CommentIcon from '@material-ui/icons/Comment';
import { makeStyles } from '@material-ui/core/styles';
import Dialog from '@material-ui/core/Dialog';
import './Comments.css'
import { Container } from "@material-ui/core";
import { useQuill } from 'react-quilljs';
import 'quill/dist/quill.snow.css';
import ListItem from '@material-ui/core/ListItem';
import TextareaAutosize from '@material-ui/core/TextareaAutosize';
import List from '@material-ui/core/List';
import SendIcon from '@material-ui/icons/Send';
import Divider from '@material-ui/core/Divider';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import DeleteIcon from '@material-ui/icons/Delete';
import { CircleArrow as ScrollUpButton } from "react-scroll-up-button";
import Avatar from '@material-ui/core/Avatar';
import fire from '../../fire'
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import CloseIcon from '@material-ui/icons/Close';
import Fab from '@material-ui/core/Fab';
import Slide from '@material-ui/core/Slide';
import Button from '@material-ui/core/Button';
import Tooltip from '@material-ui/core/Tooltip';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

const useStyles = makeStyles((theme) => ({
    appBar: {
        position: 'fixed',
    },
    title: {
        marginLeft: theme.spacing(2),
        flex: 1,
        align: 'center'
    }
}));

const comm = {
    overflow: 'auto'
}

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});


function Comments({ media_type, id, name }) {
    const classes = useStyles();
    const [open, setOpen] = React.useState(false);
    const [comments, setComments] = React.useState([]);
    const [alert, setAlert] = React.useState(false);
    const [remove, setRemove] = React.useState();
    const [msg, setMsg] = React.useState();
    const date = new Date().toDateString();
    const { quill, quillRef } = useQuill();
    const messagesEndRef = useRef(null)

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
    }

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const alertClose = () => {
        setAlert(false);
    }

    const alertDelete = () => {
        const fireBaseConnect = fire.database().ref(media_type + '/' + id);
        const rem = fireBaseConnect.child(remove);
        rem.remove();
        console.log('Remove selected');
        setRemove(null);
        setAlert(false);
    }

    const deleteComment = (content) => {
        setAlert(true);
        console.log("content is", content);
        setRemove(content.id);
    };

    const appBarClick = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    const submitMessage = (event) => {
        console.log(msg);
        // event.target.value = '';

        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
        const fireBaseConnect = fire.database().ref(media_type + '/' + id);
        const sendToFire = {
            userName: fire.auth().currentUser.displayName,
            email: fire.auth().currentUser.email,
            photoURL: fire.auth().currentUser.photoURL,
            phoneNumber: fire.auth().currentUser.phoneNumber,
            uid: fire.auth().currentUser.uid,
            date: date,
            message: msg,
        };
        console.log('Sending this to fire', sendToFire);
        fireBaseConnect.push(sendToFire);
        setMsg('');

    }

    const handleMessageChange = (event) => {
        setMsg(event.target.value);
        console.log('change event', event.target.value);
        event.preventDefault();
    }

    const fetchComments = async () => {
        const commentsArray = fire.database().ref(media_type + '/' + id);
        commentsArray.on('value', (snapshot) => {

            console.log('All comments are', snapshot.val());

            const comments = snapshot.val();

            const commentsList = [];

            for (let id in comments) {
                commentsList.push({ id, ...comments[id] });
            }

            setComments(commentsList);



        });
    };

    useEffect(() => {
        fetchComments();
        console.log(media_type + '/' + id);
        // eslint-disable-next-line
    }, []);

    return (
        <div className="comm">
            <IconButton onClick={handleClickOpen} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }} color="primary" aria-label="Check Comments" component="span">
                <CommentIcon />&nbsp;Reviews
                  </IconButton>

            <Dialog fullScreen open={open} onClose={handleClose} TransitionComponent={Transition}>
                <AppBar onClick={appBarClick} className={classes.appBar}>
                    <Toolbar>
                        <Typography variant="h6" className={classes.title}>
                            Reviews:<br />
                            <span style={{ fontSize: ' 15px', width: '20%' }}>({name})</span>
                        </Typography>
                        <Fab onClick={handleClose} color="secondary" aria-label="add">
                            <CloseIcon />
                        </Fab>
                    </Toolbar>
                </AppBar>
                <div >
                    <Container>
                        <List style={{ position: 'relative', top: '95px', height: '500px', overflow: 'auto' }}>
                            {comments &&
                                comments.map((c) => (
                                    <>
                                        <ListItem alignItems="flex-start">
                                            <ListItemAvatar>
                                                <Avatar alt={c.userName || 'User'} src={c.photoURL || "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQHCZuslFbn42wwA9qw6ywBERhtpr_yOFy3Cw&usqp=CAU"} />
                                            </ListItemAvatar>
                                            <ListItemText
                                                primary={c.userName || c.email || c.phoneNumber}
                                                secondary={
                                                    <React.Fragment>
                                                        <Typography
                                                            component="span"
                                                            variant="body2"
                                                            color="textPrimary"
                                                        >
                                                            {c.message}
                                                        </Typography>
                                                        <br />
                                                        <div>{c.date}
                                                            {c.uid == fire.auth().currentUser.uid && <span>&nbsp;&nbsp;<Tooltip title="Delete Comment"><DeleteIcon onClick={() => deleteComment(c)} /></Tooltip></span>}
                                                        </div>
                                                    </React.Fragment>
                                                }
                                            />
                                        </ListItem>
                                        <Divider />
                                    </>
                                ))}

                            {comments.length === 0 && <div><br /><br /><br /><h2>No Comments Added!</h2></div>}
                        </List>

                    </Container>
                </div>

                <div className="quillfooter">
                    {/* <div ref={quillRef} /> */}
                    <TextareaAutosize value={msg} onChange={handleMessageChange} style={{ width: "100%" }} aria-label="minimum height" rowsMin={2} placeholder="Enter Comment..." />
                    <Button onClick={submitMessage} variant="contained" color="primary" style={{ marginBottom: '10px' }}> Send Message&nbsp;<SendIcon /></Button>
                </div>

                <div>
                    <Dialog
                        open={alert}
                        onClose={alertClose}
                        aria-labelledby="alert-dialog-title"
                        aria-describedby="alert-dialog-description"
                    >
                        <DialogTitle id="alert-dialog-title">{"Delete Comment?"}</DialogTitle>
                        <DialogContent>
                            <DialogContentText id="alert-dialog-description">
                                Are you sure you really want to delete this comment?
                            </DialogContentText>
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={alertClose} color="primary">
                                Disagree
                            </Button>
                            <Button variant="contained" color="primary" onClick={alertDelete} color="primary" autoFocus>
                                Agree
                            </Button>
                        </DialogActions>
                    </Dialog>
                </div>




            </Dialog>

        </div>
    )
}

export default Comments;
