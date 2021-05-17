const API_KEY = process.env.REACT_APP_API_KEY

const requests = {
	fetchNowPlaying:`/movie/now_playing?api_key=${API_KEY}&language=en-US`,
	fetchTrending: `/trending/all/week?api_key=${API_KEY}&language=en-US`,
	fetchNetflixOriginals: `/discover/tv?api_key=${API_KEY}&with_network=123`,
	fetchAllMovies: `/discover/movie?api_key=${API_KEY}`,
	fetchAllTvShows:`/discover/tv?api_key=${API_KEY}`,
	fetchTopRatedMovie: `/movie/top_rated?api_key=${API_KEY}&language=en-US`,
    fetchTopRatedTv: `/tv/top_rated?api_key=${API_KEY}&language=en-US`,
    fetchUpcominMovies: `/movie/upcoming?api_key=${API_KEY}&language=en-US`,
	fetchActionMovies: `/discover/movie?api_key=${API_KEY}&with_genres=28`,
	fetchComedyMovies: `/discover/movie?api_key=${API_KEY}&with_genres=35`,
	fetchHorrorMovies: `/discover/movie?api_key=${API_KEY}&with_genres=27`,
	fetchRomanceMovies: `/discover/movie?api_key=${API_KEY}&with_genres=10749`,
	fetchDocumentaries: `/discover/movie?api_key=${API_KEY}&with_genres=99`,
	img_300 : "https://image.tmdb.org/t/p/w300",
	img_500 : "https://image.tmdb.org/t/p/w500",
	unavailable :"https://www.movienewz.com/img/films/poster-holder.jpg",
	unavailableLandscape :"https://user-images.githubusercontent.com/10515204/56117400-9a911800-5f85-11e9-878b-3f998609a6c8.jpg",
	noPicture :"https://upload.wikimedia.org/wikipedia/en/6/60/No_Picture.jpg"
};

export default requests;