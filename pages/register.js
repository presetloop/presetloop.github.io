import RegistrationForm from "@/components/RegistrationForm";

export default function Register() {
  const apiUrl="https://toot.olk1.com/api";
  
  return (
    <>
      <RegistrationForm apiUrl={apiUrl} />
    </>
  )
}