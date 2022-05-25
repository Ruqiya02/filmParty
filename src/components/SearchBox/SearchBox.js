import React, { Component } from 'react';
import { connect } from 'react-redux';
import { AppendMovies} from "../../redux/actions/action";

import './SearchBox.css';

class SearchBox extends Component {
    state = {
        searchLine: ''
    }
    searchLineChangeHandler = (e) => {
        this.setState({ searchLine: e.target.value });
    }
    searchBoxSubmitHandler = (e) => {
        e.preventDefault();
        let stateValue=this.state.searchLine
        const key="909ce22e"
        fetch(`http://www.omdbapi.com/?s=${stateValue}&apikey=${key}`)
        .then((res)=>res.json())
        .then((data)=>{
            console.log(data)
            this.props.dispatch(AppendMovies(data.Search))
        })
    }
    render() {
        const { searchLine } = this.state;

        return (
            <div className="search-box">
                <form className="search-box__form" onSubmit={this.searchBoxSubmitHandler}>
                    <label className="search-box__form-label">
                    Search movie by title:
                        <input
                            value={searchLine}
                            type="text"
                            className="search-box__form-input"
                            placeholder="Example, Shawshank Redemption"
                            onChange={this.searchLineChangeHandler}
                        />
                    </label>
                    <button
                        type="submit"
                        className="search-box__form-submit"
                        disabled={!searchLine}
                    >
                        Search
                    </button>
                </form>
            </div>
        );
    }
}

const mapStateToProps = (state)=>{
    return {
        movies:state.movies,
    };
};
 
export default connect(mapStateToProps)(SearchBox);