import { DropdownMenu } from "./DropdownMenu.jsx";
import { useRecoilValue } from "recoil";
import { usernameState } from "../State/atomFamily/atom.js";

export function Navbar({ username, dropdown }) {
  return (
    <div
      className={`w-full z-50 h-20 py-4 pl-6 pr-20 bg-white border shadow sticky top-0 flex justify-between items-center`}
    >
      <div className={`ml-4 text-4xl font-medium`}>PayPro</div>
      <div className="flex justify-between items-center gap-4">
        {username}
        {dropdown}
      </div>
    </div>
  );
}
