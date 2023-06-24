import Footer from '@/components/Footer';
import SamplePackForm from '@/components/SamplePackForm';

export default function Login() {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;
  return (
    <>
      <div className="pb-64 bg-white h-screen w-full flex justify-center">
        <SamplePackForm apiUrl={apiUrl} />
      </div>
      <Footer />
    </>
  )
}