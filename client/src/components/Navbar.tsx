import { Link } from "react-router-dom";

function Navbar() {
  return (
    <ul>
      <li>
        <Link to="/">Books</Link>
      </li>
      <li>
        <Link to="/add-book">Add Book</Link>
      </li>
    </ul>
  );
}

export default Navbar;
