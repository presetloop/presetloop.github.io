import {useRouter} from 'next/router';
import {useEffect} from 'react';

export default function PageNotFound() {
  const router = useRouter()
	
  useEffect(() => {
    setTimeout(() => {
      router.push("/");
    }, 3000);
  },[])
	
  	return (
			<>
				<p className="text-xl text-slate-500">This page does not exist. Redirecting...</p>
			</>
		)
  
}