import { useRecoilValue } from "recoil";
import { usernameState } from "../State/atomFamily/atom.js";

export function UserName() {
  const username = useRecoilValue(usernameState) || "User";
  return <div className="text-lg font-medium">Hi, {username}</div>;
}
