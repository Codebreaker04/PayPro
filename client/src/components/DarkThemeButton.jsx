import { useRecoilState } from "recoil";
import { DarkThemeState } from "../State/atomFamily/atom.js";
import { useEffect } from "react";

export function DarkThemeButton() {
  const [DarkTheme, setDarkTheme] = useRecoilState(DarkThemeState);

  function toggleTheme() {
    setDarkTheme((prevTheme) => !prevTheme);
  }

  useEffect(() => {
    if (DarkTheme) {
      window.document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      window.document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [DarkTheme]);

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme === "dark") {
      setDarkTheme(true);
    } else {
      setDarkTheme(false);
    }
  }, [DarkTheme]);

  return (
    <div className="flex flex-col justify-center items-center h-12 w-12 border-2 bg-slate-100 dark:bg-neutral-600 border-slate-300 dark:border-neutral-500 rounded-full ">
      <input
        type="checkbox"
        className="light-switch sr-only "
        name="light-switch"
        id="light-switch"
        checked={DarkTheme}
        onChange={toggleTheme}
      />
      <label
        htmlFor="light-switch"
        className="flex justify-center items-center relative cursor-pointer h-12 w-12 rounded-full"
      >
        {DarkTheme ? (
          <svg width="16" height="16" xmlns="http://www.w3.org/2000/svg">
            <path
              className="fill-slate-400"
              d="M6.2 1C3.2 1.8 1 4.6 1 7.9 1 11.8 4.2 15 8.1 15c3.3 0 6-2.2 6.9-5.2C9.7 11.2 4.8 6.3 6.2 1Z"
            />
            <path
              className="fill-slate-500"
              d="M12.5 5a.625.625 0 0 1-.625-.625 1.252 1.252 0 0 0-1.25-1.25.625.625 0 1 1 0-1.25 1.252 1.252 0 0 0 1.25-1.25.625.625 0 1 1 1.25 0c.001.69.56 1.249 1.25 1.25a.625.625 0 1 1 0 1.25c-.69.001-1.249.56-1.25 1.25A.625.625 0 0 1 12.5 5Z"
            />
          </svg>
        ) : (
          <svg
            viewBox="0 0 16 16"
            width="23"
            height="23"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              className="fill-slate-600"
              d="M7 0h2v2H7zM12.88 1.637l1.414 1.415-1.415 1.413-1.413-1.414zM14 7h2v2h-2zM12.95 14.433l-1.414-1.413 1.413-1.415 1.415 1.414zM7 14h2v2H7zM2.98 14.364l-1.413-1.415 1.414-1.414 1.414 1.415zM0 7h2v2H0zM3.05 1.706 4.463 3.12 3.05 4.535 1.636 3.12z"
            />
            <path
              className="fill-slate-600"
              d="M8 4C5.8 4 4 5.8 4 8s1.8 4 4 4 4-1.8 4-4-1.8-4-4-4Z"
            />
          </svg>
        )}
      </label>
    </div>
  );
}
