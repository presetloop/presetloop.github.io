import React, { useState, useEffect } from 'react';

export default function CountdownTimer() {
  const [timeRemaining, setTimeRemaining] = useState(0);

  useEffect(() => {
    const sessionData = JSON.parse(localStorage.getItem("session", process.env.NEXT_PUBLIC_SESSION));
    if (sessionData) {
      const timeRemaining = sessionData.timestamp + 86400000 - Date.now();
      if (timeRemaining > 0) {
        setTimeRemaining(timeRemaining);
        const interval = setInterval(() => {
          setTimeRemaining(prevTime => prevTime - 1000);
        }, 1000);
        return () => clearInterval(interval);
      }
    }
    // No session data or expired session
    setTimeRemaining(0);
  }, []);

  function formatTime(time) {
    const hours = Math.floor(time / 3600);
    const minutes = Math.floor((time % 3600) / 60);
    const seconds = time % 60;

    const formattedHours = hours.toString().padStart(2, '0');
    const formattedMinutes = minutes.toString().padStart(2, '0');
    const formattedSeconds = seconds.toString().padStart(2, '0');

    return `${formattedHours}h:${formattedMinutes}m:${formattedSeconds}s`;
  }

  return (
    <div>
      {timeRemaining > 0 ? (
        <span>Session expires in {formatTime(Math.floor(timeRemaining / 1000))}</span>
      ) : (
        <span className='text-red-500'>Session expired</span>
      )}
    </div>
  );
}
