import AddMovie from "./AddMovie";
import Heading from "./Heading";
import MovieDetails from "./MovieDetails";
import MovieLists from "./MovieLists";
import MovieFavourites from "./MovieFavourites";
import {
  // BrowserRouter,
    createBrowserRouter,
    RouterProvider,
} from "react-router-dom";

const router = createBrowserRouter([
    {
      path: "/",
      element: (
        <>
            <MovieLists/>
        </>
      )
    },
    {
        path: "/add-movie",
        element: (
          <>
              <Heading/>
              <AddMovie/>
          </>
        )
      },
      {
        path: "/movie-detail",
        element: (
          <>
              <Heading/>
              <div>
                <h2 style={{textAlign:"center",color:"white", verticalAlign:'center'}}>Please click the movie card separately
                  <p>to view the movie details.</p>
                </h2>
              </div>
          </>
        )
      },
      {
        path: "/movie-detail/:movieId",
        element: (
          <>
              <Heading/>
              <MovieDetails/>
          </>
        )
      },
      {
        path: "/movie-favourites/",
        element: (
          <>
              <MovieFavourites />
          </>
        )
      }
  ]);

const MovieApp = () => {
    return(
        <div>
          <RouterProvider router={router} />
        </div>
    );
}

export default MovieApp;    