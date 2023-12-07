import { jwtDecode } from "jwt-decode";
import { useEffect, useState } from "react";
import AdminMenu from "./AdminMenu";
import UserMenu from "./UserMenu";
export const SideMenu = () => {
  const [user, setUser] = useState({});
  useEffect(() => {
    const token = window.localStorage.getItem("token");
    const decodedToken = jwtDecode(token);
    setUser(decodedToken.user);
    console.log(decodedToken.user);
  }, []);
  return (
    <div>
      <div className="flex h-screen flex-col justify-between border-e bg-white">
        <div className="px-4 py-6">
          <span className="grid h-10 w-32 justify-center place-content-center rounded-lg  text-sm text-gray-600">
            Hidrometer
          </span>
          <hr className="divide-y divide-black" />
          {user.level === "Admin" ? <AdminMenu /> : <UserMenu />}
        </div>
        <div className="flex flex-shrink-0 p-4 px-4 bg-gray-50">
          <a href="#" className="flex-shrink-0 block w-full group">
            <div className="flex items-center">
              <div>
                <img
                  className="inline-block rounded-full h-9 w-9"
                  src={
                    "https://ui-avatars.com/api/?name=" +
                    user.name +
                    "&background=DDDDDD&length=2&rounded=true&size=128"
                  }
                  alt=""
                />
              </div>
              <div className="ml-3">
                <p className="text-sm font-medium text-gray-900">{user.name}</p>
              </div>
            </div>
          </a>
        </div>
      </div>
    </div>
  );
};
