import RandomWaveformSymbol from '../helpers/RandomWaveformSymbol';

export default function SamplePackSample({getRandomClass}) {
  return (
    <>
      <div className={`${getRandomClass} flex justify-between p-2 items-center`}>
    
        <div className='rounded-full bg-white mr-2'>
          <img className="h-8 w-8" src="/waveform.svg" alt="Preset Loop" />
        </div>

        <div className='flex flex-col'>
          <div>
            <p className='text-md mb-1 text-white bg-[#101010]'>sampleFileName_1</p>
          </div>
          <div className='text-left'>
            <RandomWaveformSymbol />
          </div>
        </div>

        <div className='rounded-full p-2 bg-black'>
          <img className="h-4 w-4 invert" src="/download.svg" alt="Preset Loop" />
        </div>

      </div>
    </>
  )
}