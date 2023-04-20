import {useRouter} from 'next/router';

export default function PageNotFound() {
  const router = useRouter()
	
  setTimeout(() => {
      router.push("/");
    }, 3000);
	
  	return (
			<>
				<p className="text-xl text-slate-500">This page does not exist. Redirecting...</p>
			</>
		)
  
}