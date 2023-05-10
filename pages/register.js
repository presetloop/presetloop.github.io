import RegistrationForm from "@/components/RegistrationForm";

export default function Register() {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;
  
  return (
    <>
      <RegistrationForm apiUrl={apiUrl} />
    </>
  )
}