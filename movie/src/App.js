import React, { Suspense, lazy } from "react";
import { Route, NavLink, Switch } from "react-router-dom";
import css from "./App.module.css";
import Loader from "./ui/loader/Loader";

const HomePage = lazy(() =>
  import("./pages/HomePage" /* webpackChunkName: 'homePage'*/)
);
const FilmItem = lazy(() =>
  import("./components/filmItem/FilmItem" /* webpackChunkName: 'filmItem'*/)
);
const MoviesPage = lazy(() =>
  import(
    "./components/moviesPage/MoviesPage" /* webpackChunkName: 'moviesPage'*/
  )
);
const PageNotFound = lazy(() =>
  import(
    "./components/notFoundPage/NotFoundPage" /* webpackChunkName: 'notFoundPage'*/
  )
);

const activeStyle = {
  color: "green",
  fontWeight: "700",
  textDecoration: "none"
};

const App = () => {
  return (
    <>
      <ul className={css.menu__list}>
        <li>
          <NavLink to="/" exact activeStyle={activeStyle}>
            HOME
          </NavLink>
        </li>
        <li>
          <NavLink to="/movies" activeStyle={activeStyle}>
            MOVIES
          </NavLink>
        </li>
      </ul>
      <Suspense fallback={<Loader />}>
        <Switch>
          <Route path="/" exact component={HomePage} />
          <Route path="/movies/:movieId" component={FilmItem} />
          <Route path="/movies" component={MoviesPage} />
          <Route component={PageNotFound} />
        </Switch>
      </Suspense>
    </>
  );
};

export default App;
