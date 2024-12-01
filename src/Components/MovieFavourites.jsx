import { useEffect, useState } from "react";
import { FaArrowUpLong,FaArrowDownLong } from "react-icons/fa6";
import Heading from "./Heading";

const MovieFavourites = () => {
    let genreids = {
        28: "Action",
        12: "Adventure",
        16: "Animation",
        35: "Comedy",
        80: "Crime",
        99: "Documentary",
        18: "Drama",
        10751: "Family",
        14: "Fantasy",
        36: "History",
        27: "Horror",
        10402: "Music",
        9648: "Mystery",
        10749: "Romance",
        878: "Sci-Fi",
        10770: "TV",
        53: "Thriller",
        10752: "War",
        37: "Western",
    };

    const [favMovieList, setFavMovieList] = useState([]);
    const [genres, setGenres] = useState([]);
    const [selectGenre, setSelectGenre] = useState("");
    const [filterMovieList, setFilterMovieList] = useState([]);

    useEffect(() => {
        const favouriteData = JSON.parse(localStorage.getItem("favourites")) || [];
        setFavMovieList(favouriteData);
        setFilterMovieList(favouriteData);

        const genreData = favouriteData.map(data => data.genre_ids[0]);
        setGenres(Array.from(new Set(genreData)));
    },[])

    const handleSelectGenre = (e) => {
        setSelectGenre(e.target.dataset.id)
    }
    
    useEffect(() => {
        setFilterMovieList(() => {
            return favMovieList.filter(movie => !selectGenre || movie.genre_ids[0] == selectGenre)
        });
    },[selectGenre,favMovieList])

    const handleSearch = (e) => {
        const search = e.target.value;
        setFilterMovieList(()=>{
            return favMovieList.filter(movie => movie.title.toLowerCase().includes(search.toLowerCase()));
        })
    }

    const handleSort = (e) => {
        const sortingType = e.currentTarget.dataset.type;
        setFilterMovieList(()=>{
            if(!sortingType && !selectGenre){
                return favMovieList;
            }
            else if(!sortingType){
                return filterMovieList;
            }
            else{
                return [...filterMovieList].sort((a,b) => sortingType == "ASC" ? a.popularity - b.popularity : b.popularity - a.popularity);
            }
        });
    }

    const handleRemoveMovie = (movieId) => () => {
        setFavMovieList((prevFavList) => {
            const movieIdx = prevFavList.findIndex(movie => movie.id == movieId);
            const finalFavList = [...prevFavList];
            finalFavList.splice(movieIdx,1);
            localStorage.setItem("favourites", JSON.stringify(finalFavList));
            return finalFavList;
        })
        
    }

    return (
        <div>
            <Heading watchlistCount={favMovieList.length}/>
            <div className="fav-head">
                <h2> Favourite Movies</h2>
                <input type="text" placeholder="Search by title..." onChange={handleSearch}/>
            </div>
            
            <div className="fav-wrapper">
                <div className="left-sec">
                    <div className="genres-wrapper">
                        <div className={`genre ${selectGenre == "" ? "selected" : "" }`} onClick={handleSelectGenre} data-id={""} >All Genre</div>
                        {
                            genres.map(genreId => (
                                <div className={`genre ${selectGenre == genreId ? "selected" : "" }`} onClick={handleSelectGenre} data-id={genreId}>{genreids[genreId]}</div>
                            ))
                        }
                    </div>
                </div>
                <div className="right-sec">
                    <table>
                        <thead>
                            <tr>
                                <th>Image</th>
                                <th>Title</th>
                                <th>Genre</th>
                                <th>
                                    <span data-type="" onClick={handleSort}>Popularity</span>
                                    <span data-type="DEC" onClick={handleSort}><FaArrowUpLong/></span>
                                    <span data-type="ASC" onClick={handleSort}><FaArrowDownLong/></span>
                                </th>
                                <th>Rating</th>
                                <th>Acions</th>
                            </tr>
                        </thead>
                        <tbody>
                                {
                                    filterMovieList.length == 0 ? <p>Please add some Favourite movie!</p> :filterMovieList?.map((fav) => (
                                        <tr>
                                            <td><img src={`https://image.tmdb.org/t/p/w500/${fav.poster_path}`} style={{width:"120px"}}/></td>
                                            <td>{fav.title}</td>
                                            <td>{genreids[fav.genre_ids[0]]}</td>
                                            <td>{fav.popularity}</td>
                                            <td>{fav.vote_average}</td>
                                            <td><button onClick={handleRemoveMovie(fav.id)}>Remove</button></td>
                                        </tr>
                                    ))
                                }
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}

export default MovieFavourites;