import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import "./Nav.css";
import Logo from "../Assets/bg/collegelogo.svg";
import Utils from "../Service/utils";
import { Link } from "react-router-dom/cjs/react-router-dom.min";

function Navbar({ user, onPermissionChange, permission }) {
  return (
    <>
      <nav className=" container-fluid navbar navbar-light ">
        <div>
          <img className="logo" src={Logo} alt="college" />
        </div>

        <div className="flex gap-2">
          {user && (
            <Link to="/dashboard/profile">
              <div className="px-5 py-2.5 bg-blue-800 text-cyan-50 rounded-full hover:shadow-2xl hover:transition-all delay-100">
                Profile
              </div>
            </Link>
          )}
          {user && (
            <select
              onChange={(e) => onPermissionChange(e.target.value)}
              // className="rounded-full m-auto h-8 p-1"
              className="px-5 py-2.5 bg-blue-800 text-cyan-50 rounded-full hover:shadow-2xl hover:transition-all delay-100"
              value={permission}
            >
              {(
                (typeof user.permission === "object" && user.permission) || [
                  getRole(user.permission),
                ]
              ).map((v) => {
                return <option value={v}>{getRole(v)}</option>;
              })}
            </select>
          )}
          <button
            className="px-5 py-2.5 bg-black text-cyan-50 rounded-full bg-opacity-5"
            onClick={() => Utils.Logout.next()}
            Style=" "
          >
            <a Style="color:white; text-decoration:none; ">Logout</a>
          </button>
        </div>
      </nav>
    </>
  );
}
function getRole(type) {
  switch (type) {
    case "UNIVERSITY":
      return "DEAN";
    case "TEACHER":
      return "PROFESSOR";
    default:
      return type;
  }
}
export default Navbar;
