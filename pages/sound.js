import { useState, useEffect, useRef } from 'react';

const SoundFile = ({soundFile, image}) => {
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
        <div className="relative w-48 h-48">
        {/* SAMPLE PACK ARTWORK */}
          <img className="rounded-md block h-48 w-48 max-w-full max-h-full" src={image} />

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
          <button
            onClick={toggleLoop}
            className="tracking-widest absolute -bottom-1.5 -left-1.5"
          >
            {isLooping ? (
              <p className='rounded-full p-2 bg-black border-white border-2 -m-1'>
              <img src="/loop-on.svg" alt="Preset Loop" />
              </p>
            ) : (
              <p className='rounded-md p-2 bg-white'>
              <img src="/loop-off.svg" alt="Preset Loop" />
              </p>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};


// export default SoundFile;

const Sound = () => {
  return (
    <div className='max-w-[1473px] w-[95%] m-auto flex-1'>
    <div className="max-w-lg 
        ml-[11vw]
        mr-[11vw] 
        grid 
        pt-4 
        gap-x-4
        gap-y-4
        grid-cols-1 
        sm:max-w-none 
        sm:mx-0
        sm:pt-6 
        sm:gap-x-6
        sm:gap-y-8 
        sm:grid-cols-3
        lg:pt-8 
        lg:gap-x-8
        lg:gap-y-10 
        lg:grid-cols-4
        xl:pt-10 
        xl:gap-x-8
        xl:gap-y-10 
        xl:grid-cols-6
">
      <SoundFile soundFile={`/samples/frazzles_loop1.mp3`} image="http://localhost:5000/_next/image?url=https%3A%2F%2Forg.olk1.com%2Fpicz%2F1685196932.jpg&w=750&q=75" />
      <SoundFile soundFile={`/samples/frazzles_loop2.mp3`} image="http://localhost:5000/_next/image?url=https%3A%2F%2Forg.olk1.com%2Fpicz%2F1685196756.jpg&w=640&q=75" />
      <SoundFile soundFile={`/samples/frazzles_loop1.mp3`} image="http://localhost:5000/_next/image?url=https%3A%2F%2Forg.olk1.com%2Fpicz%2F1685196932.jpg&w=750&q=75" />
      <SoundFile soundFile={`/samples/frazzles_loop2.mp3`} image="http://localhost:5000/_next/image?url=https%3A%2F%2Forg.olk1.com%2Fpicz%2F1685196756.jpg&w=640&q=75" />
      <SoundFile soundFile={`/samples/frazzles_loop1.mp3`} image="http://localhost:5000/_next/image?url=https%3A%2F%2Forg.olk1.com%2Fpicz%2F1685196932.jpg&w=750&q=75" />
      <SoundFile soundFile={`/samples/frazzles_loop2.mp3`} image="http://localhost:5000/_next/image?url=https%3A%2F%2Forg.olk1.com%2Fpicz%2F1685196756.jpg&w=640&q=75" />
      <SoundFile soundFile={`/samples/frazzles_loop1.mp3`} image="http://localhost:5000/_next/image?url=https%3A%2F%2Forg.olk1.com%2Fpicz%2F1685196932.jpg&w=750&q=75" />
      <SoundFile soundFile={`/samples/frazzles_loop2.mp3`} image="http://localhost:5000/_next/image?url=https%3A%2F%2Forg.olk1.com%2Fpicz%2F1685196756.jpg&w=640&q=75" />
      <SoundFile soundFile={`/samples/frazzles_loop1.mp3`} image="http://localhost:5000/_next/image?url=https%3A%2F%2Forg.olk1.com%2Fpicz%2F1685196932.jpg&w=750&q=75" />
      <SoundFile soundFile={`/samples/frazzles_loop2.mp3`} image="http://localhost:5000/_next/image?url=https%3A%2F%2Forg.olk1.com%2Fpicz%2F1685196756.jpg&w=640&q=75" />
      <SoundFile soundFile={`/samples/frazzles_loop1.mp3`} image="http://localhost:5000/_next/image?url=https%3A%2F%2Forg.olk1.com%2Fpicz%2F1685196932.jpg&w=750&q=75" />
      <SoundFile soundFile={`/samples/frazzles_loop2.mp3`} image="http://localhost:5000/_next/image?url=https%3A%2F%2Forg.olk1.com%2Fpicz%2F1685196756.jpg&w=640&q=75" />
      <SoundFile soundFile={`/samples/frazzles_loop1.mp3`} image="http://localhost:5000/_next/image?url=https%3A%2F%2Forg.olk1.com%2Fpicz%2F1685196932.jpg&w=750&q=75" />
      <SoundFile soundFile={`/samples/frazzles_loop2.mp3`} image="http://localhost:5000/_next/image?url=https%3A%2F%2Forg.olk1.com%2Fpicz%2F1685196756.jpg&w=640&q=75" />
      <SoundFile soundFile={`/samples/frazzles_loop1.mp3`} image="http://localhost:5000/_next/image?url=https%3A%2F%2Forg.olk1.com%2Fpicz%2F1685196932.jpg&w=750&q=75" />
      <SoundFile soundFile={`/samples/frazzles_loop2.mp3`} image="http://localhost:5000/_next/image?url=https%3A%2F%2Forg.olk1.com%2Fpicz%2F1685196756.jpg&w=640&q=75" />
    </div>
    </div>
  );
};

export default Sound;