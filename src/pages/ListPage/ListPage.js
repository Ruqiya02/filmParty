import React, { Component } from 'react';
import Header from '../../components/Header/Header'
import './ListPage.css';

class ListPage extends Component {
    state = {
      movies: [],
      title: ''
    }
    componentDidMount() {
      const apiKey = "909ce22e";
        const id = this.props.match.params.id;
        console.log(id);
      fetch(`https://acb-api.algoritmika.org/api/movies/list/${id}`)
        .then(res => res.json())
        .then(data => {
          console.log(data);
          this.setState({title: data.title})
          data.movies.forEach(elem => {
            fetch(`http://www.omdbapi.com/?i=${elem}&apikey=${apiKey}`)
              .then(res => res.json())
              .then(data => {
                this.setState({movies: [...this.state.movies, data]})
              })
          })
        })
        
    }
    render() { 
        return (
          <div>
          <Header />
            <div className="list-page">
                <h1 className="list-page__title">{this.state.title}</h1>
                <ul>
                    {this.state.movies.map((item) => {
                        return (
                            <li key={item.imdbID}>
                              <svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 24 24" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><g><path fill="none" d="M0 0h24v24H0z"></path><path d="M2 3.993A1 1 0 0 1 2.992 3h18.016c.548 0 .992.445.992.993v16.014a1 1 0 0 1-.992.993H2.992A.993.993 0 0 1 2 20.007V3.993zM4 5v14h16V5H4zm6.622 3.415l4.879 3.252a.4.4 0 0 1 0 .666l-4.88 3.252a.4.4 0 0 1-.621-.332V8.747a.4.4 0 0 1 .622-.332z"></path></g></svg>
                                <a href={"https://www.imdb.com/title/" + item.imdbID} className="link__block2" target="_blank">{item.Title} ({item.Year})</a>
                            </li>
                        );
                    })}
                </ul>
            </div>
          </div>
        );
    }
}


 
export default ListPage;