import RegistrationForm from "@/components/RegistrationForm";

export default function Register() {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;
  
  return (
    <div className="bg-white h-screen -mt-4">
      <RegistrationForm apiUrl={apiUrl} />
    </div>
  )
}