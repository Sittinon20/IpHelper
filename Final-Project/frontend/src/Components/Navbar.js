import Logo from "../Images/Logo_Pic.png";
import "../Css/Navigation.css";
import "../Css/Font.css";
import { getUser } from "../Services/Authen";

function Navbar() {
  const handleLogout = (event) => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    window.location = "/login";
  };

  const email = localStorage.getItem("user")

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light header">
      <div className="container-fluid">
        {!getUser() && (
          <a className="navbar-brand logo" href="/" >
            <img src={Logo} alt="logo" />
          </a>
        )}
        {getUser() && (
        <a className="navbar-brand logo">
          <img src={Logo} alt="logo" />
        </a>
        )}
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div
          className="collapse navbar-collapse nav_link links"
          id="navbarSupportedContent"
        >
          {getUser() && (
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item hover-underline-animation">
              <a
                className="nav-link active"
                aria-current="page"
                href= {(`/profile/${email.substring(1,email.length-1)}`)}
              >
                โปรไฟล์
              </a>
            </li>
            <li className="nav-item hover-underline-animation">
              <a
                className="nav-link active"
                aria-current="page"
                href= {(`/card/${email.substring(1,email.length-1)}`)}
              >
                ผลงาน
              </a>
            </li>
          </ul>
          )}
          {!getUser() && (
            <div
              className="collapse navbar-collapse nav_link links"
              id="navbarSupportedContent"
            >
              <ul className="navbar-nav me-auto mb-2 mb-lg-0"></ul>
              <form className="d-flex navbar navbar-expand-lg navbar-light bg-light">
                <li className="nav-item hover-underline-animation">
                  <a className="nav-link sign lr" href="/login">
                    เข้าสู่ระบบ
                  </a>
                </li>
                <div className="clsVertical"></div>
                <li className="nav-item hover-underline-animation">
                  <a className="nav-link sign lr" href="/register">
                    ลงทะเบียน
                  </a>
                </li>
              </form>
            </div>
          )}
          <form className="d-flex navbar navbar-expand-lg navbar-light bg-light">
          {getUser() && (
            <li className="nav-item hover-underline-animation">
              <a className="nav-link sign lr" href="/" onClick={handleLogout}>
                ออกจากระบบ
              </a>
            </li>
            )}
          </form>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
