import ResetPasswordComp from '../components/ResetPasswordComp';

export default function ResetPassword() {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;
  return (
    <div className="bg-white h-screen w-full flex justify-center mt-0">
      <ResetPasswordComp apiUrl={apiUrl} />
    </div>
  );
};