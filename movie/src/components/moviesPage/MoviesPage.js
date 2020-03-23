import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import css from "./MoviesPage.module.css";
import * as getDataThroughtGuery from "../../fetcher";
import queryString from "query-string";

class MoviesPage extends Component {
  state = {
    searchQuery: "",
    listFilms: [],
    prevSearchQuery: ""
  };

  makeRequestToApi = param => {
    getDataThroughtGuery.fetchDataForInput(param).then(films =>
      this.setState({
        listFilms: films.data.results
      })
    );
  };

  componentDidMount() {
    const { location } = this.props;
    const parseSearchQuery = queryString.parse(location.search).query;
    if (parseSearchQuery === undefined) {
      return;
    } else this.makeRequestToApi(parseSearchQuery);
  }

  onSubmitForm = e => {
    e.preventDefault();
    let searchQuery = this.state.searchQuery;
    const value = e.target.elements[0].value;
    this.makeRequestToApi(value);
    this.setState({
      searchQuery: ""
    });
    this.props.history.push(`/movies/?query=${searchQuery}`);
  };

  handleChange = e => {
    this.setState({
      searchQuery: e.target.value,
      prevSearchQuery: e.target.value
    });
  };

  render() {
    const { listFilms, prevSearchQuery, searchQuery } = this.state;
    return (
      <>
        <form onSubmit={this.onSubmitForm}>
          <p>Please search your film!</p>
          <input
            onChange={this.handleChange}
            className={css.input_search}
            placeholder="Search film..."
            autoFocus
            value={searchQuery}
          />
          <button className={css.btn_search} type="submit">
            Search
          </button>
        </form>

        <div>
          <ul>
            {listFilms.map(item => (
              <li key={item.id}>
                <Link
                  to={{
                    pathname: `/movies/${item.id}`,
                    state: {
                      from: "/movies",
                      id: item.id,
                      query: prevSearchQuery
                    }
                  }}
                >
                  {item.title || item.original_name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </>
    );
  }
}
export default withRouter(MoviesPage);
