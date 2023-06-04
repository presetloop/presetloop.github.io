import Footer from "@/components/Footer";
import RegistrationForm from "@/components/RegistrationForm";

export default function Register() {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;
  
  return (
    <>
      <div className="pb-64 bg-white h-screen w-full flex justify-center">
        <RegistrationForm apiUrl={apiUrl} />
      </div>
      <Footer />
    </>
  )
}