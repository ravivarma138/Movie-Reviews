import axios from '../axios';
import "./TvShow.css";
import requests from '../../service/requests';
import { useEffect, useState } from "react";
import { ThreeDLoader } from "react-awesome-loaders";
import CustomPagination from '../CustomPagination';
import SingleContent from '../SingleContent/SingleContent'
import { Container } from "@material-ui/core";

const fetchUrl = requests.fetchAllTvShows;

function TvShow() {

    const [page, setPage] = useState(1);
    const [content, setContent] = useState([]);
    const [loading, isLoading] = useState(true);
    const [numOfPages, setNumOfPages] = useState();

    useEffect(() => {

        async function fetchData() {
            await axios.get(fetchUrl + `&page=${page}`).then(result => {
                console.log('Trending ddddr is' + result.data.results);
                setContent(result.data.results);
                setNumOfPages(result.data.total_pages)
                let timer1 = setTimeout(() => isLoading(false), 2.5 * 1000);
                // isLoading(false);
                // clearTimeout(timer1);
            })
        }
        fetchData();
    }, [fetchUrl, page]);

    return loading ? (
        <div className="loader">
            <ThreeDLoader
                colorRing1={"#DC2626"}
                desktopSize={"100px"}
                mobileSize={"64px"}
            />
        </div>
    ) :
        (
            <Container>
                <span className="pageTitle">Tv Shows</span>
                <div className="tvShow">
                    {content &&
                        content.map((c) => (
                            <SingleContent
                                key={c.id}
                                id={c.id}
                                poster={c.poster_path}
                                title={c.title || c.name}
                                date={c.first_air_date || c.release_date}
                                media_type={c.media_type}
                                vote_average={c.vote_average}
                            />
                        ))}
                    {/* <Row title="Trending" isLargeRow fetchUrl={requests.fetchTrending} /> */}
                </div>
                <CustomPagination setPage={setPage} numOfPages={numOfPages} />
            </Container>

        )
}

export default TvShow
