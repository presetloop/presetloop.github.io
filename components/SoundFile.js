import { useState, useEffect, useRef } from 'react';

const SoundFile = ({ isLoggedIn, soundFile, image }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLooping, setIsLooping] = useState(false);
  const audioRef = useRef(null);

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

  const loopAudio = () => {
    const audio = audioRef.current;
    if (audio.currentTime >= audio.duration - 0.0) {
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
    const updatePlayingState = () => {
      setIsPlaying(!audio.paused);
    };
    audio.addEventListener('play', updatePlayingState);
    audio.addEventListener('pause', updatePlayingState);
    return () => {
      audio.removeEventListener('play', updatePlayingState);
      audio.removeEventListener('pause', updatePlayingState);
    };
  }, []);

  return (
    <div>
      <audio ref={audioRef} className="hidden" src={soundFile} controls loop={isLooping} preload="auto" />

      <div className="flex justify-center items-center">
        <div className="relative">
        {/* SAMPLE PACK ARTWORK */}
          <img className="rounded-md block max-w-full max-h-full" src={image} />

          {/* PLAY / PAUSE */}
          <button
            onClick={toggleAudio}
            className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 rounded-full px-2 py-2"
          >
            {isPlaying ? (
              <img src="/pause.svg" alt="Preset Loop" />
            ) : (
              <img src="/play.svg" alt="Preset Loop" />
            )}
          </button>

          {/* LOOP */}
          {isLoggedIn && (  
            <button
              onClick={toggleLoop}
              className="tracking-widest absolute -bottom-1.5 -left-1.5"
            >
              {isLooping ? (
                <p className='rounded-full p-2 bg-white border-black border-2 -m-1'>
                <img src={"/loop-on.svg"} alt="Preset Loop" />
                </p>
              ) : (
                <p className='rounded-md p-2 bg-[#101010]'>
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