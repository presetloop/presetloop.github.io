import LoginForm from "@/components/LoginForm";

export default function Login() {
  const apiUrl="https://toot.olk1.com/api";
  return (
    <>
      <LoginForm apiUrl={apiUrl} />
    </>
  )
}