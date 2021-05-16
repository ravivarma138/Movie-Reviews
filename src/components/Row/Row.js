import React, { useState, useEffect } from 'react';
import axios from '../axios';
import YouTube from 'react-youtube';
import movieTrailer from 'movie-trailer';
import "./Row.css";
import { Scrollbars } from 'react-custom-scrollbars';
import { SunspotLoader,BoxesLoader,ScatterBoxLoader  } from "react-awesome-loaders";
import Skeleton from 'react-loading-skeleton';
const base_url = "https://image.tmdb.org/t/p/original";


function Row({ title, fetchUrl, isLargeRow }) {
    const [movies, setMovies] = useState([]);
    const [trailerUrl, setTrailerUrl] = useState("");
    const [loading, isLoading] = useState(true);

    useEffect(() => {

        async function fetchData() {
            await axios.get(fetchUrl).then(result => {
                console.log(result.data);
                setMovies(result.data.results);
                let timer1 = setTimeout(() => isLoading(false), 5 * 1000);
                // isLoading(false);
                // clearTimeout(timer1);
            })
        }
        fetchData();
    }, [fetchUrl]);



    const opts = {
        height: "390",
        width: "99%",
        playerVars: {
            autoplay: 0,
        }
    }

    const handleClick = (movie) => {
        // console.table(movie?.title)
        if (trailerUrl) {
            setTrailerUrl('')
        } else {
            movieTrailer(movie?.title || "")
                .then(url => {
                    const urlParams = new URLSearchParams(new URL(url).search);
                    setTrailerUrl(urlParams.get('v'));
                }).catch((error) => console.log(error));
        }
    }

    return loading ? (
        <div className="loader">
            <BoxesLoader
        boxColor={"#6366F1"}
        style={{ marginBottom: "20px" }}
        desktopSize={"128px"}
        mobileSize={"80px"}
      />
        </div>
    ) : (

        <div className="row">
            <h2>{title || <Skeleton duration={5} />}</h2>
            <div className="row_posters">
                {movies.map(movie => {
                    return <><img
                        key={movie.id}
                        // onClick={() => handleClick(movie)}
                        className={`row_poster ${isLargeRow && "row_posterLarge"}`}
                        src={`${base_url}${isLargeRow ? movie.poster_path : movie.backdrop_path}` || <Skeleton width={100} duration={5} />}
                        alt={movie.name} /></>
                })}
            </div>
        </div>

    )

}

export default Row;