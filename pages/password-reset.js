import Footer from '@/components/Footer';
import PasswordResetComp from '../components/PasswordResetComp';

export default function PasswordReset() {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;
  return (
    <>
      <div className="pb-64 bg-white h-screen w-full flex justify-center">
        <PasswordResetComp apiUrl={apiUrl} />
      </div>
        <Footer />
    </>
  );
};