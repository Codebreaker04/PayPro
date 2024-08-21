import { useCallback, useEffect, useRef, useState } from "react";
import { useRecoilValue } from "recoil";
import { usernameState } from "../State/atomFamily/atom.js";
import { useNavigate } from "react-router-dom";

export function NavDropdownMenu() {
  const username = useRecoilValue(usernameState) || "username";
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropDownRef = useRef(null);
  const navigate = useNavigate();

  const toggleDropdown = useCallback(() => {
    setIsDropdownOpen(!isDropdownOpen);
  }, [isDropdownOpen]);

  function outsideClick(event) {
    if (dropDownRef.current && !dropDownRef.current.contains(event.target)) {
      setIsDropdownOpen(false);
    }
  }

  useEffect(() => {
    document.addEventListener("mousedown", outsideClick);
    return () => {
      document.removeEventListener("mousedown", outsideClick);
    };
  }, []);
  return (
    <div className={`relative z-10`} ref={dropDownRef}>
      <button
        className={`w-12 h-12 text-xl font-medium border border-gray-300 shadow rounded-full hover:bg-neutral-100 `}
        onClick={toggleDropdown}
      >
        {username[0].toUpperCase()}
      </button>
      <div
        className={`absolute right-6 z-50 ${isDropdownOpen ? "block" : "hidden"} border border-slate-300 bg-neutral-100 flex items-center justify-between mt-1 focus:bg-neutral-100 rounded-md rounded-tr-none shadow-md`}
      >
        <ul className={` text-sm text-gray-600`}>
          <li className="flex items-center  px-4 py-2 hover:bg-gray-300 rounded-md rounded-tr-none">
            <a href="#">Profile</a>
          </li>
          <li className="flex items-center  px-4 py-2 hover:bg-gray-300 rounded-md">
            <a href="#">Settings</a>
          </li>
          <li className="flex items-center  px-4 py-2 hover:bg-gray-300 rounded-md">
            <a href="#">Customer Support</a>
          </li>
          <li className="flex items-center  px-4 py-2 hover:bg-gray-300 rounded-md">
            <a
              onClick={() => {
                localStorage.removeItem("token");
                navigate("/");
              }}
            >
              logOut
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
}
