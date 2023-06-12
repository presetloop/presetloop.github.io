import Footer from "@/components/Footer";

export default function Eula() {
  return (
    <div className="mt-4">
      
    <a href={"/"}>
      <div className="flex w-full justify-end pr-4 mb-4">
      
        <img className="invert sm:hover:invert-0 -mt-0 h-auto w-16 transition-all ease-in-out duration-1000" src="/pl-logo-trans.png" alt="Preset Loop" />
      
      </div>
    </a>

      <h1 className="font-bold mt-8 mb-8 text-white text-[10vw]">All sounds and samples are royalty <span className="underline">free</span> and available for download <span className="underline">unless otherwise stated</span>.</h1>

      <Footer />
    </div>
  )
}