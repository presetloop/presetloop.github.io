import PasswordResetComp from '../components/PasswordResetComp';

export default function PasswordReset() {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;
  return (
    <div className="bg-white h-screen w-full flex justify-center mt-0">
      <PasswordResetComp apiUrl={apiUrl} />
    </div>
  );
};