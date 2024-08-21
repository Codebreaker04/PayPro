import { NavDropdownMenu } from "./NavDropdownMenu.jsx";
import { useRecoilValue } from "recoil";
import { usernameState } from "../State/atomFamily/atom.js";

export function Navbar() {
  const username = useRecoilValue(usernameState) || "User";
  return (
    <div
      className={`w-full z-50 h-20 py-4 pl-6 pr-20 bg-white border shadow sticky top-0 flex justify-between items-center`}
    >
      <div className={`text-3xl font-medium`}>Payments App</div>
      <div className={` flex justify-between items-center gap-4`}>
        <div className={`text-lg font-medium`}>{`Hello, ${username}`}</div>
        <NavDropdownMenu />
      </div>
    </div>
  );
}
