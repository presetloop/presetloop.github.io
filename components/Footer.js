import FooterSocials from "./FooterSocials";

export default function Footer() {
  const currentYear = new Date().getFullYear();
  return (
    <>
      <div className="loadedAni bg-[#101010] px-8 sm:px-0 py-8 sm:pt-36 sm:pb-44 flex flex-col text-center">
 
          
            {/* LOGO */}
          <a href={"/"}>
            <div className="flex justify-center">
              <img className="rounded-full my-8 h-40 w-40 sm:h-48 sm:w-48" src="/logo.svg" alt="Preset Loop" />
            </div>
          </a>

            <div className="my-8">
              
              <p className="text-white mt-8 mb-24">{`${process.env.NEXT_PUBLIC_STRAPLINE}`}</p>

              <FooterSocials />
            </div>
          

          <div className="my-16 flex flex-col gap-x-4 text-white tracking-tighter leading-8">
            <a href="/eula"><p>E.U.L.A.</p></a>
            <a href="/cookies"><p>Cookie Settings</p></a>
            <p>
              <a className="sm:hover:text-indigo-200" href={`mailto:${process.env.NEXT_PUBLIC_FOOTER_EMAIL}`}>{process.env.NEXT_PUBLIC_FOOTER_EMAIL}</a>
            </p>
            <p>&copy; {currentYear} {`${process.env.NEXT_PUBLIC_BRAND}`}</p>
          </div>
          
 
      </div>
    </>
  )
}