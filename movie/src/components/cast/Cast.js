import React, { Component } from "react";
import * as fetchCastFromAPI from "../../fetcher";
import NotFoundPage from "../notFoundPage/NotFoundPage";
import css from "./Cast.module.css";

class Cast extends Component {
  state = {
    actors: []
  };

  async componentDidMount() {
    await fetchCastFromAPI
      .fetchCastForFilm(this.props.location.state.id)
      .then(actors =>
        this.setState({
          actors: actors.crew
        })
      );
  }

  render() {
    const { actors } = this.state;
    return (
      <>
        <ul className={css.actor__list}>
          {actors.length > 0 ? (
            actors.map(actor => (
              <li className={css.actor__item} key={actor.credit_id}>
                {actor.profile_path === null ? (
                  <img
                    src={`https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcTNDATUaL0NFrp5bx9cOzPSgffJxTBNXPc3abVVT5kjAes2gJRQ`}
                    alt={actor.name}
                  />
                ) : (
                  <img
                    src={`https://image.tmdb.org/t/p/original${actor.profile_path}`}
                    alt={actor.name}
                  />
                )}
                <p>
                  NAME: <b>{actor.name}</b>
                </p>
                <p>
                  JOB:<b>{actor.job}</b>
                </p>
              </li>
            ))
          ) : (
            <NotFoundPage />
          )}
        </ul>
      </>
    );
  }
}

export default Cast;
