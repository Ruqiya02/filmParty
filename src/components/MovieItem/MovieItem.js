import React, { Component } from 'react';
import {connect} from "react-redux";
import {appendToMovie} from "../../redux/actions/action";
import './MovieItem.css';

class MovieItem extends Component {
    
    render() {
        const { Title, Year, Poster, imdbID, appendMovie, disabled } = this.props;
        return (
            <article className="movie-item">
                <img className="movie-item__poster" src={Poster} alt={Title} />
                <div className="movie-item__info">
                    <h3 className="movie-item__title">{Title}&nbsp;({Year})</h3>
                    <button type="button" className="movie-item__add-button" onClick={() => appendMovie(imdbID)}
                    disabled={disabled}>Добавить в список</button>
                </div>
            </article>
        );
    }
}
const mapDispatchToProps = (dispatch) =>{
    return{
        appendMovie: (id) => dispatch(appendToMovie(id)),
    };
};
 
export default connect(null,mapDispatchToProps)(MovieItem);