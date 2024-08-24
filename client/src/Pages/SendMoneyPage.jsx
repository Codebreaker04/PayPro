import { Heading } from "../components/Heading.jsx";
import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { InputField } from "../components/InputField.jsx";
import { Button } from "../components/Button.jsx";
import axios from "axios";

export function SendMoneyPage() {
  const [searchParams] = useSearchParams();
  const id = searchParams.get("userId");
  const name = searchParams.get("name");
  const [amount, setAmount] = useState("");
  const [status, setStatus] = useState("");
  const navigate = useNavigate();

  function handleTransfer() {
    axios
      .post(
        "pay-pro-api.vercel.app/api/v1/account/transfer",
        {
          toId: id,
          amount: amount,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        },
      )
      .then((response) => {
        const transferStatus =
          response.status === 200 ? "Successfull" : "Failed";
        setStatus(transferStatus);
        navigate(`/status?paymentStatus=${transferStatus}`);
      })
      .catch(() => {
        const transferStatus = "failed";
        setStatus(transferStatus);
        navigate(`/status?paymentStatus=${transferStatus}`);
      });
  }

  return (
    <div className="h-screen bg-slate-300 flex justify-center items-center relative">
      <div className="w-80 h-max text-center p-2 bg-white rounded-md shadow-md flex flex-col justify-center ">
        <Heading label="Send Money" />
        <div className="pt-10 pl-2 flex items-center">
          <div className="rounded-full h-12 w-12 border p-2 shadow-md font-medium text-lg">
            {name[0].toUpperCase()}
          </div>
          <div className="p-2 text-xl font-medium">{name}</div>
        </div>
        <div className="pl-3 pt-6 pr-2">
          <InputField
            label="Amount"
            onChange={(e) => setAmount(e.target.value)}
          />
        </div>
        <div className=" pl-3 pr-2 pb-4">
          <Button label="Transfer" onClick={handleTransfer} />
        </div>
      </div>
    </div>
  );
}
