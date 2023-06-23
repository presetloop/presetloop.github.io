import RegistrationForm from "@/components/RegistrationForm";
import Footer from "@/components/Footer";

export default function Register() {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;
  
  return (
    <>
      <div className="pb-64 h-screen w-full flex justify-center">
        
        <div className="py-16 px-8 flex flex-col items-center">
          <a href="/" className="mb-8 text-xl">Back &larr;</a>
          
          <img src="/pl-logo-trans.png" alt="Preset Loop" className="invert h-16 mb-12"/>
          
          <h2 className="outline-dashed outline-2 outline-offset-8 outline-red-300 bg-red-100 p-8 text-center tracking-tight leading-loose max-w-[760px]">Hello and thank you for your interest. 
          <br /> We are currently at maximum capacity for new user registrations. 
          <br />Check back soon for limited places.
          </h2>
        </div>

      {/*  */}
      {/*  */}
        {/* <RegistrationForm apiUrl={apiUrl} /> */}
      </div>
      <Footer />
    </>
  )
}