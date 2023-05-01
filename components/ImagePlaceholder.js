import { useState, useEffect } from 'react';

// Fisher-Yates shuffle algorithm
function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

export default function ImagePlaceholder({ imgkey, height, className, width=null, rotate=null }) {
  const [randomImgUrl, setRandomImgUrl] = useState('');
  
  useEffect(() => {

    const shuffledImages = shuffleArray(placeholderImages);
    const randomIndex = Math.floor(Math.random() * shuffledImages.length);
    const randomOffset = Math.floor(Math.tan(Math.random() * Math.PI) * 100);
    const randomImgUrl = `${shuffledImages[randomIndex]}?x=${randomOffset}`;
    setRandomImgUrl(randomImgUrl);

  }, [imgkey]);

  return (
    
    <img
      alt="Post Preview Image"
      style={{ height: height, width: width, transform: rotate }}
      className={`sm:mt-4 cursor-pointer ${className} object-cover border-gray-700 border-0`}
      // w-[100vw]
      src={randomImgUrl}
      imgkey={imgkey}
    />
  );
}

const placeholderImages = [
  "https://org.olk1.com/picz/1682816223.jpg",
  "https://org.olk1.com/picz/1682845045.jpg",
  "https://org.olk1.com/picz/1682845057.jpg",
  "https://org.olk1.com/picz/1682845068.jpg"
];
    