import ResetPasswordComp from '../components/ResetPasswordComp';

export default function ResetPassword() {
  const apiUrl = "https://toot.olk1.com/api"
  return (
    <div className="w-full flex justify-center mt-14">
      <ResetPasswordComp apiUrl={apiUrl} />
    </div>
  );
};