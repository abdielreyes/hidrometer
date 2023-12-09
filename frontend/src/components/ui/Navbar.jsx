import { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import { IoMenu } from "react-icons/io5";

function Navbar({ children }) {
  const [user, setUser] = useState({});
  useEffect(() => {
    let token_user = localStorage.getItem("token");
    token_user = jwtDecode(token_user).user;
    setUser(token_user);

  }
    , []);
  return (
    <div>
      <div className="navbar bg-base-200">
        <div className="navbar-start">
          <label htmlFor="my-drawer" className=" drawer-button "><IoMenu className="w-10 text-3xl" />
          </label>
        </div>
        <div className="navbar-center">
          <a className="btn btn-ghost text-xl">Hidrometer</a>
        </div>
        <div className="navbar-end">

          <div className="avatar">
            <div className="w-10 rounded-full">
              <img src={"https://ui-avatars.com/api/?name=" + (user.name)} />
            </div>
          </div>

        </div>
      </div>
      <div className="drawer">
        <input id="my-drawer" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content ">
          {children}

        </div>
        <div className="drawer-side">
          <label htmlFor="my-drawer" aria-label="close sidebar" className="drawer-overlay"></label>
          <ul className="menu p-4 w-80 min-h-full bg-base-200 text-base-content">
            {/* Sidebar content here */}
            <li><a>Sidebar Item 1</a></li>
            <li><a>Sidebar Item 2</a></li>

          </ul>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
