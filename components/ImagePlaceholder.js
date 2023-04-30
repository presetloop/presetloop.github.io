import { useState, useEffect } from 'react';

// Fisher-Yates shuffle algorithm
function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

export default function ImagePlaceholder({ imgkey }) {
  const [randomImgUrl, setRandomImgUrl] = useState('');
  
  useEffect(() => {

    const shuffledImages = shuffleArray(placeholderImages);
    const randomIndex = Math.floor(Math.random() * shuffledImages.length);
    const randomOffset = Math.floor(Math.tan(Math.random() * Math.PI) * 100);
    const randomImgUrl = `${shuffledImages[randomIndex]}?x=${randomOffset}`;
    setRandomImgUrl(randomImgUrl);

  }, [imgkey]);

  return (
    <img alt="Post Preview Image" className="h-[275px] w-[100vw] object-cover border-gray-100 border-[1px]" src={randomImgUrl} imgKey={imgkey} /> 
  );
}

const placeholderImages = [
  "https://org.olk1.com/picz/1682816223.jpg",
  "https://org.olk1.com/picz/1682845045.jpg",
  "https://org.olk1.com/picz/1682845057.jpg",
  "https://org.olk1.com/picz/1682845068.jpg"
];
    