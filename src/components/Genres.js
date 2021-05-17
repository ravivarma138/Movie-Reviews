import { Chip } from "@material-ui/core";
import axios from "./axios";
import { useEffect } from "react";
import requests from '../service/requests';

const Genres = ({
    selectedGenres,
    setSelectedGenres,
    genres,
    setGenres,
    type,
    setPage,
}) => {
    const handleAdd = (genre) => {
        setPage(1);
        console.log(setPage);
        setSelectedGenres([...selectedGenres, genre]);
        setGenres(genres.filter((g) => g.id !== genre.id));
        
    };

    const handleRemove = (genre) => {
        setPage(1);
        setSelectedGenres(
            selectedGenres.filter((selected) => selected.id !== genre.id)
        );
        setGenres([...genres, genre]);
        
    };

    const fetchGenres = async () => {
        const { data } = await axios.get(
            `https://api.themoviedb.org/3/genre/${type}/list?api_key=${requests.api}&language=en-US`
        );
        setGenres(data.genres);
    };

    useEffect(() => {
        fetchGenres();

        return () => {
            setGenres({}); // unmounting
        };
        // eslint-disable-next-line
    }, []);

    return (
        <div style={{ padding: "6px 0" }}>
            {selectedGenres.map((genre) => (
                <Chip
                    style={{ margin: 2}}
                    label={genre.name}
                    key={genre.id}
                    color="primary"
                    clickable
                    size="small"
                    onDelete={() => handleRemove(genre)}
                />
            ))}
            {genres.map((genre) => (
                <Chip
                    style={{ margin: 2 }}
                    label={genre.name}
                    key={genre.id}
                    clickable
                    size="small"
                    onClick={() => handleAdd(genre)}
                />
            ))}
        </div>
    );
};

export default Genres;