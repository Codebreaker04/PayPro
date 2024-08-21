export function InputField({ label, placeholder, onChange }) {
  return (
    <div className="py-2 text-sm font-medium text-left">
      <div>{label}</div>
      <input
        className="w-full my-2 h-7 p-2 font-normal border border-slate-300 rounded focus:outline-1 focus:outline-slate-400"
        placeholder={placeholder}
        onChange={onChange}
      />
    </div>
  );
}
