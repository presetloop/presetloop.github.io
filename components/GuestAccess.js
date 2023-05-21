import { useRef, useState, useEffect } from "react";

export default function GuestAccess({ setEmail, setPassword, setInputFieldType }) {
  const guestRef = useRef(null);
  const [isClient, setIsClient] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    setIsClient(true);
    const handleResize = () => setIsMobile(window.innerWidth < 640);
    window.addEventListener("resize", handleResize);
    handleResize(); // Set initial value on component mount
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleCopy = () => {
    setEmail(process.env.NEXT_PUBLIC_LOGIN_TODAYSEMAIL);
    setPassword(process.env.NEXT_PUBLIC_LOGIN_TODAYSPASSWORD);
    setInputFieldType(true)
  };

  return (
    <>
      <div className="mt-5 border-slate-100 border-t-2 border-dashed">
        <div className="flex flex-col sm:flex-row mt-4 gap-4">
         
          
          <div className="bg-red-50 text-center items-center">
              <button
                className="ml-1 text-slate-900"
                onClick={handleCopy}>
              <div className="flex">
                <span className="text-center text-green-500 mx-1" ref={guestRef}>
                  &rarr; click here &larr;
                </span>
              </div>
            </button>
          </div>
         
        { isClient && (
          <>
            {isMobile ? (
              <p className="text-center text-slate-800">5 Minute {'\u005E\u005E\u005E'} Guest Pass</p>
              // 24 Hour Guest Pass
            ) : (
              <p className="text-slate-800">{'\u003C\u003C\u003C'} 5 Minute Guest Pass</p>
              // 24 Hour Guest Pass
            )}
          </>
        )}
         </div>
      </div>
    </>
  );
}
