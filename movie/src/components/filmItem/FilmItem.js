import React, { Component } from "react";
import * as getFilmsFromApi from "../../fetcher";
import MoviesDetailsPage from "../movieDetailsPage/MoviesDetailsPage";

class FilmItem extends Component {
  state = {
    film: null
  };
  componentDidMount() {
    const { movieId } = this.props.match.params;
    getFilmsFromApi
      .fetchNewsPerId(movieId)
      .then(film => this.setState({ film }));
  }

  render() {
    const { film } = this.state;
    return <div>{film && <MoviesDetailsPage {...film} />}</div>;
  }
}

export default FilmItem;
