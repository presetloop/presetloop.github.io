import LoginForm from "@/components/LoginForm";

export default function Login() {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;
  return (
    <div className="bg-white h-screen -mt-4">
      <LoginForm apiUrl={apiUrl} />
    </div>
  )
}