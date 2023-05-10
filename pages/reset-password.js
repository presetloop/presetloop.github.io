import ResetPasswordComp from '../components/ResetPasswordComp';

export default function ResetPassword() {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;
  return (
    <div className="w-full flex justify-center mt-14">
      <ResetPasswordComp apiUrl={apiUrl} />
    </div>
  );
};