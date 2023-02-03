import {
  FaSignInAlt,
  FaSignOutAlt,
  FaUser,
  FaRegStickyNote,
} from "react-icons/fa";
import { Link } from "react-router-dom";
const Header = () => {
  return (
    <header className="relative h-24 w-full">
      <nav className="flex h-full flex-wrap items-center justify-between bg-gray-900 py-5 px-10 text-gray-200 shadow-lg">
        <div className="text-4xl">
          <Link to="/" className="flex items-center justify-center gap-2">
            <FaRegStickyNote className="text-amber-600" />
            <span>
              <span className="text-amber-600">E</span>nsolvers
              <span className="text-amber-600">N</span>otes
            </span>
          </Link>
        </div>

        <ul className="flex gap-5 text-lg font-bold">
          <li className="py-2 px-3 hover:text-amber-600">
            <Link
              to="/login"
              className="flex items-center justify-center gap-2"
            >
              <FaSignInAlt /> Login
            </Link>
          </li>
          <li className="py-2 px-3 hover:text-amber-600">
            <Link
              to="/register"
              className="flex items-center justify-center gap-2"
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
