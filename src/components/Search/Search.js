import {
    Button,
    createMuiTheme,
    Tab,
    Tabs,
    TextField,
    makeStyles,
    withStyles,
    ThemeProvider,
} from "@material-ui/core";
import "./Search.css";
import SearchIcon from "@material-ui/icons/Search";
import { useEffect, useState } from "react";
import axios from "../axios";
import CustomPagination from "../CustomPagination";
import SingleContent from "../SingleContent/SingleContent";
import { Container } from "@material-ui/core";
import requests from '../../service/requests';
const useStyles = makeStyles({
    root: {
        background: "white",
    },
    label: {
        color: 'pink'
    }
});

const Search = () => {
    const [type, setType] = useState(0);
    const [searchText, setSearchText] = useState("");
    const [page, setPage] = useState(1);
    const [content, setContent] = useState([]);
    const [numOfPages, setNumOfPages] = useState();
    const [noSearchflag, setNoSearchFlag] = useState(false);
    const classes = useStyles();

    // const darkTheme = createMuiTheme({
    //   palette: {
    //     type: "dark",
    //     primary: {
    //       main: "#fff",
    //     },
    //   },
    // });

    const styles = theme => ({
        multilineColor: {
            color: 'red'
        }
    });


    // const useStyles = makeStyles((theme) => ({
    //     root: {
    //       display: 'flex',
    //       flexWrap: 'wrap',
    //     },
    //     margin: {
    //       margin: theme.spacing(1),
    //     },
    //   }));

    const fetchSearch = async () => {
        console.log('fetch searcj');
        if (searchText.length > 0) {
            try {
                const { data } = await axios.get(
                    `/search/${type ? "tv" : "movie"}?api_key=${requests.api}&language=en-US&query=${searchText}&page=${page}&include_adult=false`
                );
                setContent(data.results);
                console.log(data.results.length);
                setNoSearchFlag(data.results.length > 0 ? false : true);
                console.log(noSearchflag);
                setNumOfPages(data.total_pages);
                // console.log(data);
            } catch (error) {
                setNoSearchFlag(false);
                console.error(error);
            }
        } 
        else {
            console.log('no search entered')
            setContent([]);
            setNumOfPages(0)
            setNoSearchFlag(false);
        }
    };

    useEffect(() => {
        window.scroll(0, 0);
        fetchSearch();
        // eslint-disable-next-line
    }, [type, page]);

    return (
        <Container>
            <div className="search">
                <TextField
                    style={{ flex: 1 }}
                    className={classes.root}
                    label="Search"
                    variant="filled"
                    onChange={(e) => setSearchText(e.target.value)}
                /><br />
                <Button
                    onClick={fetchSearch}
                    variant="contained"
                    style={{ marginLeft: 10, width: '10px' }}
                >
                    <SearchIcon fontSize="large" />
                </Button>
            </div>
            <Tabs
                value={type}
                indicatorColor="primary"
                variant="fullWidth"
                className={classes.label}
                onChange={(event, newValue) => {
                    setType(newValue);
                    setPage(1);
                }}
                style={{ paddingBottom: 5, minWidth: "100%", display: 'flex' }}
                aria-label="disabled tabs example"
            >
                <Tab style={{ width: "50%", textColor: 'red' }} label="Search Movies" />
                <Tab style={{ width: "50%" }} label="Search TV Series" />
            </Tabs>
            <div className="trending">
                {content &&
                    content.map((c) => (
                        <SingleContent
                            key={c.id}
                            id={c.id}
                            poster={c.poster_path}
                            title={c.title || c.name}
                            date={c.first_air_date || c.release_date}
                            media_type={type ? "tv" : "movie"}
                            vote_average={c.vote_average}
                        />
                    ))}
                {noSearchflag &&
                    (type ? <h2>No Series Found</h2> : <h2>No Movies Found</h2>)}
            </div>
            {numOfPages > 1 && (
                <CustomPagination setPage={setPage} numOfPages={numOfPages} />
            )}
        </Container>
    );
};

export default Search;