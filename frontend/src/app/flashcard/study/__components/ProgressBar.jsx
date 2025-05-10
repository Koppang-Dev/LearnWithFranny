"use client";

import React, { useEffect, useState } from "react";
import { CheckCircle } from "lucide-react";

const ProgressBar = ({ mastered = 0, total = 1 }) => {
  console.log("Mastered", mastered);
  console.log("total", total);
  const percent = total > 0 ? (mastered / total) * 100 : 0;
  const [showComplete, setShowComplete] = useState(false);

  console.log("Percent", percent);

  useEffect(() => {
    if (percent >= 100) {
      setShowComplete(true);
      const timeout = setTimeout(() => setShowComplete(false), 3000);
      return () => clearTimeout(timeout);
    }
  }, [percent]);

  const barColor = percent >= 100 ? "bg-green-500" : "bg-purple-600";

  return (
    <div className="w-full mb-4 relative">
      <div className="w-full bg-gray-200 rounded-full h-4 mb-2">
        <div
          className={`${barColor} h-4 rounded-full transition-all duration-300`}
          style={{ width: `${percent}%` }}
        ></div>
      </div>
      <p className="text-sm text-gray-600 text-right">
        {mastered} / {total} cards mastered
      </p>

      {showComplete && (
        <div className="absolute top-[-10px] right-[-10px] animate-bounce text-green-600">
          <CheckCircle size={28} />
        </div>
      )}
    </div>
  );
};

export default ProgressBar;
