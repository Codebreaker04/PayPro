import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { usernameState } from "../State/atomFamily/atom.js";

export function Users() {
  const [users, setUsers] = useState([]);
  const [filter, setFilter] = useState("");
  const username = useRecoilValue(usernameState) || "username";

  useEffect(() => {
    axios
      .get(`https://pay-pro-api.vercel.app/api/v1/user/bulk?filter=${filter}`)
      .then((response) => {
        const filteredUsers = response.data.user.filter(
          (user) => user.firstname !== username,
        );
        setUsers(filteredUsers);
      })
      .catch((error) => {
        console.error("Error fetching users:", error);
        // Handle error (e.g., show error message to user)
      });
  }, [filter, username]);

  return (
    <div className="flex flex-col h-[calc(100vh-180px)] z-0">
      <form className="w-full p-7 mx-auto">
        <label
          htmlFor="default-search"
          className="mb-2 text-sm font-medium text-gray-900 sr-only dark:bg-neutral-700 dark:text-white"
        >
          Search
        </label>
        <div className="relative ">
          <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none ">
            <svg
              className="w-5 h-5 text-gray-500 "
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 20 20"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
              />
            </svg>
          </div>
          <input
            type="search"
            id="default-search"
            className="block w-full p-4 ps-10 text-sm text-gray-900 dark:text-white border border-slate-300 dark:border-neutral-500 rounded-lg bg-white dark:bg-neutral-700 focus:outline-none focus:border-slate-400"
            placeholder="Search users"
            onChange={(e) => {
              setFilter(e.target.value);
            }}
            required
          />
          <button
            type="submit"
            className="text-white absolute end-2.5 bottom-2.5 bg-gray-800 dark:bg-neutral-800 hover:bg-gray-600 dark:hover:bg-neutral-500 focus:outline-none font-medium rounded-lg text-[16px] px-4 py-2"
          >
            Search
          </button>
        </div>
      </form>
      <div className="flex-grow overflow-y-scroll m-2 border-2 dark:border-neutral-700 rounded-md shadow-md">
        {users.map((user) => (
          <User user={user} key={user._id} />
        ))}
      </div>
    </div>
  );
}

function User({ user }) {
  const navigate = useNavigate();
  return (
    <div className="m-7 mb-4 flex justify-between items-center rounded-md ">
      <div>
        <div className="flex items-center justify-between">
          <div className="flex flex-col justify-center shadow-md rounded-full h-10 w-10 bg-white dark:bg-neutral-800 border border-slate-300 dark:border-neutral-700 text-center  dark:text-white">
            <div className="pt-[2.5px] text-lg ">
              {user.firstname[0].toUpperCase()}
            </div>
          </div>
          <div className="ml-2 text-lg">
            {user.firstname} {user.lastname}
          </div>
        </div>
      </div>
      <div>
        <button
          className="bg-gray-800 shadow-md w-40 h-10 text-white rounded-lg text-lg font-medium hover:bg-gray-600 dark:bg-neutral-600 dark:hover:bg-neutral-500 "
          onClick={(e) => {
            navigate(`/send?userId=${user.id}&name=${user.firstname}`);
          }}
        >
          Transfer
        </button>
      </div>
    </div>
  );
}
