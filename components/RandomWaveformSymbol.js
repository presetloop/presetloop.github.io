import { useEffect, useState } from 'react';

export default function RandomWaveformSymbol() {
  const [containerWidth, setContainerWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => {
      setContainerWidth(window.innerWidth);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const getRandomString = (length, characters) => {
    let randomString = '';

    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      randomString += characters.charAt(randomIndex);
    }

    return randomString;
  };

  let stringLength = Math.floor(containerWidth / 100);
  stringLength = Math.min(64, Math.max(12, stringLength));

  const characters = Array.from({ length: stringLength }, () => {
    const randomCharacter = Math.random() < 0.5 ? '|' : '.';
    return randomCharacter;
  }).join('');

  const randomWaveformSymbol = getRandomString(stringLength, characters);

  return (
    <>
      <p className='text-xs sm:text-sm text-white'>{randomWaveformSymbol}</p>
    </>
  );
}
