import { Link } from "react-router-dom";
const Header = () => {
  return (
    <header>
      <nav className="content">
        <Link to="/">Home</Link>
        <Link to="/form">Write Your Own Blog</Link>
      </nav>
    </header>
  );
};

export default Header;
