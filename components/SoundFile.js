import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/router';
import { sanitize } from 'dompurify';
// import Image from 'next/image';

const SoundFile = ({ href, isLoggedIn, isAdmin, isHomeImg, soundFile, image, style, wave }) => {
  const router = useRouter();
  const { id } = router.query;
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLooping, setIsLooping] = useState(false);
  const [isSamplePack, setIsSamplePack] = useState(false);
  const audioRef = useRef(null);

  useEffect(() => {
    if (id) {
      setIsSamplePack(true);
    }
  }, [id]);


  function handleImageClick(e) {
    e.preventDefault();
    
    if (isSamplePack) {
      return;
    } else if (isLoggedIn || isAdmin) {
      window.location.href = href;
    } else {
      window.location.href = "/login";
    }
  }



 const toggleAudio = () => {
    const audio = audioRef.current;
    if (isPlaying) {
      audio.pause();
      setIsPlaying(false);
    } else {
      stopAllAudio();
      audio.currentTime = 0;
      audio.play();
      setIsPlaying(true);
    }
  };

 const toggleLoop = () => {
    const audio = audioRef.current;
    if (!isLooping) {
      audio.addEventListener('timeupdate', loopAudio);
    } else {
      audio.removeEventListener('timeupdate', loopAudio);
    }
    setIsLooping(!isLooping);
  };


  const loopAudio = (audioRef) => {
  if (!audioRef || !audioRef.current) {
    // Check if audioRef or audioRef.current is null or undefined
    return;
  }

  const audio = audioRef.current;
                                         // 0.0
  if (audio.currentTime >= audio.duration - 0.1) {
    // Adjusted the comparison value to give a small buffer before resetting
    audio.currentTime = 0.01;
  }
};


  const stopAllAudio = () => {
    const audios = document.querySelectorAll('audio');
    audios.forEach((audio) => {
      audio.pause();
      audio.currentTime = 0;
    });
  };

  useEffect(() => {
    const audio = audioRef.current;
    audio.addEventListener('ended', () => {
      setIsPlaying(false);
    });
    return () => {
      audio.removeEventListener('ended', () => {
        setIsPlaying(false);
      });
    };
  }, []);

  useEffect(() => {
  const audio = audioRef.current;

  if (!audio) {
    // Check if audioRef.current is null or undefined
    return;
  }

  const updatePlayingState = () => {
    try {
      if (audio.error) {
        // Handle the error condition here
        console.error("Error loading audio:", audio.error);
        return;
      }
      setIsPlaying(!audio.paused);
    } catch (error) {
      // Handle any unexpected errors here
      console.error("An error occurred:", error);
    }
  };

  audio.addEventListener('play', updatePlayingState);
  audio.addEventListener('pause', updatePlayingState);

  return () => {
    audio.removeEventListener('play', updatePlayingState);
    audio.removeEventListener('pause', updatePlayingState);
  };
}, []);

// function getRandomBorderColor() {
//   const colors = ["border-blue-400", "border-red-400", "border-pink-400", "border-yellow-400", "border-green-400", "border-purple-400", "indigo-400"];
  
//   const randomIndex = Math.floor(Math.random() * colors.length);
//   return colors[randomIndex];
// }

  return (
    <div>
      <audio ref={audioRef} className="hidden" src={soundFile} controls loop={isLooping} preload="auto" />

      <div className="flex">{/* keep play icon center in image */}
        
        <div className="relative">
        
          {/* IMAGE */}
          {/* ${getRandomBorderColor()}  */}
          <img 
            onClick={handleImageClick} 
            className={`
              ${style} rounded-md block 
              ${image !== "/waveform.svg" && !isHomeImg && isLoggedIn ? `rotate-1 outline-dashed outline-4 outline-red-100 border-transparent border-[24px] md:border-[44px]` : ""} 
              ${!isSamplePack ? "cursor-pointer" : ""}
            `} 
            src={sanitize(image)} alt="Preset Loop" />


        {/* PLAY / PAUSE */}
        
          <button
            onClick={(isLoggedIn || isAdmin) ? toggleAudio : null}
            className={`${soundFile ? "block" : "hidden"} absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 rounded-full px-0 py-0 transition-all ease-in-out duration-300 cursor-pointer`}
        >
          {isPlaying ? (
            <img className="w-8" src="/pause.svg" alt="Preset Loop" />
          ) : (
            <img className={`w-10 ${wave}`} src="/play.svg" alt="Preset Loop" />
          )}
          </button>



        {/* LOOP */}
        {(isLoggedIn || isAdmin) && (image !== "/waveform.svg") && (  
          <button
            onClick={toggleLoop}
            className="tracking-widest absolute -bottom-1.5 -left-1.5"
          >
            {isLooping ? (
              <p className='rounded-full p-2.5 lg:p-2 bg-white border-black border-2 -m-1'>
              <img src={"/loop-on.svg"} alt="Preset Loop" />
              </p>
            ) : (
              <p className='pulseAni rounded-full p-2 lg:p-1.5 bg-[#101010]'>
              <img src={"/loop-off.svg"} alt="Preset Loop" />
              </p>
            )}
          </button>
        )}
        
        </div>
      </div>
    </div>
  );
};

export default SoundFile;