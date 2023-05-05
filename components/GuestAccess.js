import { useRef } from "react";

export default function GuestAccess({ setEmail, setPassword, setInputFieldType }) {
  const guestRef = useRef(null);

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
         
          {window.innerWidth < 480 ? <p className="text-center text-slate-800">{'\u005E\u005E\u005E'} 24 Hour Guest Pass</p> : <p className="text-slate-800">{'\u003C\u003C\u003C'} 24 Hour Guest Pass</p>}
         </div>
      </div>
    </>
  );
}
