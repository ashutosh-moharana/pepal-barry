export default function Input({ label, error, className = "", ...props }) {
  return (
    <label className={`block text-sm text-subtle space-y-2 ${className}`}>
      {label}
      <input
        className="w-full rounded-2xl border border-primary/15 bg-white px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary/30"
        {...props}
      />
      {error && <span className="text-sm text-red-500">{error}</span>}
    </label>
  );
}
