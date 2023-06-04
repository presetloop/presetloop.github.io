import Footer from '@/components/Footer';
import LoginForm from "@/components/LoginForm";

export default function Login() {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;
  return (
    <>
      <div className="pb-64 bg-white h-screen w-full flex justify-center">
        <LoginForm apiUrl={apiUrl} />
      </div>
      <Footer />
    </>
  )
}