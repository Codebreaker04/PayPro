import { Heading } from "../components/Heading.jsx";
import { Description } from "../components/Description.jsx";
import { InputField } from "../components/InputField.jsx";
import { Button } from "../components/Button.jsx";
import { BottomLogin } from "../components/BottomLogin.jsx";
import { Warning } from "../components/Warning.jsx";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Navbar } from "../components/Navbar.jsx";
import { DarkThemeButton } from "../components/DarkThemeButton.jsx";

export function SigninPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [open, setOpen] = useState(true);
  const navigate = useNavigate();

  const warningHandleClose = () => {
    setOpen(false);
  };

  const handleSignin = async () => {
    setOpen(true);
    try {
      const response = await axios.post(
        "https://pay-pro-api.vercel.app/api/v1/user/signin",
        {
          username,
          password,
        },
      );
      localStorage.setItem("token", response.data.token);
      navigate("/dashboard");
    } catch (err) {
      setError(err.response.data.msg);
    }
  };

  return (
    <div className=" h-screen bg-slate-300 dark:bg-neutral-800 dark:text-white">
      <Navbar comp={<DarkThemeButton />} />
      <div className="relative">
        {error && open && (
          <Warning label={error} handleClose={warningHandleClose} />
        )}
      </div>
      <div className="flex flex-col justify-center items-center mt-32 ">
        <div className="rounded-lg w-80 h-max text-center p-2 px-4 bg-white dark:bg-neutral-700">
          <Heading label="Sign In" />
          <Description info="Enter registered username and password" />
          <InputField
            label="Email"
            placeholder="xyz@gmail.com"
            onChange={(e) => setUsername(e.target.value)}
            aria-label="Email"
          />
          <InputField
            label="Password"
            placeholder="Enter your password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <div>
            <Button
              skeleton="Signin In..."
              label="Sign In"
              onClick={handleSignin}
            />
            <BottomLogin
              label="Already have an account?"
              buttonText="Sign up"
              to="/"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
