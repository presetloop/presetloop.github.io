import {createContext, useState, useEffect} from 'react';

const IsGuestContext = createContext();

export const IsGuestProvider = ({ children }) => {
 
//  const initialIsGuest = typeof window !== 'undefined' ? localStorage.getItem('isGuest') : null;
 
let initialIsGuest;

try {
  initialIsGuest = typeof window !== 'undefined' ? localStorage.getItem('isGuest') : null;
} catch (error) {
  // Handle the security error
  initialIsGuest = null;
  console.error('Error accessing localStorage:', error);
}


 const [isGuest, setIsGuest] = useState(initialIsGuest ? JSON.parse(initialIsGuest) : false);

 const [hasMounted, setHasMounted] = useState(false);


//  useEffect(() => {
//   if (typeof window !== 'undefined') {
//     localStorage.setItem('isGuest', JSON.stringify(isGuest));
//   }
//  }, [isGuest]);

useEffect(() => {
  try {
    if (typeof window !== 'undefined') {
      localStorage.setItem('isGuest', JSON.stringify(isGuest));
    }
  } catch (error) {
    // Handle the security error
    console.error('Error accessing localStorage:', error);
  }
}, [isGuest]);



 useEffect(() => {
  setHasMounted(true);
 }, []);

 if (!hasMounted) return null;

 return (
  <IsGuestContext.Provider value={{ isGuest, setIsGuest }}>
  {children}
  </IsGuestContext.Provider>
 );
};

export default IsGuestContext;