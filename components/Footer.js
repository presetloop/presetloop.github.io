import FooterSocials from "./FooterSocials";

export default function Footer() {
  const currentYear = new Date().getFullYear();
  return (
    <>
      <div className="loadedAni bg-[#202020] px-8 sm:px-0 py-8 sm:pt-36 sm:pb-44 flex flex-col text-center">
 
          
            {/* LOGO */}
          <a href={"/"}>
            <div className="flex justify-center">
              <img className="invert rounded-full my-8 h-auto w-64" src="/pl-logo-trans.png" alt="Preset Loop" />
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