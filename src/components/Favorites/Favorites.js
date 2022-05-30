import React, { Component } from "react";
import "./Favorites.css";
import { connect } from "react-redux";
import {removeToMovie} from "../../redux/actions/action";

class Favorites extends Component {
  state = {
    title: "",
    textLink: '#',
    inputActive: true,
    linkActive: false
  };
  
  handleInput = (e) => {
    this.setState({title: e.target.value});
  };

  handleSaveList = () => {
    this.setState({
      inputActive: false,
      linkActive: true
    });
    this.saveMovies();
  };


  saveMovies = () => {
    fetch("https://acb-api.algoritmika.org/api/movies/list",
      {
        method: 'POST',
        headers: {
          'Content-type': 'application/json',
        },
        body: JSON.stringify({
          "title": this.state.title,
          "movies": this.props.listMovies.map(el => el.imdbID)
        })
      })
      .then(res => res.json())
      .then(data => {
        this.setState({textLink: data.id})
      })
  };




  render() {
    return (
      <div className="favorites">
        <input value={this.state.title} onChange={this.handleInput}
              disabled={this.state.inputActive ? null : "disabled"}  className="favorites__name" placeholder="Create List" />
        <ul className="favorites__list">
          {this.props.listMovies.map((item) => {
            return (
              <div className="list-items">
              <li className="favorites__list--item" key={item.imdbID}>
                <p className="favorites__list--title">{item.Title} {item.Year}</p>
                <button className="favorites__list--delete" onClick={() => this.props.removeMovie(item.imdbID)}><svg stroke="currentColor" fill="currentColor" stroke-width="0" version="1.2" baseProfile="tiny" viewBox="0 0 24 24" height="3em" width="3em" xmlns="http://www.w3.org/2000/svg"><path d="M12 3c-4.963 0-9 4.038-9 9s4.037 9 9 9 9-4.038 9-9-4.037-9-9-9zm0 16c-3.859 0-7-3.14-7-7s3.141-7 7-7 7 3.14 7 7-3.141 7-7 7zM12.707 12l2.646-2.646c.194-.194.194-.512 0-.707-.195-.194-.513-.194-.707 0l-2.646 2.646-2.646-2.647c-.195-.194-.513-.194-.707 0-.195.195-.195.513 0 .707l2.646 2.647-2.646 2.646c-.195.195-.195.513 0 .707.097.098.225.147.353.147s.256-.049.354-.146l2.646-2.647 2.646 2.646c.098.098.226.147.354.147s.256-.049.354-.146c.194-.194.194-.512 0-.707l-2.647-2.647z"></path></svg></button>
              </li>
              </div>
            );
          })}
        </ul>
        <button type="button" onClick={() => this.handleSaveList()}
                className={`favorites__save ${this.state.linkActive ? "link__none" : null}`}
                disabled={!this.state.title || this.props.listMovies.length===0}>
          Save List
        </button>
        <a href={`http://localhost:3000/list/${this.state.textLink}`}
           className={`link__none ${this.state.linkActive ? "link__block" : null}`}
           target="_blank">Show List</a>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    listMovies: state.listMovies,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    removeMovie: (id) => dispatch(removeToMovie(id)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Favorites);