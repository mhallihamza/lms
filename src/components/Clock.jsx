import { useState, useEffect } from "react";

function Clock() {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const intervalId = setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);

  const hour = time.getHours();
  const minute = time.getMinutes();
  const second = time.getSeconds();

  return (
    <div className="flex justify-center items-center h-40 pt-36">
      <div className="relative">
        <svg viewBox="0 0 400 400" className="w-32 h-32">
          <circle
            cx="200"
            cy="200"
            r="190"
            fill="none"
            stroke="#000"
            strokeWidth="10"
          />
          {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((n) => (
            <text
              key={n}
              x="200"
              y="25"
              fill="#000"
              fontSize="20"
              fontWeight="bold"
              textAnchor="middle"
              dominantBaseline="central"
              transform={`rotate(${30 * n}, 200, 200)`}
            >
              {n}
            </text>
          ))}
          <line
            x1="200"
            y1="200"
            x2="200"
            y2="100"
            stroke="#000"
            strokeWidth="8"
            transform={`rotate(${30 * hour + minute / 2}, 200, 200)`}
          />
          <line
            x1="200"
            y1="200"
            x2="200"
            y2="50"
            stroke="#000"
            strokeWidth="4"
            transform={`rotate(${6 * minute + second / 10}, 200, 200)`}
          />
          <line
            x1="200"
            y1="200"
            x2="200"
            y2="20"
            stroke="#000"
            strokeWidth="2"
            transform={`rotate(${6 * second}, 200, 200)`}
          />
          <circle
            cx="200"
            cy="200"
            r="10"
            fill="#000"
            stroke="#000"
            strokeWidth="4"
          />
        </svg>
      </div>
    </div>
  );
}

export default Clock;
