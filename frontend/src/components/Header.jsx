import {
  FaSignInAlt,
  FaSignOutAlt,
  FaUser,
  FaRegStickyNote,
} from "react-icons/fa";
import { Link } from "react-router-dom";
const Header = () => {
  return (
    <header>
      <nav className="relative w-full min-h-24 flex flex-wrap items-center justify-between py-5 px-7 bg-gray-900 text-gray-200 shadow-lg navbar navbar-expand-lg navbar-light">
        <div className="text-4xl">
          <Link to="/" className="flex gap-2 items-center justify-center">
            <FaRegStickyNote className="text-amber-600" />
            <span>
              <span className="text-amber-600">E</span>nsolvers
              <span className="text-amber-600">N</span>otes
            </span>
          </Link>
        </div>

        <ul className="flex gap-5 text-lg font-bold">
          <li className="hover:text-amber-600 py-2 px-3">
            <Link
              to="/login"
              className="flex gap-2 items-center justify-center"
            >
              <FaSignInAlt /> Login
            </Link>
          </li>
          <li className="hover:text-amber-600 py-2 px-3">
            <Link
              to="/register"
              className="flex gap-2 items-center justify-center"
            >
              <FaUser /> Register
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};
export default Header;
