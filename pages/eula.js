import Footer from "@/components/Footer";

export default function Eula() {
  return (
    <div className="mt-4">
      
    <a href={"/"}>
      <div className="flex w-full justify-end pr-4 mb-4">
      
        <p className='[word-spacing:-0px]'>pre</p>
        
        <p className="[word-spacing:-0px]">
          <img className="-mt-1.5 h-10 w-10" src="/loop.svg" alt="Preset Loop" />
        </p>

        <p className='[word-spacing:-0px]'>set</p> 
      
      </div>
    </a>

      <h1 className="font-bold mb-8 text-white text-[10vw]">All sounds and samples are royalty <span className="underline">free</span> and available for download <span className="underline">unless otherwise stated</span>.</h1>

      <Footer />
    </div>
  )
}