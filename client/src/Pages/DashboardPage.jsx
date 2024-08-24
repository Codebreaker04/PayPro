import { Navbar } from "../components/Navbar.jsx";
import { Balance } from "../components/Balance.jsx";
import { Users } from "../components/Users.jsx";
import { useEffect, useState } from "react";
import axios from "axios";
import { useRecoilState, useSetRecoilState } from "recoil";
import { usernameState } from "../State/atomFamily/atom.js";

export function DashboardPage() {
  const setUsername = useSetRecoilState(usernameState);
  const [balance, setBalance] = useState(0);
  useEffect(() => {
    axios
      .get("pay-pro-api.vercel.app/api/v1/account/balance", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((response) => {
        console.log(response);
        setBalance(response.data.balance);
        setUsername(response.data.firstname);
      });
  });
  return (
    <div
      className={`w-full h-screen bg-neutral-100 text-[#393E46] font-[Galano Grotesque]`}
    >
      <Navbar />
      <Balance amount={balance} />
      <Users />
    </div>
  );
}
