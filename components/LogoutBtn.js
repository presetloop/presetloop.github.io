import Cookies from 'universal-cookie';

export default function LogoutBtn() {
  const cookies = new Cookies();

  const handleRemoveCookie = () => {
      cookies.remove("PHPSESSID");
      window.location.href="/";
  };

  return (
    <>
      <a className="cursor-pointer block my-4 text-xl text-blue-700" onClick={handleRemoveCookie}>Logout</a>
    </>
  );
}
