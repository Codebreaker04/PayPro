import { Link } from "react-router-dom";

export function BottomLogin({ label, buttonText, to }) {
  return (
    <div className="pt-2 pb-6 text-sm text-slate-500 flex justify-center dark:text-white">
      <div>{label}</div>
      <Link
        to={to}
        className="text-sm underline font-medium text-gray-900 ml-1 dark:text-gray-300"
      >
        {buttonText}
      </Link>
    </div>
  );
}
