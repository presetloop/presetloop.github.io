import SoundFile from '@/components/SoundFile';
import RandomWaveformSymbol from './RandomWaveformSymbol';

export default function SamplePackSample({getRandomClass, sampleFileName, sampleFileUrl, isLoggedIn }) {
  return (
    <>
      <div className={`${getRandomClass} flex justify-between p-2 items-center`}>
    
        <div className='rounded-full bg-white mr-2'>
          {(isLoggedIn) && (
            <SoundFile isLoggedIn={true} isAdmin={true} soundFile={sampleFileUrl || `${process.env.NEXT_PUBLIC_SAMPLES}/frazzles-kik-hat.mp3`} image={"/waveform.svg"} style="h-16 w-16"/>
          )}
        </div>

        <div className='flex flex-col px-2'>
          <div>
            <p className='text-center text-xs pl-0 mb-0 text-slate-300'>
              {sampleFileName || "No Sample"}
            </p>
          </div>
          <div>
            <RandomWaveformSymbol containerWidth={window.innerWidth } />
          </div>
        </div>

        <div className='rounded-full p-2 bg-black'>
          <img className="h-4 w-4 invert" src="/download.svg" alt="Preset Loop" />
        </div>

      </div>
    </>
  )
}