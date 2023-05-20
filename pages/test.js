import { useContext } from 'react';
import IsGuestContext from '@/helpers/IsGuestContext';
import CountdownTimer from '@/components/CountdownTimer';

function Test() {

  const { isGuest } = useContext(IsGuestContext);

return (
<>


    { isGuest && 
      <CountdownTimer />
    }


</>
  );
}

export default Test;
