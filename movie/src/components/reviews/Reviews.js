import React, { Component } from "react";
import * as fetchReviewAPI from "../../fetcher";
import NotFoundPage from "../notFoundPage/NotFoundPage";
import css from "./Reviews.module.css";

class Reviews extends Component {
  state = {
    reviews: []
  };

  async componentDidMount() {
    const movieId = this.props.location.state.id;
    await fetchReviewAPI.fetchReviewPage(movieId).then(review =>
      this.setState({
        reviews: review.data.results
      })
    );
  }

  render() {
    const { reviews } = this.state;
    return (
      <>
        <ul className={css.review__list}>
          {reviews.length > 0 ? (
            reviews.map(review => (
              <li className={css.review__item} key={review.id}>
                <p>
                  AUTOR:<b>{review.author}</b>
                </p>
                <span>{review.content}</span>
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

export default Reviews;
