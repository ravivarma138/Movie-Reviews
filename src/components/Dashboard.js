import React,{useEffect} from 'react'
import { CircleArrow as ScrollUpButton } from "react-scroll-up-button";
import Header from './Header';
import Row from './Row/Row';
import requests from '../service/requests';
import RBCarousel from 'react-bootstrap-carousel';
import HomeCarousel from './HomeCarousel';
const Dashboard = (props) => {
  const { handleLogOut } = props;

  useEffect(() => {
    window.scroll(0,0);
}, []);
  return (
    <div>
      {/* <HomeCarousel fetchUrl={requests.fetchNowPlaying} /> */}
      <Row title="Trending" isLargeRow fetchUrl={requests.fetchTrending} />
      <Row title="Netflix Originals" isLargeRow fetchUrl={requests.fetchNetflixOriginals} />
      <Row title="Top Rated Movies" isLargeRow fetchUrl={requests.fetchTopRatedMovie} />
      <Row title="Top Rated Tv Series" isLargeRow fetchUrl={requests.fetchTopRatedTv} />
      <Row title="Documentaries" isLargeRow fetchUrl={requests.fetchDocumentaries} />
      <Row title="Upcoming Movies" isLargeRow fetchUrl={requests.fetchUpcominMovies} />
      
    </div>
  )
}

export default Dashboard;
