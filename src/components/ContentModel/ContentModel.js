import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import axios from 'axios';
import requests from '../../service/requests';
import "./ContentModel.css";
import Avatar from '@material-ui/core/Avatar';
import { Button } from "@material-ui/core";
import YouTubeIcon from "@material-ui/icons/YouTube";
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import Carousel from "../Carousel/Carousel";
import FavoriteOutlinedIcon from '@material-ui/icons/FavoriteOutlined';
import Tooltip from '@material-ui/core/Tooltip';
import Chip from '@material-ui/core/Chip';
import ReactPlayer from 'react-player';
import Badge from '@material-ui/core/Badge';
import ReactStars from "react-rating-stars-component";
import Rating from 'react-rating'
const useStyles = makeStyles((theme) => ({
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    overflow: "auto"
  },
  paper: {
    width: "90%",
    height: "80%",
    backgroundColor: "black",
    border: "1px solid #282c34",
    borderRadius: 10,
    color: "white",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(1, 1, 3),
  },
}));

export default function ContentModel({ children, media_type, id }) {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [content, setContent] = useState();
  const [video, setVideo] = useState();
  const [toggleHeart, setToggleHeart] = useState(false);
  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const changeHeartFlag = () => {
    setToggleHeart(!toggleHeart);
  }

  const fetchData = async () => {
    console.log('hola', media_type);
    console.log('id is', id);
    const { data } = await axios.get(
      `https://api.themoviedb.org/3/${media_type}/${id}?api_key=${requests.api}&language=en-US`
    );

    setContent(data);
    // console.log(data);
  };

  const fetchVideo = async () => {
    const { data } = await axios.get(
      `https://api.themoviedb.org/3/${media_type}/${id}/videos?api_key=${requests.api}&language=en-US`
    );

    setVideo(data.results[0]?.key);
  };

  useEffect(() => {
    fetchData();
    fetchVideo();
    // eslint-disable-next-line
  }, []);

  const MoviePalyerModal = () => {
    const youtubeUrl = "https://www.youtube.com/watch?v=";
    return (
      <Modal
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title
            id="contained-modal-title-vcenter"
            style={{ color: "#000000", fontWeight: "bolder" }}
          >
            {content.title}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body style={{ backgroundColor: "#000000" }}>
          <ReactPlayer
            className="container-fluid"
            url={youtubeUrl + video}
            playing
            width="100%"
          ></ReactPlayer>
        </Modal.Body>
      </Modal>
    );
  };

  return (
    <>
      <div
        className="media"
        style={{ cursor: "pointer" }}
        color="inherit"
        onClick={handleOpen}
      >
        {children}
      </div>

      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          {content && (
            <div className={classes.paper}>
              <div className="ContentModal">
                <img
                  src={
                    content.poster_path
                      ? `${requests.img_500}/${content.poster_path}`
                      : requests.unavailable
                  }
                  alt={content.name || content.title}
                  className="ContentModal__portrait"
                />
                <img
                  src={
                    content.backdrop_path
                      ? `${requests.img_500}/${content.backdrop_path}`
                      : requests.unavailableLandscape
                  }
                  alt={content.name || content.title}
                  className="ContentModal__landscape"
                />
                <div className="ContentModal__about">
                  <span className="ContentModal__title">
                    {content.name || content.title} (
                    {(
                      content.first_air_date ||
                      content.release_date ||
                      "-----"
                    ).substring(0, 4)}
                    )
                  </span>
                  {content.tagline && (
                    <i className="tagline">- {content.tagline}</i>
                  )}
                  <div style={{ padding: "6px 0" }}>
                    Genres: {content.genres && content.genres.map((genre) => (
                    <Chip

                      style={{ margin: 2 }}
                      label={genre.name}
                      avatar={<Avatar>{genre.name.substring(0, 2)}</Avatar>}
                      key={genre.id}
                      color="primary"
                      clickable
                      size="small"
                    />
                  ))}
                  </div>
                  <div>
                    <span>{
                      toggleHeart ? (
                        <div >
                          <Tooltip title="Remove from Favourites!" arrow>

                            <FavoriteOutlinedIcon fontSize="large" onClick={changeHeartFlag} style={{ justifyContent: 'flex-end', color: 'red' }}></FavoriteOutlinedIcon>
                          </Tooltip>
                          <span> Remove from Favourites</span>
                        </div>
                      ) : (
                        <div>
                          <Tooltip title="Add to Favourites!" arrow>
                            <FavoriteBorderIcon fontSize="large" onClick={changeHeartFlag} style={{ justifyContent: 'flex-end' }}></FavoriteBorderIcon>

                          </Tooltip>
                          <span> Add to Favourites</span>
                        </div>
                      )
                    }</span>
                    <span>Censor: {content.adult ? 'A' : 'U/A'}</span>
                  </div>
                  

                  <div style={{ display: 'flex', flexDirection: 'row', marginTop: '9px', marginBottom: '10px' }}>
                    <span>Rating: {content.vote_average}</span>
                    <span>&nbsp;(</span>
                    <ReactStars
                      count={content.vote_average}
                      size={16}
                      halfIcon={<i className="fa fa-star-half-alt"></i>}
                      isHalf={true}
                      color={'#f4c10f'}
                    />
                    <span>)</span>
                  </div>

                  <span className="ContentModal__description">
                    {content.overview}
                  </span>


                  {/* <Button
                    variant="contained"
                    startIcon={<YouTubeIcon />}
                    color="secondary"
                    target="__blank"
                    href={`https://www.youtube.com/watch?v=${video}`}
                  >
                    Watch the Trailer
                  </Button> */}

                  <ReactPlayer url={`https://www.youtube.com/watch?v=${video}`}  width="100%">
                  </ReactPlayer>

                  {/* <div>
                    <Carousel id={id} media_type={media_type} />
                  </div> */}

                  {/* <span >
                    {content.overview}
                  </span> */}
                </div>
              </div>
            </div>
          )}
        </Fade>
      </Modal>

    </>
  );
}