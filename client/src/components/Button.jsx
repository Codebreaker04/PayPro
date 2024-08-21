export function Button({ label, onClick }) {
  return (
    <button
      className=" w-full h-10 bg-neutral-900 rounded-lg text-white text-lg hover:bg-neutral-700"
      onClick={onClick}
    >
      {label}
    </button>
  );
}
