export function AppendMovies(movies){
    return {
        type: "APPEND_MOVIES",
        payload: {
            movies: movies,
        },
    };
}
export function appendToMovie(id){
    return {
        type: "APPEND_TO_MOVIE",
        payload: {
            id:id,
        },
    };
}
export function removeToMovie(id) {
    return {
      type: "REMOVE_TO_MOVIE",
      payload: {
        id: id,
      }
    }
  }
  