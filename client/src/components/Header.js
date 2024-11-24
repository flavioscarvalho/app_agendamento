import React from "react";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <nav>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/disciplinas">Disciplinas</Link>
        </li>
        <li>
          <Link to="/cadastrar-professor">Cadastrar Professor</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Header;
