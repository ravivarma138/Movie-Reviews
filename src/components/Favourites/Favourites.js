import React,{useEffect,useState} from 'react'
import Button from '@material-ui/core/Button';
import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import fire from '../../fire'
function Favourites() {

    const [open, setOpen] = useState(false);
    const [favourites, setFavourites] = useState(null);

    useEffect(() => {
        handleClick();
        favouriteRealTime();
      }, []);

  const favouriteRealTime = () => {
    const ref = fire.database().ref(``)
  }

  const handleClick = () => {
    setOpen(true);
  };

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };
    return (
        <div>
            <Snackbar
            anchorOrigin={{
                vertical: 'top',
                horizontal: 'middle',
              }}
              open={open}
              autoHideDuration={6000}
              onClose={handleClose}
                message="Feature Yet to be Added, Sry for the delay"
                action={
                    <React.Fragment>
                      <Button color="secondary" size="small" onClick={handleClose}>
                        UNDO
                      </Button>
                      <IconButton size="small" aria-label="close" color="inherit" onClick={handleClose}>
                        <CloseIcon fontSize="small" />
                      </IconButton>
                    </React.Fragment>
                  }
            />
        </div>
    )
}

export default Favourites

