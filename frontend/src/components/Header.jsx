import {
  FaSignInAlt,
  FaSignOutAlt,
  FaUser,
  FaRegStickyNote,
} from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout, reset } from "../features/auth/authSlice";

const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);

  const onLogout = () => {
    dispatch(logout());
    dispatch(reset());
    navigate("/");
  };

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
          {user ? (
            <li className="py-2 px-3">
              <div
                className="flex cursor-pointer items-center justify-center gap-2 hover:text-amber-600"
                onClick={onLogout}
              >
                <FaSignOutAlt /> Logout
              </div>
            </li>
          ) : (
            <>
              <li className="py-2 px-3">
                <Link
                  to="/login"
                  className="flex items-center justify-center gap-2 hover:text-amber-600"
                >
                  <FaSignInAlt /> Login
                </Link>
              </li>
              <li className="py-2 px-3">
                <Link
                  to="/register"
                  className="flex items-center justify-center gap-2 hover:text-amber-600"
                >
                  <FaUser /> Register
                </Link>
              </li>
            </>
          )}
        </ul>
      </nav>
    </header>
  );
};
export default Header;
