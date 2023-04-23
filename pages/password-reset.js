import PasswordResetComp from '../components/PasswordResetComp';

export default function PasswordReset() {
  const apiUrl = "https://toot.olk1.com/api"
  return (
    <div className="w-full flex justify-center mt-14">
      <PasswordResetComp apiUrl={apiUrl} />
    </div>
  );
};