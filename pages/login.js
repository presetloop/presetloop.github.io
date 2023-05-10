import LoginForm from "@/components/LoginForm";

export default function Login() {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;
  return (
    <>
      <LoginForm apiUrl={apiUrl} />
    </>
  )
}