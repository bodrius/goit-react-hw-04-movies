import React from "react";
import { Link } from "react-router-dom";

const FilmList = ({ newsList = [] }) => {
  return (
    <ul>
      {newsList.map(item => (
        <li key={item.id}>
          {" "}
          <Link
            to={{
              pathname: `/movies/${item.id}`,
              state: { from: "/" }
            }}
          >
            {item.title || item.original_name}
          </Link>{" "}
        </li>
      ))}
    </ul>
  );
};

export default FilmList;
