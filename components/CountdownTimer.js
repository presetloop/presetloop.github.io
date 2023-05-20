import { useState, useEffect, useContext } from 'react';
import IsGuestContext from '@/helpers/IsGuestContext';
import getSessionData from '@/helpers/getSessionData';
import {handleLogout} from '@/components/LogoutBtn';

export default function CountdownTimer() {
  const { isGuest, setIsGuest } = useContext(IsGuestContext);
  const [timeRemaining, setTimeRemaining] = useState(0);

  useEffect(() => {
    if (typeof window === 'undefined') {
      return;
    }

    const { sessionData } = getSessionData() || {};

    if (sessionData) {
      const timeRemaining = sessionData.timestamp + 10000 - Date.now();
      // 86400000 is 24 Hours / 60000 is 1 minute / 10000 is 10 seconds
      if (timeRemaining > 0) {
        setTimeRemaining(timeRemaining);
        const interval = setInterval(() => {
          setTimeRemaining(prevTime => prevTime - 1000);
        }, 1000);
        return () => clearInterval(interval);
      }
    }
    // isGuest from localStorage boolean / context
    setIsGuest(false);
    // No session data or expired session
    setTimeRemaining(0);
    
    if(isGuest !== false || timeRemaining === 0){
      handleLogout();
    }
  }, [isGuest, timeRemaining]);


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
      {timeRemaining > 1000 ? (
        <span className="text-sm sm:text-[16px]">{window.innerWidth < 480 ? "" : "Session expires in"} {formatTime(Math.floor(timeRemaining / 1000))}</span>
      ) : (
        <span className='text-red-500 text-xs sm:text-[16px]'>Session expired</span>
      )}
    </div>
  );
}
