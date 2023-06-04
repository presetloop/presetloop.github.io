import Footer from '@/components/Footer';
import ResetPasswordComp from '../components/ResetPasswordComp';

export default function ResetPassword() {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;
  return (
    <>
      <div className="pb-64 bg-white h-screen w-full flex justify-center">
      <ResetPasswordComp apiUrl={apiUrl} />
    </div>
      <Footer/>
    </>
  );
};