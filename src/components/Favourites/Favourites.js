import React, { useEffect, useState } from 'react'
import { Container } from "@material-ui/core";
import { SunspotLoader } from "react-awesome-loaders";
import SingleContent from '../SingleContent/SingleContent'
import "./Favourites.css";
import fire from '../../fire'
function Favourites() {

  const [loading, isLoading] = useState(true);
  const [content, setContent] = useState([]);

  const fetchFavourites = async () => {
    const favouriteArray = fire.database().ref('Favourites');
    favouriteArray.on('value', (snapshot) => {
      console.log(snapshot.val());
      const favourites = snapshot.val();

      const favFinalList = [];

      for (let id in favourites) {
        console.log('id of userid is',id)
        if (favourites[id].userId == localStorage.getItem('uid')) {
          favFinalList.push({ id, ...favourites[id] });
        }
      }

      console.log('favFinalList', favFinalList);
      setContent(favFinalList);
    })

  };

  useEffect(() => {

    let timer1 = setTimeout(() => isLoading(false), 2.5 * 1000);
    fetchFavourites();
  }, []);

  return loading ? (
    <div className="loader">
      <SunspotLoader
        gradientColors={["#6366F1", "#E0E7FF"]}
        shadowColor={"#3730A3"}
        desktopSize={"128px"}
        mobileSize={"100px"}
      />
    </div>
  ) :
    (
      <Container>
        <span className="pageTitle">Favourites</span>
        <div className="favourite">
          {content &&
            content.map((c) => (
              <SingleContent
                key={c.id}
                id={c.mtvId}
                poster={c.poster}
                title={c.title}
                date={c.date}
                media_type={c.media_type}
                vote_average={c.vote}
              />
            ))}

            {content.length === 0 && <div><br/><br/><br/><h2>No Favourites Added!</h2></div>}
          {/* <Row title="Trending" isLargeRow fetchUrl={requests.fetchTrending} /> */}
        </div>
      </Container>
    )

}

export default Favourites

