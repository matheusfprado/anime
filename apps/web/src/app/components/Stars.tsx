export function Stars() {
  return (
    <div className="flex items-center gap-1">
      {Array.from({ length: 5 }).map((_, i) => (
        <svg
          key={i}
          width="20"
          height="20"
          viewBox="0 0 24 24"
          className="drop-shadow-[0_0_5px_rgba(255,200,0,0.5)]"
        >
          <path
            d="M12 2l2.9 6.3 6.8.6-5.1 4.6 1.5 6.7L12 16.8 5.9 20.2 7.4 13.7l-5.1-4.6 6.8-.6L12 2z"
            fill="#f2c14e"
            stroke="#f2c14e"
            strokeWidth="1"
          />
        </svg>
      ))}
    </div>
  );
}
