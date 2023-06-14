import SoundFile from '@/components/SoundFile';
import FileDownloader from './FileDownloader';
import RandomWaveformSymbol from './RandomWaveformSymbol';

export default function SamplePackSample({getRandomColourClass
, sampleFileName, sampleFileUrl, isLoggedIn }) {
  return (
    <>
      <div className={`${getRandomColourClass} flex justify-between p-2 items-center`}>
    
        <div className='rounded-full bg-white mr-2'>
          {(isLoggedIn) && (
            <SoundFile isLoggedIn={true} isAdmin={true} soundFile={sampleFileUrl} wave={`${getRandomColourClass} border-2 border-[#99999999] rounded-full`} image={"/waveform.svg"} style="h-16 w-16"/>
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

        {/* DOWNLOAD BUTTON AREA */}
        <div className='rounded-full ml-1 mr-1 p-2 border-8 border-white bg-black'>
          {sampleFileUrl && sampleFileName ? (
            <FileDownloader url={sampleFileUrl} fileName={sampleFileName} />
          ) : (
            <img 
              className="h-4 w-4 invert" 
              src="/forbidden.svg" 
              alt="Preset Loop" 
            />
          )}
        </div>

      </div>
    </>
  )
}