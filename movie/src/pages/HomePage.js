import React, { Component } from "react";
import * as fetchNewsApi from "../fetcher";
import FilmList from "../components/filmList/FilmList";

class HomePage extends Component {
  state = {
    newsList: []
  };

  componentDidMount() {
    fetchNewsApi.fetchNews().then(({ data }) => {
      this.setState({
        newsList: [...data.results]
      });
    });
  }

  render() {
    const { newsList } = this.state;
    return (
      <>
        <h2>TRENDING FILMS TODAY </h2>
        <FilmList newsList={newsList} />
      </>
    );
  }
}

export default HomePage;
