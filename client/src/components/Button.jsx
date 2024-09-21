import { useState } from "react";

export function Button({ skeleton, label, onClick }) {
  const [isPending, setIsPending] = useState(false);

  async function handleClick() {
    setIsPending(true);
    try {
      await onClick();
    } finally {
      setIsPending(false);
    }
  }
  return (
    <button
      type="button"
      disabled={isPending}
      className=" w-full h-10 bg-neutral-900 rounded-lg text-white text-lg hover:bg-neutral-700 dark:hover:bg-neutral-800 dark:text-white"
      onClick={handleClick}
    >
      {isPending ? skeleton : label}
    </button>
  );
}
