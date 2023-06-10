import Footer from "@/components/Footer";

export default function Cookies() {
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

      <h1 className="font-bold text-white mb-4 text-[20vw]">WE REJECTED ALL COOKIES SO YOU DON'T HAVE TO.</h1>

      <Footer />
    </div>
  )
}