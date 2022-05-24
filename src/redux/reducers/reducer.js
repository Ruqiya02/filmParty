const globalState={
    movies: [],
    listMovies: [],
};
export default function reducer(state=globalState,action){
    if(action.type==="APPEND_TO_MOVIE"){
        const newMovie=state.movies.find(
            (element)=>element.imdbID===action.payload.id
        );
        const listMovies=[...state.listMovies,{...newMovie}];
        return {
            ...state,
            listMovies
        };
    }
    if(action.type === "REMOVE_TO_MOVIE") {
        const filterMovie = state.listMovies.filter((item) => item.imdbID !== action.payload.id);
        return {
          ...state,
          listMovies: filterMovie,
        };
      }
    switch (action.type){
        case "APPEND_MOVIES":
    return{
        ...state,
        movies: [...action.payload.movies],
      } 
     }
     return state;
}