import React, { Component } from 'react';
import { connect } from 'react-redux';
import MovieItem from '../MovieItem/MovieItem';
import './Movies.css';

class Movies extends Component {
   
    render() { 
        return ( 
            <ul className="movies">
                {this.props.movies.map((movie) => (
                    <li className="movies__item" key={movie.imdbID}>
                        <MovieItem {...movie} disabled = {this.props.listMovies.find(element=>element.imdbID === movie.imdbID)}/>
                    </li>
                ))}
            </ul>
        );
    }
}
const mapStateToProps=(state)=>{
    return{
        movies:state.movies,
        listMovies: state.listMovies,
    };
};

 
export default connect(mapStateToProps)(Movies);