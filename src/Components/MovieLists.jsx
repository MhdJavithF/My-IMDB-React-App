import { useEffect, useMemo, useState } from "react";
import MovieCard from "./MovieCard";
import Pagination from "./Pagination";
import Heading from "./Heading";



const MovieLists = () => {
    const [movies, setMovies] = useState([]);
    const [watchlistMovies, setWatchlists] = useState(() => {
        const favouriteData = localStorage.getItem("favourites") || [];
        return (JSON.parse(favouriteData));
    });

    const popularMovies = useMemo(() => movies.filter((movie) => {
        // console.log('popularMovies');
        return movie.popularity > 600;
    }).length, [movies]);


    const fetchCall = (pageNo) => {
        fetch(`https://api.themoviedb.org/3/movie/popular?api_key=91b86d6d565b7ac388d4dde45df6c38f&page=${pageNo}`)
            .then(res => res.json())
            .then(data => setMovies(data.results || []));
    }

    useEffect(() => {
        fetchCall(1);
    }, []);

    return (
        <>
            <Heading watchlistCount={watchlistMovies.length}/>
            <div className="movie-lists">
                {
                    movies.map(movie => (
                        <MovieCard movie={movie} onUpdateWatchlist={setWatchlists} watchlist={watchlistMovies}/>
                    ))
                }
            </div>
            <Pagination change={fetchCall}/>
        </>
        
    )
}

export default MovieLists;