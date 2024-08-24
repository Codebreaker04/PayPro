import { Heading } from "../components/Heading.jsx";
import { Description } from "../components/Description.jsx";
import { InputField } from "../components/InputField.jsx";
import { Button } from "../components/Button.jsx";
import { BottomLogin } from "../components/BottomLogin.jsx";
import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Navbar } from "../components/Navbar.jsx";
import { UserName } from "../components/UserName.jsx";
import { DropdownMenu } from "../components/DropdownMenu.jsx";

export function SignupPage() {
  const navigate = useNavigate();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  return (
    <div>
      <div className=" h-screen bg-slate-300  ">
        <Navbar />
        <div className=" flex flex-col justify-center items-center">
          <div className="rounded-lg w-80 h-max text-center p-2 px-4 mt-10 bg-white">
            <Heading label="Sign Up" />
            <Description info="Enter your information to create an account" />
            <InputField
              label="First Name"
              placeholder="john"
              onChange={(e) => setFirstName(e.target.value)}
            />
            <InputField
              label="Last Name"
              placeholder="delvo"
              onChange={(e) => setLastName(e.target.value)}
            />
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
                label="Sign Up"
                onClick={async () => {
                  const response = await axios.post(
                    "https://pay-pro-api.vercel.app/api/v1/user/signup",
                    {
                      username,
                      password,
                      firstName,
                      lastName,
                    },
                  );
                  localStorage.setItem("token", response.data.token);
                  navigate("/dashboard");
                }}
              />
              <BottomLogin
                label="Already have an account?"
                buttonText="Sign in"
                to="/signin"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
