import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export function Users() {
  const [users, setUsers] = useState([]);
  const [filter, setFilter] = useState("");

  useEffect(() => {
    axios
      .get(`https://pay-pro-api.vercel.app/api/v1/user/bulk?filter=${filter}`)
      .then((response) => {
        setUsers(response.data.user);
      });
  }, [filter]);

  return (
    <div className="z-0">
      <form className="max-w-full p-7 mx-auto">
        <label
          htmlFor="default-search"
          className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white"
        >
          Search
        </label>
        <div className="relative">
          <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
            <svg
              className="w-5 h-5 text-gray-500 dark:text-gray-400"
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
            className="block w-full p-4 ps-10 text-sm text-gray-900 border border-slate-300 rounded-lg bg-white focus:outline-none focus:border-slate-400"
            placeholder="Search users"
            onChange={(e) => {
              setFilter(e.target.value);
            }}
            required
          />
          <button
            type="submit"
            className="text-white absolute end-2.5 bottom-2.5 bg-gray-800 hover:bg-gray-600 focus:outline-none font-medium rounded-lg text-[16px] px-4 py-2"
          >
            Search
          </button>
        </div>
      </form>
      <div>
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
    <div className="m-7 flex justify-between items-center rounded-md ">
      <div>
        <div className="flex items-center justify-between">
          <div className="shadow-md rounded-full h-10 w-10 bg-white border border-slate-300 text-center">
            <div className="pt-[2.5px] text-lg">
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
          className="bg-gray-800 shadow-md w-40 h-10 text-white rounded-lg text-lg font-medium hover:bg-gray-600 "
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
