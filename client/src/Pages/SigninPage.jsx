import { Heading } from "../components/Heading.jsx";
import { Description } from "../components/Description.jsx";
import { InputField } from "../components/InputField.jsx";
import { Button } from "../components/Button.jsx";
import { BottomLogin } from "../components/BottomLogin.jsx";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Navbar } from "../components/Navbar.jsx";

export function SigninPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  return (
    <div className=" h-screen bg-slate-300">
      <Navbar />
      <div className=" flex flex-col justify-center items-center mt-32 ">
        <div className="rounded-lg w-80 h-max text-center p-2 px-4 bg-white">
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
                try {
                  const response = await axios.post(
                    "https://pay-pro-api.vercel.app/api/v1/user/signin",
                    {
                      username,
                      password,
                    },
                  );

                  if (response && response.status === 200) {
                    localStorage.setItem("token", response.data.token);
                    navigate("/dashboard");
                  } else {
                    console.log("Sign-in failed:");
                  }
                } catch (err) {
                  console.log(err);
                }
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
