import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { SignupPage } from "./Pages/SignupPage.jsx";
import { SigninPage } from "./Pages/SigninPage.jsx";
import { DashboardPage } from "./Pages/DashboardPage.jsx";
import { SendMoneyPage } from "./Pages/SendMoneyPage.jsx";
import { PaymentStatus } from "./Pages/PaymentStatus.jsx";
import { RecoilRoot } from "recoil";

function App() {
  return (
    <>
      <RecoilRoot>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<SignupPage />}></Route>
            <Route path="/signin" element={<SigninPage />}></Route>
            <Route path="/dashboard" element={<DashboardPage />}></Route>
            <Route path="/send" element={<SendMoneyPage />}></Route>
            <Route path="/status" element={<PaymentStatus />}></Route>
          </Routes>
        </BrowserRouter>
      </RecoilRoot>
    </>
  );
}

export default App;
