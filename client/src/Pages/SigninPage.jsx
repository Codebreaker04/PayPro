import { Heading } from "../components/Heading.jsx";
import { Description } from "../components/Description.jsx";
import { InputField } from "../components/InputField.jsx";
import { Button } from "../components/Button.jsx";
import { BottomLogin } from "../components/BottomLogin.jsx";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export function SigninPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  return (
    <div className=" h-screen bg-slate-300 flex justify-center">
      <div className=" flex flex-col justify-center">
        <div className="rounded-lg w-80 h-max text-center p-2  pb-10 px-4 bg-white">
          <Heading label="Sign In" />
          <Description info="Enter registered username and password" />
          <InputField
            label="Email"
            placeholder="xyz@gmail.com"
            onChange={(e) => setUsername(e.target.value)}
          />
          <InputField
            label="Password"
            placeholder=" "
            onChange={(e) => setPassword(e.target.value)}
          />
          <div>
            <Button
              label="Sign In"
              onClick={async () => {
                const response = await axios.post(
                  "pay-pro-api.vercel.app/api/v1/user/signin",
                  {
                    username,
                    password,
                  },
                );
                localStorage.setItem("token", response.data.token);
                navigate("/dashboard");
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
