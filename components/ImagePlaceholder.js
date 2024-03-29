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
      alt="Samplepack Preview Image"
      style={{ height: height, width: width, transform: rotate }}
      className={`mt-3 cursor-pointer ${className} object-cover`}
      src={randomImgUrl}
      imgkey={imgkey}
    />
  );
}

const placeholderImages = [
  "https://images.presetloops.com/placeholder/1682816223.jpg",
  "https://images.presetloops.com/placeholder/1682845045.jpg",
  "https://images.presetloops.com/placeholder/1682845057.jpg",
  "https://images.presetloops.com/placeholder/1682845068.jpg"
];
    