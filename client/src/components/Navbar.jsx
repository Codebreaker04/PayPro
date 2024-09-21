export function Navbar({ username, comp }) {
  return (
    <div
      className={`w-full z-50 h-20 py-4 pl-6 pr-20 bg-white shadow sticky top-0 flex justify-between items-center dark:bg-neutral-900 dark:text-white`}
    >
      <div className={`ml-4 text-4xl font-medium`}>PayPro</div>
      <div className="flex justify-between items-center gap-4">
        {username}
        {comp}
      </div>
    </div>
  );
}
