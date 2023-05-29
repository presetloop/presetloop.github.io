import FooterSocials from "./FooterSocials";

export default function Footer() {
  const currentYear = new Date().getFullYear();
  return (
    <>
      <div className="bg-black px-8 sm:px-0 py-8 sm:pt-36 sm:pb-44 flex flex-col text-center">
 
          
          {/* LOGO */}
            <div className="flex justify-center">
              <img className="my-8 h-40 w-40 sm:h-48 sm:w-48" src="/logo.svg" alt="Preset Loop" />
            </div>
  
            <div className="mb-10">
              <p className="text-white mb-28">{`${process.env.NEXT_PUBLIC_STRAPLINE}`}</p>
              <FooterSocials />
            </div>
          
          


          <div className="my-16 flex flex-col gap-x-4 text-white tracking-tighter leading-8">
            <p>Privacy Policy</p>
            <p>Cookie Settings</p>
            <p>
              <a className="text-indigo-100 sm:hover:text-indigo-200" href={`mailto:${process.env.NEXT_PUBLIC_FOOTER_EMAIL}`}>{process.env.NEXT_PUBLIC_FOOTER_EMAIL}</a>
            </p>
            <p>&copy; {currentYear} {`${process.env.NEXT_PUBLIC_BRAND}`}</p>
          </div>
          
 
      </div>
    </>
  )
}