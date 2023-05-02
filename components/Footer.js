export default function Footer() {
  return (
    <>
      <div className="mt-8 bg-[#111] p-8 sm:p-24">
        <div className="w-full flex-col md:flex-row flex justify-between">
          <p className="text-xs md:text-sm xl:text-lg text-white">{process.env.NEXT_PUBLIC_STRAPLINE}</p>
          <p className="mt-2 md:mt-0 text-xs md:text-sm xl:text-lg text-right text-white">we don't do <span className="line-through">socials</span> but you can email us: <a className="text-indigo-100 sm:hover:text-indigo-200" href="mailto:oof@deploybedlam.com">{process.env.NEXT_PUBLIC_FOOTER_EMAIL}</a></p>
        </div>
      </div>
    </>
  )
}