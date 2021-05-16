import React, { useState, useEffect } from 'react';
import axios from './axios';
import Carousel from "react-multi-carousel";
import { Image } from "semantic-ui-react";
// import {Carousel}  from 'react-bootstrap'
import RBCarousel from "react-bootstrap-carousel";
import "bootstrap/dist/css/bootstrap.css";
import "react-bootstrap-carousel/dist/react-bootstrap-carousel.css";

const base_url = "https://image.tmdb.org/t/p/original"

function HomeCarousel({ fetchUrl }) {
    const [nowPlaying, setNowPlaying] = useState([]);
    

    useEffect(() => {

        async function fetchData() {

            const request = await axios.get(fetchUrl);
            console.log('Carousel', request.data);
            setNowPlaying(request.data.results);
            return request;
        }
        fetchData();
    }, [fetchUrl]);

    const imgType = {
        padding: '20px0 20px 20px'
    }

    const responsive = {
        desktop: {
          breakpoint: { max: 3000, min: 1024 },
          items: 1,
          paritialVisibilityGutter: 60
        },
        tablet: {
          breakpoint: { max: 1024, min: 464 },
          items: 1,
          paritialVisibilityGutter: 50
        },
        mobile: {
          breakpoint: { max: 464, min: 0 },
          items: 1,
          paritialVisibilityGutter: 30
        }
      };

      const images = [
        "https://images.unsplash.com/photo-1549989476-69a92fa57c36?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60",
        "https://images.unsplash.com/photo-1549396535-c11d5c55b9df?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60",
        "https://images.unsplash.com/photo-1550133730-695473e544be?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60",
        "https://images.unsplash.com/photo-1550167164-1b67c2be3973?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60",
        "https://images.unsplash.com/photo-1550338861-b7cfeaf8ffd8?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60",
        "https://images.unsplash.com/photo-1550223640-23097fc71cb2?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60",
        "https://images.unsplash.com/photo-1550353175-a3611868086b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60",
        "https://images.unsplash.com/photo-1550330039-a54e15ed9d33?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60",
        "https://images.unsplash.com/photo-1549737328-8b9f3252b927?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60",
        "https://images.unsplash.com/photo-1549833284-6a7df91c1f65?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60",
        "https://images.unsplash.com/photo-1549985908-597a09ef0a7c?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60",
        "https://images.unsplash.com/photo-1550064824-8f993041ffd3?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60"
      ];

    // const movies = nowPlaying.slice(0, 5).map((item, index) => {
    //     return (
    //         <div style={{ height: 500, width: "100%" }} key={index}>
    //             <div className="carousel-center">
    //                 <img style={{ height: 600 }} src={`${base_url}${item.backdrop_path}`} alt={item.name} />
    //             </div>
    //             <div className="carousel-center">
    //                 <i
    //                     className="far fa-play-circle"
    //                     style={{ fontSize: 95, color: "#f4c10f" }}
    //                 ></i>
    //             </div>
    //             <div
    //                 className="carousel-caption"
    //                 style={{ textAlign: "center", fontSize: 35 }}
    //             >
    //                 {item.name}
    //             </div>
    //         </div>
    //     )
    // });

    return (
        // <div className="container">
        //     <div className="row mt-2">
        //         <div className="col">
        //             <Carousel
        //                 autoplay={true}
        //                 pauseOnVisibility={true}
        //                 slidesshowSpeed={5000}
        //                 version={4}
        //                 indicators={false}
        //             >
        //                 {nowPlaying.slice(0, 5).map((item, index) => {

        //                     return (
        //                         <div style={{ height: 500, width: "100%" }} key={index}>
        //                             <div className="carousel-center">
        //                                 <img className="d-block w-100" style={{ height: 600 }} src={`${base_url}${item.backdrop_path}`} alt={item.name} />
        //                             </div>
        //                             <div className="carousel-center">
        //                                 <i
        //                                     className="far fa-play-circle"
        //                                     style={{ fontSize: 95, color: "#f4c10f" }}
        //                                 ></i>
        //                             </div>
        //                             <div
        //                                 className="carousel-caption"
        //                                 style={{ textAlign: "center", fontSize: 35 }}
        //                             >
        //                                 {item.name}
        //                             </div>
        //                         </div>
        //                     )

        //                 })}
        //             </Carousel>
        //         </div>
        //     </div>
        // </div>

        <Carousel
      ssr={false}
      containerClass='react-multi-carousel-list'
      partialVisbile
      slidesToSlide='1'
      arrows={true}
      itemClass="image-item"
      responsive={responsive}
    >
      {images.slice(0, 5).map(image => {
        return (
          <Image
            draggable={false}
            style={{ width: "100%", height: "100%" }}
            src={image}
          />
        );
      })}
    </Carousel>


        // <><h1>Hola</h1></>
    )
}

export default HomeCarousel
