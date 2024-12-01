import { useState } from "react";
import { Link } from "react-router-dom";

const MovieCard = ({movie, onUpdateWatchlist, watchlist}) => {

    const isMovieAdded = watchlist.find(addedMovie => addedMovie.id == movie.id);

    const handleWatchlistMovie = (e) => {
        const movieId = e.currentTarget.dataset.id;
        if(!isMovieAdded){
            onUpdateWatchlist((prevList) => {
                const favourites = ([...prevList, movie]);
                localStorage.setItem("favourites",JSON.stringify(favourites)|| []);
                return favourites;
            });
        }
        else{
            onUpdateWatchlist(prevList => {
                const newList = prevList.filter(item => item !== movie);
                localStorage.setItem("favourites",JSON.stringify(newList) || []);
                return newList;
            });
        }
        
    }

    return(
        <div className="movie-card">
            <Link to={`/movie-detail/${movie.id}`}><img src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}/></Link>
            <Link to={`/movie-detail/${movie.id}`}><h4>{movie.title}</h4></Link>
            <div className="add-watchlist" data-id={movie.id} onClick={handleWatchlistMovie}>
                <div className="watchlist-ribbon">
                    <svg class="ipc-watchlist-ribbon__bg" width="24px" height="34px" viewBox="0 0 24 34" xmlns="http://www.w3.org/2000/svg" role="presentation">
                    <polygon class="ipc-watchlist-ribbon__bg-ribbon" fill="#000000" points="24 0 0 0 0 32 12.2436611 26.2926049 24 31.7728343"></polygon>
                    <polygon class="ipc-watchlist-ribbon__bg-shadow" points="24 31.7728343 24 33.7728343 12.2436611 28.2926049 0 34 0 32 12.2436611 26.2926049">
                    </polygon>
                </svg>
                <div id="icon">{isMovieAdded ? "--": "+"}</div>
                </div>
                <span>Add Watchlist</span>
            </div>
        </div>
    )
}

export default MovieCard;