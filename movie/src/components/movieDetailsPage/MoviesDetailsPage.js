import React, { Component } from "react";
import { Link, Route, Switch, withRouter } from "react-router-dom";
import Cast from "../cast/Cast";
import Reviews from "../reviews/Reviews";
import shortid from "short-id";
import css from "./MoviesDetailsPage.module.css";

class MoviesDetailsPage extends Component {
  state = {};

  handelGoBack = () => {
    const { history, location } = this.props;
    console.log("DONE", location.state.query);
    if (location.state.query === undefined) {
      history.push("/");
    } else history.push(`/movies/?query=${location.state.query}`);
  };

  render() {
    const {
      original_title,
      vote_average,
      overview,
      genres,
      backdrop_path,
      id
    } = this.props;
    return (
      <>
        <button
          className={css.section__button}
          type="button"
          onClick={this.handelGoBack}
        >
          &#x2190; GO BACK
        </button>
        <article className={css.section}>
          <img
            className={css.section__photo}
            src={`https://image.tmdb.org/t/p/original${backdrop_path}`}
            alt={original_title}
          />
          <div className={css.container}>
            <h2>{original_title}</h2>
            <p>
              USER SCORE:
              <b>{vote_average}%</b>
            </p>
            <p>
              OVERVIEW:
              <b>{overview}</b>
            </p>
            <p>GENRES:</p>
            <ul>
              {genres.map(point => (
                <li key={shortid.generate()}>{point.name}</li>
              ))}
            </ul>
          </div>
        </article>

        <div className={css.more__info}>
          <h4 className={css.section__caption}>ADDITIONAL INFORMATION:</h4>
          <ul className={css.list__item}>
            <li>
              <Link to={{ pathname: `/movies/${id}/cast`, state: { id } }}>
                <p>CAST</p>
              </Link>
            </li>
            <li>
              <Link to={{ pathname: `/movies/${id}/review`, state: { id } }}>
                <p>REVIEWS</p>
              </Link>
            </li>
          </ul>
        </div>

        <Switch>
          <Route path={`/movies/:${id}/cast`} component={Cast} />
          <Route path={`/movies/:${id}/review`} component={Reviews} />
        </Switch>
      </>
    );
  }
}

export default withRouter(MoviesDetailsPage);
