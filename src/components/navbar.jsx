import { Link, NavLink } from "react-router";
import Logo from "./logo";
import { useAuth } from "../context/auth.context";
import no_photo from "../assets/No-photo-m.png";
import useMyCards from "../hooks/useMyCards";
import { useTheme } from "../context/theme.context";

function Navbar() {
  const { user, me_info } = useAuth();
  const { theme, toggleTheme } = useTheme();

  const imageUrl = me_info?.image?.url || no_photo;
  const imageAlt = me_info?.image?.alt || "no photo";
  const name = `${me_info?.name?.first || ""} ${me_info?.name?.last || ""}`;

  const cards = useMyCards();

  const navLinkClass = `nav-link text-${theme === "dark" ? "light" : "dark"}`;

  return (
    <nav
      className={`navbar navbar-expand-lg ${
        theme === "dark"
          ? "navbar-dark bg-dark for-dark-theme-light-shadow"
          : "navbar-light bg-light for-light-theme-dark-shadow"
      }`}
      aria-label="Fourth navbar example"
    >
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">
          <Logo />
        </Link>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarsExample04"
          aria-controls="navbarsExample04"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarsExample04">
          <div className="d-flex justify-content-between align-items-center w-100">
            <ul className="navbar-nav mb-2 mb-md-0">
              <li className="nav-item">
                <NavLink className={navLinkClass} to="/">
                  Home
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className={navLinkClass} to="/about">
                  About
                </NavLink>
              </li>

              {user ? (
                <>
                  {me_info?.isBusiness || cards?.length > 0 ? (
                    <li className="nav-item">
                      <NavLink className={navLinkClass} to="/my-cards">
                        My Cards
                      </NavLink>
                    </li>
                  ) : null}
                  <li className="nav-item">
                    <NavLink className={navLinkClass} to="/my-favorite-cards">
                      Favorites
                    </NavLink>
                  </li>

                  {me_info?.isAdmin ? (
                    <li className="nav-item">
                      <NavLink className={navLinkClass} to="/admin/sandbox">
                        SandBox
                      </NavLink>
                    </li>
                  ) : null}

                  <li className="nav-item">
                    <NavLink className={navLinkClass} to="/sign-out">
                      Sign Out
                    </NavLink>
                  </li>
                </>
              ) : (
                <>
                  <li className="nav-item">
                    <NavLink className={navLinkClass} to="/sign-in">
                      Sign In
                    </NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink className={navLinkClass} to="/sign-up">
                      Sign Up
                    </NavLink>
                  </li>
                </>
              )}

              <li className="nav-item ms-3">
                <button
                  onClick={toggleTheme}
                  className="btn btn-outline-secondary"
                >
                  {theme === "light" ? "🌙 Dark Mode" : "☀️ Light Mode"}
                </button>
              </li>
            </ul>

            {/* Profile info - now inside the collapse */}
            <div className="d-flex align-items-center">
              {me_info ? (
                <>
                  <div
                    className={`me-3 text-${
                      theme === "dark" ? "light" : "dark"
                    }`}
                  >
                    {name}
                  </div>
                  <Link to="/profile">
                    <img
                      src={imageUrl}
                      alt={imageAlt}
                      className="rounded-circle img-thumbnail img-fluid"
                      style={{
                        width: "50px",
                        height: "50px",
                        cursor: "pointer",
                      }}
                    />
                  </Link>
                </>
              ) : (
                <img
                  src={no_photo}
                  alt="no photo"
                  className="rounded-circle img-thumbnail img-fluid"
                  style={{ width: "50px", height: "50px", cursor: "pointer" }}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
