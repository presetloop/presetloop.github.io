import PasswordResetComp from '../components/PasswordResetComp';

export default function PasswordReset() {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;
  return (
    <div className="w-full flex justify-center mt-14">
      <PasswordResetComp apiUrl={apiUrl} />
    </div>
  );
};